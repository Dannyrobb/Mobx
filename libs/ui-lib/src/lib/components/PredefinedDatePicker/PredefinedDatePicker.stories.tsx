import React from 'react';

import { Story, Meta } from '@storybook/react';

import { PredefinedDatePicker, PredefinedDatePickerProps } from './PredefinedDatePicker';

export default {
  title: 'UI Lib / PredefinedDatePicker',
  component: PredefinedDatePicker,
  argTypes: {},
} as Meta;

const Template: Story<PredefinedDatePickerProps> = (args) => (
  <>
    <PredefinedDatePicker {...args} />
  </>
);

export const base = Template.bind({});
base.args = {
  onChange: (startDate, endDate) => {
    console.log(startDate, endDate);
  },
};
