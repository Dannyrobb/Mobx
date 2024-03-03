import React, { ComponentProps } from 'react';

import { Story, Meta } from '@storybook/react';

import { ConfirmationDialog } from './ConfirmationDialog';

export default {
  title: ' / ConfirmationDialog',
  component: ConfirmationDialog,
  argTypes: {},
} as Meta;

const Template: Story<ComponentProps<typeof ConfirmationDialog>> = (args) => {
  const [value, setValue] = React.useState('');
  return (
    <>
      <ConfirmationDialog {...{ value, onChange: setValue }} {...args} />
    </>
  );
};

export const base = Template.bind({});
base.args = {};
