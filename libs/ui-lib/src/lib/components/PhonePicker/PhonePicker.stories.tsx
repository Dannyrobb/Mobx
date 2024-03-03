import React from 'react';

import { Story, Meta } from '@storybook/react';

import { PhonePicker, PhonePickerProps } from './PhonePicker';

export default {
  title: 'UI Lib / Phone Picker',
  component: PhonePicker,
  argTypes: {},
} as Meta;

const All: Story<PhonePickerProps> = () => (
  <div {...{ style: { display: 'inline-grid', gap: 16, width: '100%' } }}>
    <PhonePicker {...{ label: 'Phone' }} />
  </div>
);

export const all = All.bind({});
all.args = {};
