import React from 'react';

import { TabItem } from '@cellxpert/ui-lib';
import { IntlShape } from 'react-intl';

import Documents from './../sections/Documents/Documents';
import PaymentDetails from './PaymentDetails/PaymentDetails';
import PersonalInfo from './PersonalInfo/PersonalInfo';
import PrivacySettings from './PrivacySettings/PrivacySettings';
import ResetPassword from './ResetPassword/ResetPassword';

import WithPermission from '../../../components/WithPermission/WithPermission';
import PermissionsStore from '../../../stores/PermissionsStore';

export type TabWithPermissionKey = TabItem & {
  permissionKey?: keyof PermissionsStore;
};

export const accountDetailsTabs = (intl: IntlShape): TabWithPermissionKey[] => [
  {
    label: intl.formatMessage({
      id: 'account_details.personal_information',
      defaultMessage: 'Foo',
    }),
    id: 'item_1',
    content: <PersonalInfo />,
  },
  {
    label: intl.formatMessage({ id: 'account_details.documents', defaultMessage: 'Documents' }),
    id: 'item_2',
    content: <Documents />,
  },
  {
    label: intl.formatMessage({ id: 'account_details.payment_details', defaultMessage: 'Payment Details' }),
    id: 'item_3',
    content: <PaymentDetails />,
  },
  {
    label: intl.formatMessage({ id: 'account_details.reset_password', defaultMessage: 'Reset Password' }),
    id: 'item_4',
    content: <ResetPassword />,
  },
  {
    label: intl.formatMessage({ id: 'account_details.privacy_settings', defaultMessage: 'Privacy Settings' }),
    id: 'item_5',
    content: (
      <WithPermission {...{ permission: 'shouldShowPrivacySettingsTabOnAccountDetails' }}>
        <PrivacySettings />
      </WithPermission>
    ),
    permissionKey: 'shouldShowPrivacySettingsTabOnAccountDetails',
  },
];
