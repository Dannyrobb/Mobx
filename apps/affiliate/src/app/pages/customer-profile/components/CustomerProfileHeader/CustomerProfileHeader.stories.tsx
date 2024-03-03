import React, { ComponentProps } from 'react';

import { Meta, Story } from '@storybook/react';

import { CustomerCommission, CustomerCommissionProps } from '../CustomerCommission/CustomerCommission';

export default {
  title: 'Customer Profile / Components / CustomerCommission',
  component: CustomerCommission,
  argTypes: {},
} as Meta;

const customerCommissionData: CustomerCommissionProps['data'] = null;
const Template: Story<ComponentProps<typeof CustomerCommission>> = (args) => (
  <div {...{ style: { marginTop: '15' } }}>
    <CustomerCommission {...args} />
  </div>
);

export const base = Template.bind({});
base.args = {
  data: customerCommissionData,
};
