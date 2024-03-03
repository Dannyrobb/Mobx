import React from 'react';

import { CommissionIcon } from '@cellxpert/icons';
import { Card } from '@cellxpert/ui-lib';
import { styled } from '@storybook/theming';
import { observer } from 'mobx-react';

import { useStore } from '../../../../stores/setupContext';

export interface CustomerCommissionProps {
  data: { key: CustomerCommissionKey; value: string | number } | null;
}

export type CustomerCommissionKey = 'Commission';

const CommissionsWrapper = styled('div')(() => ({
  flexGrow: 4,
}));

export const CustomerCommission: React.FunctionComponent<CustomerCommissionProps> = ({ data }) => {
  if (!data) {
    return null;
  }
  return (
    <CommissionsWrapper>
      <Card
        {...{
          icon: <CommissionIcon {...{ color: 'main', height: 20, width: 20 }} />,
          title: data?.key,
          mediumCard: true,
          fillHeight: true,
          children: <div>{data?.value}</div>,
        }}
      />
    </CommissionsWrapper>
  );
};

const Observed = observer(CustomerCommission);

const WithStoreConnection = observer(() => {
  const { customerProfileOverview } = useStore();

  const { customerCommissionData } = customerProfileOverview;

  return <Observed {...{ data: customerCommissionData }} />;
});

export default WithStoreConnection;
