import * as React from 'react';

import { Table, TableControls, Option, Typography, TableBreakdownsByDate } from '@cellxpert/ui-lib';
import styled from '@emotion/styled';
import { observer } from 'mobx-react';

import { MediaReportParams, MediaReportResponse } from '@cellxpert/api-types';
import { useStore } from '../../stores/setupContext';
import { theme } from '@cellxpert/theme';

export interface MediaReportProps {
  startDate: string | null;
  endDate: string | null;
  setStartDate: (date: string | null) => void;
  setEndDate: (date: string | null) => void;
  runReport: () => void;
  data: MediaReportResponse | [];
  columns: Array<{ accessor: string; Header: string; Footer?: () => void }>;
  breakdowns: Array<
    keyof Pick<MediaReportParams, 'Brand' | 'Language' | 'Name' | 'Size' | 'trackingCode' | 'Type' | 'Country'>
  >;
  toggleBooleanBreakdown: (
    key: keyof Pick<MediaReportParams, 'Brand' | 'Language' | 'Name' | 'Size' | 'trackingCode' | 'Type' | 'Country'>
  ) => void;
  setMediaFilters: (filters: any) => void;
  mediaReportRequestParams: MediaReportParams;
  reportFilters: Option[];
  setDateFormat: (dateOption: 'day' | 'month' | 'year' | 'none') => void;
  selectAllForBreakdowns: (selected: boolean) => void;
  runReportDisabled: boolean;
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

export const MediaReport: React.FunctionComponent<MediaReportProps> = ({
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  mediaReportRequestParams,
  data,
  columns,
  runReport,
  breakdowns,
  toggleBooleanBreakdown,
  reportFilters,
  setMediaFilters,
  setDateFormat,
  selectAllForBreakdowns,
  runReportDisabled,
}) => {
  const [columnOrder, setColumnOrder] = React.useState<string[]>([]);
  const [hiddenColumns, setHiddenColumns] = React.useState<string[]>([]);

  return (
    <>
      <PageWrapper>
        <HeaderWrap>
          <Typography {...{ variant: 'h5', color: 'main', style: { marginBottom: theme.gutters.base * 6 } }}>
            Media Report
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
                return mediaReportRequestParams[breakdown];
              }),
              headerChildren: <TableBreakdownsByDate {...{ onChange: setDateFormat }} />,
              toggleBreakdown: (option) => {
                toggleBooleanBreakdown(
                  option.value as keyof Pick<
                    MediaReportParams,
                    'Brand' | 'Language' | 'Name' | 'Size' | 'trackingCode' | 'Type' | 'Country'
                  >
                );
              },
              setSelectAll: selectAllForBreakdowns,
            },
            filters: reportFilters,
            onFilterSave: (filters) => {
              setMediaFilters(filters);
            },
            runReportDisabled,
          }}
        />
        <Table {...{ data, columns, reportName: 'Media', columnOrder, hiddenColumns, withFilters: true }} />
      </PageWrapper>
    </>
  );
};

const Observed = observer(MediaReport);

const WithStoreConnection = () => {
  const { mediaReport } = useStore();

  const {
    mediaData,
    mediaColumns,
    mediaReportRequestParams,
    setStartDate,
    setEndDate,
    runReport,
    reportBreakdowns,
    toggleBooleanBreakdown,
    reportFilters,
    setMediaFilters,
    setDateFormat,
    selectAll,
    runReportDisabled,
  } = mediaReport;
  React.useEffect(() => {
    runReport();
  }, []);

  return (
    <Observed
      {...{
        startDate: mediaReportRequestParams.startDate,
        endDate: mediaReportRequestParams.endDate,
        setStartDate,
        setEndDate,
        mediaReportRequestParams,
        data: mediaData,
        columns: mediaColumns,
        runReport,
        breakdowns: reportBreakdowns,
        toggleBooleanBreakdown,
        reportFilters,
        setMediaFilters,
        setDateFormat,
        selectAllForBreakdowns: selectAll,
        runReportDisabled,
      }}
    />
  );
};
export default observer(WithStoreConnection);
