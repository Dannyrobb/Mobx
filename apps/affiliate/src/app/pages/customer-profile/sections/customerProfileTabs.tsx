import React from 'react';

import { TabItem } from '@cellxpert/ui-lib';
import { IntlShape } from 'react-intl';

import CustomerProfileOverview from './Overview/CustomerProfileOverview';
import CustomerProfileTransactions from './Transactions/CustomerProfileTransactions';

import WithPermission from '../../../components/WithPermission/WithPermission';
import PermissionsStore from '../../../stores/PermissionsStore';
import CustomerProfileOpenPositions from './OpenPositions/CustomerProfileOpenPositions';
import CustomerProfileBonuses from './Bonuses/CustomerProfileBonuses';
import CustomerProfileCommissions from './Commissions/CustomerProfileCommissions';
import CustomerProfilePositions from './Positions/CustomerProfilePositions';

export type TabWithPermissionKey = TabItem & {
  permissionKey?: keyof PermissionsStore;
};

export const customerProfileTabs = (intl: IntlShape): TabWithPermissionKey[] => [
  {
    label: intl.formatMessage({
      id: 'directives.tabs.overview',
      defaultMessage: 'Overview',
    }),
    id: 'item_1',
    content: <CustomerProfileOverview />,
  },
  {
    label: intl.formatMessage({ id: 'directives.tabs.transactions', defaultMessage: 'Transactions' }),
    id: 'item_2',
    content: (
      <WithPermission {...{ permission: 'shouldShowCustomerProfileTransactions' }}>
        <CustomerProfileTransactions />
      </WithPermission>
    ),
    permissionKey: 'shouldShowCustomerProfileTransactions',
  },
  {
    label: intl.formatMessage({ id: 'directives.tabs.open_trades', defaultMessage: 'Payment Details' }),
    id: 'item_3',
    content: (
      <WithPermission {...{ permission: 'shouldShowCustomerProfileOpenTrades' }}>
        <CustomerProfileOpenPositions />
      </WithPermission>
    ),
    permissionKey: 'shouldShowCustomerProfileOpenTrades',
  },
  {
    label: intl.formatMessage({ id: 'directives.tabs.trades', defaultMessage: 'Reset Password' }),
    id: 'item_4',
    content: (
      <WithPermission {...{ permission: 'shouldShowCustomerProfileTrades' }}>
        <CustomerProfilePositions />
      </WithPermission>
    ),
    permissionKey: 'shouldShowCustomerProfileTrades',
  },
  {
    label: intl.formatMessage({ id: 'directives.tabs.bonuses', defaultMessage: 'Privacy Settings' }),
    id: 'item_5',
    content: (
      <WithPermission {...{ permission: 'shouldShowCustomerProfileBonuses' }}>
        <CustomerProfileBonuses />
      </WithPermission>
    ),
    permissionKey: 'shouldShowCustomerProfileBonuses',
  },
  {
    label: intl.formatMessage({ id: 'directives.tabs.commissions', defaultMessage: 'Privacy Settings' }),
    id: 'item_6',
    content: (
      <WithPermission {...{ permission: 'shouldShowCustomerProfileCommissions' }}>
        <CustomerProfileCommissions />
      </WithPermission>
    ),
    permissionKey: 'shouldShowCustomerProfileCommissions',
  },
];
