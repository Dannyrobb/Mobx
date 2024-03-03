import * as React from 'react';

import { Table, TableControls } from '@cellxpert/ui-lib';
import styled from '@emotion/styled';
import { observer } from 'mobx-react';

import { GetTransactionsReportResponse } from '@cellxpert/api-types';
import { useStore } from '../../../../stores/setupContext';

export interface CustomerProfileTransactionsProps {
  startDate: string | null;
  endDate: string | null;
  setStartDate: (date: string | null) => void;
  setEndDate: (date: string | null) => void;
  runReport: () => void;
  data: GetTransactionsReportResponse;
  columns: Array<{ accessor: string; Header: string; Footer?: () => void }>;
}

const PageWrapper = styled('div')(({ theme }) => ({
  height: '100%',
  backgroundColor: theme.palette.blacks.background,
}));

export const CustomerProfileTransactions: React.FunctionComponent<CustomerProfileTransactionsProps> = ({
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  data,
  columns,
  runReport,
}) => {
  const [columnOrder, setColumnOrder] = React.useState<string[]>([]);
  const [hiddenColumns, setHiddenColumns] = React.useState<string[]>([]);

  return (
    <>
      <PageWrapper>
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
            onColumnToggle: (option) => {
              hiddenColumns.some((opt) => opt === option.value)
                ? setHiddenColumns(hiddenColumns.filter((item) => item !== option.value))
                : setHiddenColumns([...hiddenColumns, option.value]);
            },
            hiddenColumns,
          }}
        />
        <Table {...{ data, columns, reportName: 'Transactions', columnOrder, hiddenColumns }} />
      </PageWrapper>
    </>
  );
};

const Observed = observer(CustomerProfileTransactions);

const WithStoreConnection = () => {
  const { customerProfileTransactions } = useStore();

  const { startDate, endDate, transactionsColumns, transactionsData, setStartDate, setEndDate, runReport } =
    customerProfileTransactions;
  React.useEffect(() => {
    runReport();
  }, []);

  return (
    <Observed
      {...{
        startDate,
        endDate,
        setStartDate,
        setEndDate,
        data: transactionsData,
        columns: transactionsColumns,
        runReport,
      }}
    />
  );
};
export default observer(WithStoreConnection);
