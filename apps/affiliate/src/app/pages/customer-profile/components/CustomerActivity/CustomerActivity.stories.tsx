import React, { ComponentProps } from 'react';

import { Meta, Story } from '@storybook/react';

import { CustomerActivity, CustomerActivityProps } from './CustomerActivity';

export default {
  title: 'Customer Profile / Components / CustomerActivity',
  component: CustomerActivity,
  argTypes: {},
} as Meta;

const customerActivityData: CustomerActivityProps['data'] = [
  { key: 'Activity count', value: 654 }, //Not in the GRRR?
  { key: 'Volume', value: 978510.086 },
  { key: 'PL', value: 42.79 },
  { key: 'Net PL', value: 42.79 },
  { key: 'LOT', value: 3.97 },
  { key: 'Spread', value: 69.25 },
  { key: 'ROI', value: 2.06 }, //Not in the GRRR?
  { key: 'Brokerage fee', value: 69.87 },
  { key: 'Markup', value: 69.25 }, //Not in the GRRR?
];

const Template: Story<ComponentProps<typeof CustomerActivity>> = (args) => (
  <div {...{ style: { marginTop: '20' } }}>
    <CustomerActivity {...args} />
  </div>
);

export const base = Template.bind({});
base.args = {
  data: customerActivityData,
};
