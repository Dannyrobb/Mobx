import * as React from 'react';
import styled from '@emotion/styled';
import { theme } from '@cellxpert/theme';

import Button from '../Button/Button';

import TableFilters from '../TableFilters/TableFilters';
import DatePicker from '../DatePicker/DatePicker';
import Typography from '../Typography/Typography';
import { Select, SelectProps, Option } from '../Select/Select';
import TableBreakdowns from '../TableBreakdowns/TableBreakdowns';
import ColumnFilter from '../ColumnFilter/ColumnFilter';
import PredefinedDatePicker from '../PredefinedDatePicker/PredefinedDatePicker';

export interface TableControlsProps {
  startDate: string | null;
  endDate: string | null;
  setStartDate: (date: string | null) => void;
  setEndDate: (date: string | null) => void;
  runReport: () => void;
  columns?: Array<{ accessor: string; Header: string }>;
  onOrderChange?: (order: string[]) => void;
  columnOrder?: string[];
  onColumnToggle: (option: Option) => void;
  hiddenColumns?: string[];
  withAdditionalSelect?: boolean;
  additionalSelectProps?: SelectProps | null;
  additionalSelectLabel?: string;
  breakdownsProps?: {
    breakdowns: string[];
    selectedBreakdowns: string[];
    toggleBreakdown: (option: Option) => void;
    headerChildren?: React.ReactNode;
    setSelectAll?: (selected: boolean) => void;
  };
  filters?: Option[];
  onFilterSave?: (filters: any) => void;
  runReportDisabled?: boolean;
}

const ControlsWrapper = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: 16,
  padding: `${theme.gutters.base * 3}px ${theme.gutters.base * 2}px ${theme.gutters.base * 2}px ${
    theme.gutters.base * 3
  }px`,
}));

const DatePickersWrapper = styled('div')(() => ({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
}));

export const TableControls: React.FunctionComponent<TableControlsProps> = ({
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  columns,
  runReport,
  onOrderChange,
  columnOrder,
  onColumnToggle,
  hiddenColumns,
  additionalSelectProps,
  withAdditionalSelect,
  additionalSelectLabel,
  breakdownsProps,
  onFilterSave,
  filters,
  runReportDisabled
}) => {
  return (
    <React.Fragment>
      <ControlsWrapper>
        <PredefinedDatePicker
          {...{
            startDate,
            endDate,
            onChange: (start, end) => {
              setStartDate(start);
              setEndDate(end);
            },
          }}
        />
        <DatePickersWrapper>
          <DatePicker
            {...{
              onChange: setStartDate,
              variant: 'left',
              startDate: startDate,
            }}
          />
          <DatePicker
            {...{
              onChange: setEndDate,
              variant: 'right',
              startDate: endDate,
            }}
          />
        </DatePickersWrapper>
        {withAdditionalSelect && additionalSelectProps && (
          <div {...{ style: { display: 'flex' } }}>
            {additionalSelectLabel && (
              <Typography {...{ variant: 'body2', color: 'dark', style: { margin: 'auto', whiteSpace: 'nowrap' } }}>
                {additionalSelectLabel}
              </Typography>
            )}
            <Select {...{ ...additionalSelectProps, size: 'small' }} />
          </div>
        )}
        {breakdownsProps && (
          <TableBreakdowns
            {...{
              options: breakdownsProps.breakdowns,
              selected: breakdownsProps.selectedBreakdowns,
              onChange: breakdownsProps.toggleBreakdown,
              headerChildren: breakdownsProps.headerChildren,
              setSelectAll: breakdownsProps.setSelectAll,
              noBreakdownsSelected: runReportDisabled

            }}
          />
        )}
        {filters && (
          <>
            <TableFilters
              {...{
                onSave: (filters) => {
                  onFilterSave && onFilterSave(filters);
                },
                title: 'Media',
                filterOptions: filters,
                selectedFilters: [],
              }}
            />
          </>
          
        )}
        {hiddenColumns && (
          <ColumnFilter
          {...{
            columns:
              columns && columns.length
                ? columns.map((col) => {
                    return col.accessor;
                  })
                : [],
            onOrderChange,
            columnOrder,
            onColumnToggle,
            hiddenColumns,
          }}
        />
        )}
        <Button
          {...{
            label: 'Run Report',
            onClick: runReport,
            disabled: runReportDisabled
          }}
        />
      </ControlsWrapper>
    </React.Fragment>
  );
};

export default TableControls;
