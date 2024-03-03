import React, { ComponentProps } from 'react';

import { Meta, Story } from '@storybook/react';

import { CustomerTransactions, CustomerTransactionsProps } from './CustomerTransactions';

export default {
  title: 'Customer Profile / Components / CustomerTransactions',
  component: CustomerTransactions,
  argTypes: {},
} as Meta;

const customerTransactionsData: CustomerTransactionsProps['data'] = [
  { key: 'First deposit', value: '$240.00' },
  { key: 'Deposit date', value: '2019-12-29' },
  { key: 'Deposit count', value: '4' },
  { key: 'Total deposit', value: '$680.00' },
  { key: 'Total withdrawals', value: '0' },
  { key: 'Net deposit', value: `$680.00` },
];

// const Template: Story<ComponentProps<typeof CustomerTransactions>> = (args) => {
const Template: Story<ComponentProps<typeof CustomerTransactions>> = (args) => (
  <div {...{ style: { marginTop: '20' } }}>
    <CustomerTransactions {...args} />
  </div>
);
export const base = Template.bind({});
base.args = {
  data: customerTransactionsData,
};
