import * as React from 'react';

import { Theme } from '@cellxpert/theme';
import { Table, TableControls } from '@cellxpert/ui-lib';
import styled from '@emotion/styled';
import { observer } from 'mobx-react';

import { CustomerBonusesObj } from '@cellxpert/api-types';
import { useStore } from '../../../../stores/setupContext';

export interface CustomerProfileOpenBonusesProps {
  startDate: string | null;
  endDate: string | null;
  setStartDate: (date: string | null) => void;
  setEndDate: (date: string | null) => void;
  runReport: () => void;
  data: CustomerBonusesObj[];
  columns: Array<{ accessor: string; Header: string; Footer?: () => void }>;
}

const PageWrapper = styled('div')(({ theme }) => ({
  height: '100%',
  backgroundColor: theme.palette.blacks.background,
}));

export const CustomerProfileBonuses: React.FunctionComponent<CustomerProfileOpenBonusesProps> = ({
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
        <Table {...{ data, columns, reportName: 'Bonuses', columnOrder, hiddenColumns }} />
      </PageWrapper>
    </>
  );
};

const Observed = observer(CustomerProfileBonuses);

const WithStoreConnection = () => {
  const { customerProfileBonuses } = useStore();

  const { startDate, endDate, bonusesColumns, bonusesData, setStartDate, setEndDate, runReport } =
    customerProfileBonuses;
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
        data: bonusesData,
        columns: bonusesColumns,
        runReport,
      }}
    />
  );
};
export default observer(WithStoreConnection);
