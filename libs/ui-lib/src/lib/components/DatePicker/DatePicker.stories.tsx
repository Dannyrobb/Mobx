import React from 'react';
import { Story, Meta } from '@storybook/react';

import { DatePickerProps, DatePicker } from './DatePicker';

export default {
  title: 'UI Lib / DatePicker',
  component: DatePicker,
  argTypes: {},
} as Meta;

const Template: Story<DatePickerProps> = (args) => (
  <div {...{ style: { width: 600 } }}>
    <DatePicker {...args}></DatePicker>
  </div>
);
export const base = Template.bind({});
base.args = {
  variant: 'regular',
  size: 'small',
  onChange: (date) => {
    console.log(date);
  },
};

const AllSizes: Story<DatePickerProps> = (args) => (
  <div {...{ style: { display: 'grid', gap: 16, gridTemplateColumns: 'max-content' } }}>
    <DatePicker
      {...{
        size: 'small',
        onChange: (date) => {
          console.log(date);
        },
      }}
    />

    <DatePicker
      {...{
        size: 'medium',
        onChange: (date) => {
          console.log(date);
        },
      }}
    />
    <DatePicker
      {...{
        size: 'large',
        onChange: (date) => {
          console.log(date);
        },
      }}
    />
  </div>
);

const AllVariants: Story<DatePickerProps> = (args) => (
  <div {...{ style: { display: 'grid', gap: 16, gridTemplateColumns: 'max-content' } }}>
    <DatePicker
      {...{
        variant: 'inform',
        onChange: (date) => {
          console.log(date);
        },
      }}
    />

    <DatePicker
      {...{
        variant: 'left',
        onChange: (date) => {
          console.log(date);
        },
      }}
    />
    <DatePicker
      {...{
        variant: 'right',
        onChange: (date) => {
          console.log(date);
        },
      }}
    />
    <DatePicker
      {...{
        variant: 'regular',
        onChange: (date) => {
          console.log(date);
        },
      }}
    />
  </div>
);

const WithCustomInput: Story<DatePickerProps> = (args) => (
  <div {...{ style: { display: 'grid', gap: 16, gridTemplateColumns: 'max-content' } }}>
    <DatePicker
      {...{
        customInput: <button>select Date</button>,
        size: 'small',
        onChange: (date) => {
          console.log(date);
        },
      }}
    />
  </div>
);

export const allSizesDatePickers = AllSizes.bind({});
export const allVariants = AllVariants.bind({});
export const withCustomInput = WithCustomInput.bind({});
