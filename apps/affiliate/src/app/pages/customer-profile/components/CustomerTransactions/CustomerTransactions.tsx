import React from 'react';

import { TransactionsIcon } from '@cellxpert/icons';
import { Theme } from '@cellxpert/theme';
import { Card, CardList, Typography } from '@cellxpert/ui-lib';
import styled from '@emotion/styled';
import { observer } from 'mobx-react';
import { FormattedDate } from 'react-intl';

import { useStore } from '../../../../stores/setupContext';

export interface CustomerTransactionsProps {
  data: Array<{ key: CustomerTransactionsKey; value: string | number | undefined }>;
}

export type CustomerTransactionsKey =
  | 'First deposit'
  | 'Deposit date'
  | 'Deposit count'
  | 'Total deposit'
  | 'Total withdrawals'
  | 'Net deposit';

const TransctionsWrapper = styled('div')(({ theme }) => ({
  margin: theme.gutters.base * 4,
  maxWidth: 620,
}));

const GridList = styled('div')(() => ({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr 1fr',
  columnGap: 1,
  rowGap: 1,
}));

const CardListKey = styled('div')(({ theme }) => ({
  ...theme.typography.meta.caption,
  color: theme.palette.text.dark,
  marginBottom: `${theme.gutters.base * 2}px`,
}));

const CardListValue = styled(Typography)(() => ({
  fontSize: 26,
  fontWeight: 400,
  lineHeight: 0.92,
  letterSpacing: 0.15,
}));

export const CustomerTransactions: React.FunctionComponent<CustomerTransactionsProps> = ({ data }) => {
  if (data.length < 1) {
    return null;
  }

  return (
    <TransctionsWrapper>
      <CardList
        {...{
          title: 'Transactions',
          icon: <TransactionsIcon {...{ height: 20, width: 20, color: 'main' }} />,
          isList: true,
        }}
      >
        <GridList>
          {data.map((item, index) => (
            <Card key={index} {...{ isList: true }}>
              <CardListKey>{item.key}</CardListKey>
              <CardListValue {...{ color: 'main', fontFamilyIndex: 1 }}>
                {item.key === 'Deposit date' ? (
                  <FormattedDate value={item.value} year={'numeric'} month={'2-digit'} day={'2-digit'} />
                ) : (
                  item.value
                )}
              </CardListValue>
            </Card>
          ))}
        </GridList>
      </CardList>
    </TransctionsWrapper>
  );
};

const Observed = observer(CustomerTransactions);
const WithStoreConnection = observer(() => {
  const { customerProfileOverview } = useStore();
  const { customerTransactionsData } = customerProfileOverview;

  return <Observed {...{ data: customerTransactionsData }} />;
});

export default WithStoreConnection;
