import * as React from 'react';

import { Theme } from '@cellxpert/theme';
import { Table, TableControls, ColumnWithFooterParams } from '@cellxpert/ui-lib';
import styled from '@emotion/styled';
import { observer } from 'mobx-react';

import { CustomerPositionsObj } from '@cellxpert/api-types';
import { useStore } from '../../../../stores/setupContext';

export interface CustomerProfileOpenPositionsProps {
  startDate: string | null;
  endDate: string | null;
  setStartDate: (date: string | null) => void;
  setEndDate: (date: string | null) => void;
  runReport: () => void;
  data: CustomerPositionsObj[];
  columns: ColumnWithFooterParams[];
}

const PageWrapper = styled('div')(({ theme }) => ({
  height: '100%',
  backgroundColor: theme.palette.blacks.background,
}));

export const CustomerProfilePositions: React.FunctionComponent<CustomerProfileOpenPositionsProps> = ({
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
        <Table {...{ data, columns, reportName: 'Positions', columnOrder, hiddenColumns }} />
      </PageWrapper>
    </>
  );
};

const Observed = observer(CustomerProfilePositions);

const WithStoreConnection = () => {
  const { customerProfilePositions } = useStore();

  const { startDate, endDate, positionsColumns, positionsData, setStartDate, setEndDate, runReport } =
    customerProfilePositions;
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
        data: positionsData,
        columns: positionsColumns,
        runReport,
      }}
    />
  );
};
export default observer(WithStoreConnection);
