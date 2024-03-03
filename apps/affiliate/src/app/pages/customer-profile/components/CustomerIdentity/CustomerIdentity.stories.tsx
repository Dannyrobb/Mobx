import React, { ComponentProps } from 'react';

import { Meta, Story } from '@storybook/react';

import { CustomerIdentity, CustomerIdentityProps } from './CustomerIdentity';

export default {
  title: 'Customer Profile / Components / CustomerIdentity',
  component: CustomerIdentity,
  argTypes: {},
} as Meta;

const customerIdentityData: CustomerIdentityProps['data'] = [
  { key: 'Customer ID', value: 'casinofriday-103281625001834' },
  { key: 'Status', value: 'SuccessfulDeposit' },
  { key: 'Age', value: '34' },
  { key: 'Refferal URL', value: 'https://slotplayersclub.com/' },
  { key: 'Device', value: 'Mobile' },
  { key: 'Country', value: 'Austria' },
  { key: 'Registration date', value: '06/29/2021' },
];

const Template: Story<ComponentProps<typeof CustomerIdentity>> = (args) => (
  <div {...{ style: { height: '100vh' } }}>
    <CustomerIdentity {...args} />
  </div>
);

export const base = Template.bind({});
base.args = {
  data: customerIdentityData,
};
