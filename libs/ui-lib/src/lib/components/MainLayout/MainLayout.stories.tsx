import React from 'react';

import { Story, Meta } from '@storybook/react';

import { MainLayout, MainLayoutProps } from './MainLayout';

export default {
  title: 'UI Lib / MainLayout',
  component: MainLayout,
  argTypes: {},
} as Meta;

const Template: Story<MainLayoutProps> = (args) => (
  <>
    <MainLayout {...args} />
  </>
);

export const base = Template.bind({});
base.args = {};
