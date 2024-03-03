import React, { ComponentProps } from 'react';

import { Story, Meta } from '@storybook/react';

import { PasswordConfirmation } from './PasswordConfirmation';

export default {
  title: 'Popups / PasswordConfirmationDialog',
  component: PasswordConfirmation,
  argTypes: {},
} as Meta;

const Template: Story<ComponentProps<typeof PasswordConfirmation>> = (args) => {
  const [value, setValue] = React.useState('');
  return (
    <>
      <PasswordConfirmation {...{ value, onChange: setValue }} {...args} />
    </>
  );
};

export const base = Template.bind({});
base.args = {};

export const withError = Template.bind({});
withError.args = {
  error: 'Error',
};
