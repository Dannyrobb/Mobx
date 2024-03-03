import React from 'react';

import { ActivityIcon } from '@cellxpert/icons';
import { Theme } from '@cellxpert/theme';
import { Card, CardList, Typography } from '@cellxpert/ui-lib';
import styled from '@emotion/styled';
import { observer } from 'mobx-react';

import { useStore } from '../../../../stores/setupContext';

export interface CustomerActivityProps {
  data: Array<{ key: CustomerActivityKey; value: string | number | undefined }>;
}

export type CustomerActivityKey =
  | 'Activity count'
  | 'Volume'
  | 'PL'
  | 'Net PL'
  | 'LOT'
  | 'Spread'
  | 'ROI'
  | 'Brokerage fee'
  | 'Markup';

const GridList = styled('div')(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr 1fr',
  margin: theme.gutters.base * 0.062,
  columnGap: 1,
  rowGap: 1,
}));

const CardListKey = styled(Typography)(({ theme }) => ({
  marginBottom: `${theme.gutters.base * 2}px`,
}));

const CardListValue = styled(Typography)(() => ({
  fontSize: 26,
  fontWeight: 400,
  lineHeight: 0.92,
  letterSpacing: 0.15,
}));

const ActivityWrapper = styled('div')(({ theme }) => ({
  margin: theme.gutters.base * 4,
  maxWidth: 620,
}));

export const CustomerActivity: React.FunctionComponent<CustomerActivityProps> = ({ data }) => {
  if (data.length < 1) {
    return null;
  }

  return (
    <ActivityWrapper>
      <CardList
        {...{
          title: 'Activity',
          icon: <ActivityIcon {...{ height: 20, width: 20, color: 'main' }} />,
          isList: true,
        }}
      >
        <GridList>
          {data.map((item, index) => (
            <Card key={index} {...{ isList: true }}>
              <CardListKey {...{ variant: 'caption', color: 'dark' }}>{item.key}</CardListKey>
              <CardListValue {...{ color: 'main', fontFamilyIndex: 1 }}>{item.value}</CardListValue>
            </Card>
          ))}
        </GridList>
      </CardList>
    </ActivityWrapper>
  );
};

const Observed = observer(CustomerActivity);
const WithStoreConnection = observer(() => {
  const { customerProfileOverview } = useStore();
  const { customerActivityData } = customerProfileOverview;

  return <Observed {...{ data: customerActivityData }} />;
});

export default WithStoreConnection;
