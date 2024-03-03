// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path='./react-table-config.d.ts' />

import * as React from 'react';

import 'regenerator-runtime/runtime';

import { ArrowDownIcon, ArrowUpIcon, CaretLeftIcon, CaretRightIcon, SortArrowsIcon } from '@cellxpert/icons';
import { flexEndCenter, flexStartCenter, theme } from '@cellxpert/theme';
import styled from '@emotion/styled';
import {
  Cell as ReactTableCell,
  CellProps,
  Column,
  ColumnInstance,
  HeaderGroup,
  HeaderProps,
  IdType,
  Row,
  useAsyncDebounce,
  useColumnOrder,
  useFilters,
  UseFiltersColumnProps,
  UseFiltersInstanceProps,
  useFlexLayout,
  useGlobalFilter,
  UseGlobalFiltersInstanceProps,
  UseGlobalFiltersState,
  usePagination,
  UsePaginationInstanceProps,
  useResizeColumns,
  UseResizeColumnsColumnProps,
  useSortBy,
  UseSortByColumnProps,
  useTable,
  UseTableHeaderGroupProps,
  UseTableInstanceProps,
} from 'react-table';

import { sumTotal, makeRatioByFormat, customerIdRedirect, dateTime } from './TableFunctions';

import Input from '../Input/Input';
import Search from '../Search/Search';
import Select from '../Select/Select';

interface D {}

export type ColumnWithFooterParams = Column<D> & {
  accessor: string;
  Header: string;
  footerParams?: { format: string; numerator?: string; denominator?: string };
  Cell?: (props: CellProps<D>) => JSX.Element;
};

export interface TableProps<DD extends D> {
  data: DD[];
  columns: ColumnWithFooterParams[];
  withFilters?: boolean;
  withGlobalFilter?: boolean;
  hiddenColumns?: IdType<D>[];
  columnOrder?: IdType<D>[];
  reportName: string;
}

const EmptyState = styled('div')(() => ({
  ...theme.typography.meta.h6,
  textAlign: 'center',
  margin: `${theme.gutters.base * 7}px 0px`,
}));

const GlobalFilterWrapper = styled('div')(() => ({
  padding: `${theme.gutters.base * 2}px 0`,
  margin: `0 ${theme.gutters.base * 4}px`,
  borderTop: `1px solid ${theme.palette.blacks.border}`,
}));

const TableWrapper = styled('div')(() => ({
  ...theme.typography.meta.body2,
  overflow: 'auto',
}));

const StyledTable = styled('table')(() => ({
  width: '100%',
  backgroundColor: theme.palette.blacks.background,
}));

const StyledTableHeadCell = styled('th')(() => ({
  textAlign: 'left',
  position: 'sticky !important' as 'sticky',
  top: 0,
  fontWeight: 'inherit',
  color: theme.palette.text.main,
  padding: theme.gutters.base * 2,
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  '&:first-child': {
    position: 'sticky !important' as 'sticky',
    left: 0,
    backgroundColor: theme.palette.blacks.background,
    zIndex: 1,
    borderRight: `1px solid ${theme.palette.blacks.border}`,
  },
}));

const TableHeadCellText = styled('div')(() => ({
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  svg: {
    fill: theme.palette.blacks.grey,
  },
}));

const StyledTableRow = styled('tr')(() => ({
  padding: `0px ${theme.gutters.base * 2}px`,
  borderBottom: `1px solid ${theme.palette.blacks.border}`,
  '&:not(:first-child):last-child': {
    borderColor: theme.palette.additional.grey[600],
  },
}));

const StyledCell = styled('td')(() => ({
  padding: theme.gutters.base * 2,
  color: theme.palette.additional.grey[700],
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  '&:first-child': {
    position: 'sticky',
    left: 0,
    backgroundColor: theme.palette.blacks.background,
    zIndex: 1,
    borderRight: `1px solid ${theme.palette.blacks.border}`,
  },
}));

const FooterCell = styled(StyledCell)(() => ({
  '&:first-child': {
    borderRight: `0px solid ${theme.palette.blacks.border}`,
  },
}));

const PaginationWrap = styled('div')(() => ({
  ...theme.typography.meta.body2,
  ...flexEndCenter,
  backgroundColor: theme.palette.blacks.background,
  whiteSpace: 'nowrap',
  width: '100%',
  marginBottom: 40,
  borderBottom: `1px solid ${theme.palette.blacks.border}`,

  '>div': {
    ...flexStartCenter,
    marginRight: 'auto',
    padding: `0 ${theme.gutters.base * 2}px`,
  },
}));

const NumerOfPageSpan = styled('span')(() => ({
  margin: `0 ${theme.gutters.base * 1.5}px`,
}));

