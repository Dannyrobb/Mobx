import * as React from 'react';

import { Table, TableControls, Typography } from '@cellxpert/ui-lib';
import styled from '@emotion/styled';
import { observer } from 'mobx-react';

import { GetLeadsReportResponse } from '@cellxpert/api-types';
import { useStore } from '../../stores/setupContext';
import { theme } from '@cellxpert/theme';

export interface RegistrationReportProps {
  startDate: string | null;
  endDate: string | null;
  setStartDate: (date: string | null) => void;
  setEndDate: (date: string | null) => void;
  runReport: () => void;
  data: GetLeadsReportResponse;
  columns: Array<{ accessor: string; Header: string; Footer?: () => void }>;
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

export const RegistrationReport: React.FunctionComponent<RegistrationReportProps> = ({
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  data,
  columns,
  runReport
}) => {
  const [columnOrder, setColumnOrder] = React.useState<string[]>([]);
  const [hiddenColumns, setHiddenColumns] = React.useState<string[]>([]);

  return (
    <>
      <PageWrapper>
        <HeaderWrap>
          <Typography {...{ variant: 'h5', color: 'main', style: { marginBottom: theme.gutters.base * 6 } }}>
            Leads Report
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
            additionalSelectLabel: 'Filter by:',
          }}
        />
        <Table {...{ data, columns, reportName: 'Leads', columnOrder, hiddenColumns }} />
      </PageWrapper>
    </>
  );
};

const Observed = observer(RegistrationReport);

const WithStoreConnection = () => {
  const { leadsReport } = useStore();

  const {
    leadsReportParams,
    leadsData,
    leadsColumns,
    setStartDate,
    setEndDate,
    runReport,
    runInitialReport,
  } = leadsReport;
  React.useEffect(() => {
    runInitialReport();
    runReport();
  }, []);

  return (
    <Observed
      {...{
        startDate: leadsReportParams.startDate,
        endDate: leadsReportParams.endDate,
        setStartDate,
        setEndDate,
        data: leadsData,
        columns: leadsColumns,
        runReport
      }}
    />
  );
};
export default observer(WithStoreConnection);
