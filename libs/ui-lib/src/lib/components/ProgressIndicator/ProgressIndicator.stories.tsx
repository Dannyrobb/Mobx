import React from 'react';

import { Story, Meta } from '@storybook/react';

import { ProgressIndicator, ProgressIndicatorProps } from './ProgressIndicator';

export default {
  title: 'UI-Lib / ProgressIndicator',
  component: ProgressIndicator,
  argTypes: {},
} as Meta;

const Template: Story<ProgressIndicatorProps> = (args) => (
  <>
    <ProgressIndicator {...args} />
  </>
);

export const vertical = Template.bind({});
vertical.args = {
  type: 'vertical',
  steps: [
    {
      key: 'a',
      title: 'Step',
      isCurrent: false,
      hasError: false,
    },
    {
      key: 'b',
      title: 'Step',
      isCurrent: true,
      hasError: false,
    },
    {
      key: 'c',
      title: 'Also a Step',
      isCurrent: false,
      hasError: false,
    },
    {
      key: 'c',
      title: 'Disabled',
      label: 'Disabled',
      disabled: true,
      isCurrent: false,
      hasError: false,
    },
    {
      key: 'd',
      title: 'HAVE A PROBLEM',
      isCurrent: false,
      hasError: true,
    },
  ],
};
