import React, { ComponentProps } from 'react';

import { Story, Meta } from '@storybook/react';

import { Dialog } from './Dialog';

export default {
  title: 'UI Lib / Dialog',
  component: Dialog,
  argTypes: {},
} as Meta;

const Template: Story<ComponentProps<typeof Dialog>> = (args) => (
  <>
    <Dialog {...args} />
  </>
);
export const base = Template.bind({});
base.args = {
  title: 'Dialog Title',
  label: 'Stuff to know',
  variant: 'transactional',
  children: 'Some body of a Dialog explaning stuff',
};
