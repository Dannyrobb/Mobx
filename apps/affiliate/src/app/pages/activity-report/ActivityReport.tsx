import * as React from 'react';

import { Table, TableControls, Option, Typography, Button, Search } from '@cellxpert/ui-lib';
import styled from '@emotion/styled';
import { observer } from 'mobx-react';

import { GetComputedActivityReportParams, GetComputedActivityReportResponse } from '@cellxpert/api-types';
import { useStore } from '../../stores/setupContext';
import { theme } from '@cellxpert/theme';

export interface ActivityReportProps {
  startDate: string | null;
  endDate: string | null;
  setStartDate: (date: string | null) => void;
  setEndDate: (date: string | null) => void;
  runReport: () => void;
  data: GetComputedActivityReportResponse | [];
  columns: Array<{ accessor: string; Header: string; Footer?: () => void }>;
  breakdowns: Array<
    keyof Pick<GetComputedActivityReportParams, 'Brand' | 'Language' | 'Name' | 'Size' | 'TrackingCode' | 'Type'>
  >;
  toggleBooleanBreakdown: (
    key: keyof Pick<GetComputedActivityReportParams, 'Brand' | 'Language' | 'Name' | 'Size' | 'TrackingCode' | 'Type'>
  ) => void;
  setActivityFilters: (filters: any) => void;
  activityReportParams: GetComputedActivityReportParams;
  reportFilters: Option[];
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

export const ActivityReport: React.FunctionComponent<ActivityReportProps> = ({
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  activityReportParams,
  data,
  columns,
  runReport,
  breakdowns,
  toggleBooleanBreakdown,
  reportFilters,
  setActivityFilters,
}) => {
  const [columnOrder, setColumnOrder] = React.useState<string[]>([]);
  const [hiddenColumns, setHiddenColumns] = React.useState<string[]>([]);

  return (
    <>
      <PageWrapper>
        <HeaderWrap>
          <Typography {...{ variant: 'h5', color: 'main', style: { marginBottom: theme.gutters.base * 6 } }}>
            Activity Report
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
            breakdownsProps: {
              breakdowns,
              selectedBreakdowns: breakdowns.filter((breakdown) => {
                return activityReportParams[breakdown];
              }),
              toggleBreakdown: (option) => {
                toggleBooleanBreakdown(
                  option.value as keyof Pick<
                    GetComputedActivityReportParams,
                    'Brand' | 'Language' | 'Name' | 'Size' | 'TrackingCode' | 'Type'
                  >
                );
              },
            },
            filters: reportFilters,
            onFilterSave: (filters) => {
              setActivityFilters(filters);
            },
          }}
        />
        <Table {...{ data, columns, reportName: 'Activity', columnOrder, hiddenColumns }} />
      </PageWrapper>
    </>
  );
};

const Observed = observer(ActivityReport);

const WithStoreConnection = () => {
  const { activityReport } = useStore();

  const {
    activityData,
    activityColumns,
    activityReportParams,
    setStartDate,
    setEndDate,
    runReport,
    reportBreakdowns,
    toggleBooleanBreakdown,
    reportFilters,
    setActivityFilters,
  } = activityReport;
  React.useEffect(() => {
    runReport();
  }, []);

  return (
    <Observed
      {...{
        startDate: activityReportParams.startDate,
        endDate: activityReportParams.endDate,
        setStartDate,
        setEndDate,
        data: activityData,
        columns: activityColumns,
        runReport,
        breakdowns: reportBreakdowns,
        activityReportParams,
        toggleBooleanBreakdown,
        reportFilters,
        setActivityFilters,
      }}
    />
  );
};
export default observer(WithStoreConnection);
