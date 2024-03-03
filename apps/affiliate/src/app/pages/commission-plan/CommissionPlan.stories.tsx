import React from 'react';

import { Meta, Story } from '@storybook/react';

import { CommissionPlanPage, CommissionPlanPageProps } from './CommissionPlan';

// eslint-disable-next-line jest/no-mocks-import
import { mockData } from '../../__mocks__/commission-plan';

export default {
  title: 'Commission Plan / Page / CommissionPlan',
  component: CommissionPlanPage,
  argTypes: {},
} as Meta;

const Template: Story<CommissionPlanPageProps> = (args) => (
  <>
    <CommissionPlanPage {...args} />
  </>
);

export const base = Template.bind({});
base.args = {
  data: mockData,
};
