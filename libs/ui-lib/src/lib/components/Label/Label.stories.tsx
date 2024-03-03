import React from 'react';

import { Story, Meta } from '@storybook/react';

import { Label, LabelProps } from './Label';

export default {
  title: 'UI Lib / Label',
  component: Label,
  argTypes: {},
} as Meta;

const Template: Story<LabelProps> = (args) => (
  <>
    <Label {...args} />
  </>
);

export const base = Template.bind({});
base.args = {
  label: 'This Label',
};