const PageButton = styled('button')(() => ({
  cursor: 'pointer',
  borderWidth: 0,
  boxSizing: 'border-box',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
  ...theme.typography.meta.button,
  height: theme.gutters.base * 6,
  width: theme.gutters.base * 6 + 2,
  backgroundColor: theme.palette.blacks.transparent,
  borderLeft: `1px solid ${theme.palette.blacks.border}`,
  '&:hover': {
    backgroundColor: theme.palette.additional.grey[300],
  },
  '&:disabled': {
    color: theme.palette.additional.grey[400],
    fill: theme.palette.additional.grey[400],
  },
}));
const Resizer = styled('div')(() => ({
  position: 'absolute',
  right: 0,
  top: 0,
  bottom: 0,
  width: 2,
  '&:hover': {
    backgroundColor: theme.palette.main.primary1.base,
  },
}));

// export function sumTotal(info: UseFiltersInstanceProps<D> & HeaderProps<D>) {
//   const total = React.useMemo(
//     () => info?.rows.reduce((sum: number, row) => row.values[info?.column?.id] + sum, 0),
//     [info.rows]
//   );
//   return <>{total}</>;
// }

function defaultColumnFilter({ column: { filterValue, setFilter } }: { column: UseFiltersColumnProps<D> }) {
  return (
    <Input
      type="text"
      value={filterValue || ''}
      onChange={(e) => {
        setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
      }}
      placeholder={``}
    />
  );
}

const GlobalFilter: React.FunctionComponent<
  Pick<UseGlobalFiltersInstanceProps<D>, 'preGlobalFilteredRows' | 'setGlobalFilter'> & UseGlobalFiltersState<D>
> = ({ globalFilter, setGlobalFilter }) => {
  const [value, setValue] = React.useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <>
      <Search
        {...{
          placeholder: `Search current view`,
          onChange: (e) => {
            setValue(e.target.value);
            onChange(e.target.value);
          },
          value: value || '',
        }}
      />
    </>
  );
};

export const TableHead: React.FunctionComponent<{ headerGroups: HeaderGroup[]; withFilters?: boolean }> = ({
  headerGroups,
  withFilters,
}) => {
  return (
    <thead>
      {headerGroups.map((headerGroup: HeaderGroup) => (
        <StyledTableRow {...headerGroup.getHeaderGroupProps()}>
          {headerGroup.headers.map((column, key) => (
            <TableHeadCell key={key} {...{ column, withFilters }} />
          ))}
        </StyledTableRow>
      ))}
    </thead>
  );
};

export const TableHeadCell: React.FunctionComponent<{ column: ColumnInstance<D>; withFilters?: boolean }> = ({
  column,
  withFilters,
}) => {
  return (
    <StyledTableHeadCell {...column.getHeaderProps()}>
      <TableHeadCellText data-column-name={column.id} draggable="true" {...column.getSortByToggleProps()}>
        {column.render('Header')}

        <span {...{ style: { verticalAlign: 'top' } }}>
          {(column as unknown as UseSortByColumnProps<D>).isSorted ? (
            (column as unknown as UseSortByColumnProps<D>).isSortedDesc ? (
              <ArrowDownIcon />
            ) : (
              <ArrowUpIcon />
            )
          ) : (
            <SortArrowsIcon />
          )}
        </span>
      </TableHeadCellText>

      {withFilters ? (
        <div {...{ style: { paddingTop: '13px' } }}>
          {(column as unknown as UseFiltersColumnProps<D>)?.canFilter ? column.render('Filter') : null}
        </div>
      ) : (
        ''
      )}
      <Resizer
        {...(column as unknown as UseResizeColumnsColumnProps<D>).getResizerProps()}
        className={`resizer ${(column as unknown as UseResizeColumnsColumnProps<D>).isResizing ? 'isResizing' : ''}`}
      />
    </StyledTableHeadCell>
  );
};

export const TableBody: React.FunctionComponent<{
  getTableBodyProps: UseTableInstanceProps<D>['getTableBodyProps'];
  page: UsePaginationInstanceProps<D>['page'];
  prepareRow: UseTableInstanceProps<D>['prepareRow'];
}> = ({ getTableBodyProps, page, prepareRow }) => {
  const memoizedPage = React.useMemo(() => page, [page]);
  return (
    <tbody {...getTableBodyProps()}>
      {memoizedPage.map((row, index) => {
        prepareRow(row);
        return <TableRow {...{ key: index, row }} />;
      })}
    </tbody>
  );
};

export const TableRow: React.FunctionComponent<{ row: Row<D> }> = ({ row }) => {
  const memoizedRow = React.useMemo(() => row, [row]);
  return (
    <StyledTableRow {...memoizedRow.getRowProps()}>
      {memoizedRow.cells.map((cell: ReactTableCell) => (
        <StyledCell {...cell.getCellProps()}>{cell.render('Cell')}</StyledCell>
      ))}
    </StyledTableRow>
  );
};

