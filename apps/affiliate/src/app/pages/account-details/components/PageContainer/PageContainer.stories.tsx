import React from 'react';

import { Story, Meta } from '@storybook/react';

import { PageContainer, PageContainerProps } from './PageContainer';

export default {
  title: 'Account Details / Components / PageContainer',
  component: PageContainer,
  argTypes: {},
} as Meta;

const Template: Story<PageContainerProps> = (args) => (
  <>
    <PageContainer {...args} />
  </>
);

export const base = Template.bind({});
base.args = {};
