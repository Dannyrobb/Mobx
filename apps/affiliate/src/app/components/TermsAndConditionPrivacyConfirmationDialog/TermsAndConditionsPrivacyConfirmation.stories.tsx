import React, { ComponentProps } from 'react';

import { Story, Meta } from '@storybook/react';

import { TermsAndConditionsPrivacyConfirmation } from './TermsAndConditionsPrivacyConfirmation';

export default {
  title: 'Popups / TermsAndConditionsPrivacyConfirmationDialog',
  component: TermsAndConditionsPrivacyConfirmation,
  argTypes: {},
} as Meta;

const Template: Story<ComponentProps<typeof TermsAndConditionsPrivacyConfirmation>> = (args) => {
  const [value, setValue] = React.useState('');
  return (
    <>
      <TermsAndConditionsPrivacyConfirmation {...{ value, onChange: setValue }} {...args} />
    </>
  );
};

export const base = Template.bind({});
base.args = {};

export const withError = Template.bind({});
withError.args = {
  error: 'Error',
};
