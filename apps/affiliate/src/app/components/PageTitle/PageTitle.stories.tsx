import React from 'react';

import { Meta, Story } from '@storybook/react';

import { PageTitle, PageTitleProps } from './PageTitle';

export default {
  title: 'Components / PageTitle',
  component: PageTitle,
  argTypes: {},
} as Meta;

const Template: Story<PageTitleProps> = (args) => <PageTitle {...args} />;

export const base = Template.bind({});
base.args = {
  children: "I'm an awesopme page title",
};
