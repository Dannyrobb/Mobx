import React, { ComponentProps } from 'react';

import { Story, Meta } from '@storybook/react';

import { DeleteAccountConfirmation } from './DeleteAccountConfirmation';

export default {
  title: 'Popups / DeleteAccountConfirmationDialog',
  component: DeleteAccountConfirmation,
  argTypes: {},
} as Meta;

const Template: Story<ComponentProps<typeof DeleteAccountConfirmation>> = (args) => {
  const [value, setValue] = React.useState('');
  return (
    <>
      <DeleteAccountConfirmation {...{ value, onChange: setValue }} {...args} />
    </>
  );
};

export const base = Template.bind({});
base.args = {};

export const withError = Template.bind({});
withError.args = {
  error: 'Error',
};
