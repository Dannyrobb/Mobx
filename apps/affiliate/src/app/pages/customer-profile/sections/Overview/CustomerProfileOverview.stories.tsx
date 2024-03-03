import React, { ComponentProps } from 'react';

import { Meta, Story } from '@storybook/react';

import { CustomerProfileOverview } from './CustomerProfileOverview';

export default {
  title: 'Customer Profile / Page',
  component: CustomerProfileOverview,
  args: {},
} as Meta;

const Template: Story<ComponentProps<typeof CustomerProfileOverview>> = (args) => {
  return <CustomerProfileOverview {...args} />;
};

export const base = Template.bind({});
base.args = {};
