import React, { ComponentProps } from 'react';

import { Story, Meta } from '@storybook/react';

import { TermsAndConditionsPrivacyPolicyEnforcer } from './TermsAndConditionPrivacyPolicyEnforcer';

export default {
  title: 'Popups / TermsAndConditionsPrivacyEnforcerDialog',
  component: TermsAndConditionsPrivacyPolicyEnforcer,
  argTypes: {},
} as Meta;

const Template: Story<ComponentProps<typeof TermsAndConditionsPrivacyPolicyEnforcer>> = (args) => {
  const [value, setValue] = React.useState('');
  return (
    <>
      <TermsAndConditionsPrivacyPolicyEnforcer {...{ value, onChange: setValue }} {...args} />
    </>
  );
};

export const base = Template.bind({});
base.args = {};

export const withError = Template.bind({});
withError.args = {
  notChecked: true,
};