export const TableFooter: React.FunctionComponent<{ footerGroups: UseTableInstanceProps<D>['footerGroups'] }> = ({
  footerGroups,
}) => {
  return (
    <tfoot>
      {footerGroups.map((group: UseTableHeaderGroupProps<D>) => (
        <StyledTableRow {...group.getFooterGroupProps()}>
          {group.headers.map((column) => (
            <FooterCell {...column.getFooterProps()}>{column.render('Footer')}</FooterCell>
          ))}
        </StyledTableRow>
      ))}
    </tfoot>
  );
};

export const Table: React.FunctionComponent<TableProps<D>> = ({
  columns,
  data,
  withFilters,
  hiddenColumns,
  columnOrder,
  reportName,
}) => {
  const defaultColumn = React.useMemo(
    () => ({
      minWidth: 30, // minWidth is only used as a limit for resizing
      Filter: defaultColumnFilter,
    }),
    []
  );

  columns.forEach((column) => {
    switch (column.footerParams?.format) {
      case 'sum':
        column.Footer = sumTotal;
        break;
      case 'ratio':
      case 'ratioPercent':
        column.Footer =
          column.footerParams.numerator && column.footerParams.denominator
            ? makeRatioByFormat(
                column.footerParams.numerator,
                column.footerParams.denominator,
                column.footerParams.format
              )
            : '';
        break;
      default:
        break;
    }
    if (column.accessor == 'User_ID') column.Cell = customerIdRedirect;
    else if (column.accessor.includes('Date')) column.Cell = dateTime;
  });

  const memoizedColumns = React.useMemo(() => columns, [columns]);
  const memoizedData = React.useMemo(() => data, [data]);

  React.useEffect(() => {
    hiddenColumns ? setHiddenColumns(hiddenColumns) : setHiddenColumns([]);
  }, [hiddenColumns]);

  React.useEffect(() => {
    columnOrder ? setColumnOrder(columnOrder) : setColumnOrder([]);
  }, [columnOrder]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    prepareRow,
    preGlobalFilteredRows,
    setGlobalFilter,
    page,
    setHiddenColumns,
    rows,
    state,
    canPreviousPage,
    canNextPage,
    pageOptions,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    setColumnOrder,
  } = useTable<D>(
    {
      columns: memoizedColumns,
      data: memoizedData,
      defaultColumn,
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination,
    useFlexLayout,
    useResizeColumns,
    useColumnOrder
  );

  return (
    <>
      {data.length > 0 ? (
        <>
          <GlobalFilterWrapper>
            <GlobalFilter
              preGlobalFilteredRows={preGlobalFilteredRows}
              globalFilter={state.globalFilter}
              setGlobalFilter={setGlobalFilter}
            />
          </GlobalFilterWrapper>
          <TableWrapper>
            <StyledTable {...getTableProps()}>
              <TableHead {...{ headerGroups, withFilters }} />
              <TableBody {...{ getTableBodyProps, page, prepareRow }} />
              <TableFooter {...{ footerGroups }} />
            </StyledTable>
          </TableWrapper>
          <PaginationWrap>
            <div>
              Items per page:
              <Select
                {...{
                  selected: { key: `${state.pageSize}`, value: `${state.pageSize}`, label: `${state.pageSize}` },
                  options: ['10', '20', '30', '40', '50'].map((option) => {
                    return { key: option, value: option, label: option };
                  }),
                  onChange: (option) => {
                    if (Array.isArray(option)) {
                      return;
                    }
                    setPageSize(Number(option.value));
                  },
                  selfClosing: true,
                }}
              />
              <div>
                Showing {(state.pageIndex + 1) * state.pageSize - state.pageSize + 1} -{' '}
                {rows.length < (state.pageIndex + 1) * state.pageSize
                  ? rows.length
                  : (state.pageIndex + 1) * state.pageSize}{' '}
                of {rows.length}
              </div>
            </div>
            <span>
              {pageOptions.length && (
                <Select
                  {...{
                    options: pageOptions.map((page: number) => {
                      const stringValue = (page + 1).toString();
                      return { key: stringValue, value: stringValue, label: stringValue };
                    }),
                    onChange: (option) => {
                      if (Array.isArray(option)) {
                        return;
                      }
                      gotoPage(Number(option.value) - 1);
                    },
                    selfClosing: true,
                    selected: {
                      key: `${state.pageIndex + 1}`,
                      value: `${state.pageIndex + 1}`,
                      label: `${state.pageIndex + 1}`,
                    },
                  }}
                />
              )}
            </span>
            <NumerOfPageSpan>of {pageOptions.length} pages</NumerOfPageSpan>
            <PageButton onClick={() => previousPage()} disabled={!canPreviousPage}>
              <CaretLeftIcon {...{ fill: 'inherit', width: 20, height: 20 }} />
            </PageButton>
            <PageButton onClick={() => nextPage()} disabled={!canNextPage}>
              <CaretRightIcon {...{ fill: 'inherit', width: 20, height: 20 }} />
            </PageButton>
          </PaginationWrap>
        </>
      ) : (
        <EmptyState>No {reportName} to display</EmptyState>
      )}
    </>
  );
};

export default Table;

// To Prevent a filter from column add Filter: '' to its properties
