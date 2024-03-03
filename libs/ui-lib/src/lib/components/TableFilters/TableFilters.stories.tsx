import React from 'react';

import { Story, Meta } from '@storybook/react';

import { TableFilters, TableFiltersProps } from './TableFilters';

export default {
  title: 'UI Lib / TableFilters',
  component: TableFilters,
  argTypes: {},
} as Meta;

const Template: Story<TableFiltersProps> = (args) => (
  <div {...{ style: { padding: 100 } }}>
    <TableFilters {...args} />
  </div>
);

export const base = Template.bind({});
base.args = {
  title: 'Activity Report',
  filterOptions: ['Brand', 'Type', 'Language'].map((option) => ({ key: option, value: option, label: option })),
  selectedFilters: [],
};
