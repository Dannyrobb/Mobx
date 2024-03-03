import React, { ComponentProps } from 'react';

import { Story, Meta } from '@storybook/react';

import { PrivacySettings } from './PrivacySettings';

export default {
  title: 'Account Details / Components / PrivacySettings',
  component: PrivacySettings,
  argTypes: {},
} as Meta;

const Template: Story<ComponentProps<typeof PrivacySettings>> = (args) => (
  <>
    <PrivacySettings {...args} />
  </>
);

export const base = Template.bind({});
base.args = {};
