import React from 'react';

import { Meta, Story } from '@storybook/react';

import { Header, HeaderProps } from './Header';

export default {
  title: 'Account Details / Components / Header',
  component: Header,
  argTypes: {},
} as Meta;

const Template: Story<HeaderProps> = (args) => <Header {...args} />;

export const header = Template.bind({});
header.args = {
  name: 'Anton Goroshnikov',
  affiliateId: '324234',
};
