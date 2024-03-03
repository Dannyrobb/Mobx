import React from 'react';

import { observer } from 'mobx-react';

import { useStore } from '../../../../stores/setupContext';

export interface CustomerProfileHeaderProps {
  //   data: { key: CustomerCommissionKey; value: string | number } | null;
}

export const CustomerProfileHeader: React.FunctionComponent<CustomerProfileHeaderProps> = () => {
  return <></>;
};

const Observed = observer(CustomerProfileHeader);

const WithStoreConnection = observer(() => {
  const { customerProfile } = useStore();

  const { activeTabKey, setActiveTab } = customerProfile;

  return <Observed {...{ activeTabKey, setActiveTab, pageTitle: 'My account details' }} />;
});

export default WithStoreConnection;
