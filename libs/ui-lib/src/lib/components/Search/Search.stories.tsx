import React from 'react';

import { Story, Meta } from '@storybook/react';

import { Search, SearchProps } from './Search';

export default {
  title: 'UI Lib / Search',
  component: Search,
  argTypes: {},
} as Meta;

const Template: Story<SearchProps> = (args) => (
  <>
    <Search {...args} />
  </>
);

export const base = Template.bind({});
base.args = {};
