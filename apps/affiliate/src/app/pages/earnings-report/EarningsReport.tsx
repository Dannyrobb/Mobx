import * as React from 'react';

import { Table, TableControls, Option, Typography } from '@cellxpert/ui-lib';
import styled from '@emotion/styled';
import { observer } from 'mobx-react';

import { EarningsReportObj } from '@cellxpert/api-types';
import { useStore } from '../../stores/setupContext';
import { theme } from '@cellxpert/theme';

export interface EarningsFilterOption extends Option {
  value:
    | ''
    | 'All'
    | 'CPA'
    | 'CPAA'
    | 'CPL'
    | 'Revshare'
    | 'Sub Affiliate'
    | 'Bonus';
}

export interface EarningReportProps {
  startDate: string | null;
  endDate: string | null;
  setStartDate: (date: string | null) => void;
  setEndDate: (date: string | null) => void;
  selectedFilter: EarningsFilterOption;
  setSelectedFilter: (option: EarningsFilterOption) => void;
  runReport: () => void;
  data: EarningsReportObj[];
  columns: Array<{ accessor: string; Header: string; Footer?: () => void }>;
  earningsReportFilters: EarningsFilterOption[] | null;
}

const PageWrapper = styled('div')(({ theme }) => ({
  height: '100%',
  backgroundColor: theme.palette.blacks.background,
}));

const HeaderWrap = styled('div')(({ theme }) => ({
  padding: `${theme.gutters.base * 4}px ${theme.gutters.base * 4}px 0  ${theme.gutters.base * 4}px`,
  display: 'flex',
  justifyContent: 'space-between',
}));

export const EarningReport: React.FunctionComponent<EarningReportProps> = ({
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  setSelectedFilter,
  selectedFilter,
  data,
  columns,
  runReport,
  earningsReportFilters,
}) => {
  const [columnOrder, setColumnOrder] = React.useState<string[]>([]);
  const [hiddenColumns, setHiddenColumns] = React.useState<string[]>([]);

  return (
    <>
      <PageWrapper>
        <HeaderWrap>
          <Typography {...{ variant: 'h5', color: 'main', style: { marginBottom: theme.gutters.base * 6 } }}>
            Earnings Report
          </Typography>
        </HeaderWrap>
        <TableControls
          {...{
            startDate,
            endDate,
            setStartDate,
            setEndDate,
            columns,
            runReport,
            onOrderChange: (order: string[]) => {
              setColumnOrder(order);
            },
            columnOrder,
            onColumnToggle: (option) => {
              hiddenColumns.some((opt) => opt === option.value)
                ? setHiddenColumns(hiddenColumns.filter((item) => item !== option.value))
                : setHiddenColumns([...hiddenColumns, option.value]);
            },
            hiddenColumns,
            withAdditionalSelect: earningsReportFilters ? true : false,
            additionalSelectProps: earningsReportFilters
              ? {
                  options: earningsReportFilters,
                  onChange: (opt) => {
                    setSelectedFilter(opt as EarningsFilterOption);
                  },
                  selected: selectedFilter,
                }
              : null,
            additionalSelectLabel: 'Filter by:',
          }}
        />
        <Table {...{ data, columns, reportName: 'Earning', columnOrder, hiddenColumns }} />
      </PageWrapper>
    </>
  );
};

const Observed = observer(EarningReport);

const WithStoreConnection = () => {
  const { earningsReport } = useStore();

  const {
    earningsReportParams,
    earningsData,
    earningsColumns,
    earningsReportFilters,
    selectedFilter,
    setStartDate,
    setEndDate,
    setSelectedFilter,
    runReport,
    runInitialReport,
  } = earningsReport;
  React.useEffect(() => {
    runInitialReport();
    runReport();
  }, []);

  return (
    <Observed
      {...{
        startDate: earningsReportParams.startDate,
        endDate: earningsReportParams.endDate,
        setStartDate,
        setEndDate,
        setSelectedFilter,
        selectedFilter,
        data: earningsData,
        columns: earningsColumns,
        runReport,
        earningsReportFilters,
      }}
    />
  );
};
export default observer(WithStoreConnection);