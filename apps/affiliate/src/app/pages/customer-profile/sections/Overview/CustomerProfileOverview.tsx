import * as React from 'react';

import { Theme } from '@cellxpert/theme';
import { InnerScroll } from '@cellxpert/ui-lib';
import styled from '@emotion/styled';
import { observer } from 'mobx-react';

import { useStore } from '../../../../stores/setupContext';
import CustomerActivity from '../../components/CustomerActivity/CustomerActivity';
import CustomerCommission from '../../components/CustomerCommission/CustomerCommission';
import CustomerIdentity from '../../components/CustomerIdentity/CustomerIdentity';
import CustomerSymbols from '../../components/CustomerSymbols/CustomerSymbols';
import CustomerTransactions from '../../components/CustomerTransactions/CustomerTransactions';

export interface CustomerProfileOverviewProps {}

export type ChartDataKey = 'Count' | 'Symbols' | 'Volume';

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

export type CustomerCommissionKey = 'Commission';

const PageWrapper = styled('div')(({ theme }) => ({
  height: '100%',
  display: 'flex',
  backgroundColor: theme.palette.additional.grey[100],
}));

const CustomerDataResults = styled('div')(({ theme }) => ({
  color: theme.palette.text.dark,
  display: 'flex',
  margin: theme.gutters.base * 4,
  gap: theme.gutters.base * 4,
  maxWidth: 620,
}));
const CustomerProfileOverviewInDepthInfo = styled('div')(() => ({
  flexGrow: 1,
}));

export const CustomerProfileOverview: React.FunctionComponent<CustomerProfileOverviewProps> = () => {
  return (
    <>
      <PageWrapper>
        <CustomerIdentity />
        <CustomerProfileOverviewInDepthInfo>
          <InnerScroll {...{ small: true, style: { height: 'fit-content' } }}>
            <CustomerDataResults>
              <CustomerCommission />
              <CustomerSymbols />
            </CustomerDataResults>
            <CustomerTransactions />
            <CustomerActivity />
          </InnerScroll>
        </CustomerProfileOverviewInDepthInfo>
      </PageWrapper>
    </>
  );
};

const Observed = observer(CustomerProfileOverview);

const WithStoreConnection = () => {
  const { customerProfileOverview } = useStore();

  const { getRegistrationsReport, getActivityReport, chartData } = customerProfileOverview;
  React.useEffect(() => {
    getRegistrationsReport();
    getActivityReport();
  }, []);
  return (
    <Observed
      {...{
        getActivityReport,
        chartData,
      }}
    />
  );
};
export default observer(WithStoreConnection);
