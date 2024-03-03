import React from 'react';
import { Story, Meta } from '@storybook/react';

import { ColumnFilter, ColumnFilterProps } from './ColumnFilter';

export default {
  title: 'UI Lib / ColumnFilter',
  component: ColumnFilter,
  argTypes: {},
} as Meta;

const All: Story<ColumnFilterProps> = (args) => {
  return (
    <div {...{ style: { width: '100%', gap: 16, overflow: 'hidden', height: 600 } }}>
      <ColumnFilter {...args} />
    </div>
  );
};

export const all = All.bind({});
all.args = {
  columns: ['ai1', 'bi1', 'ci', 'gi1', 'the', 'fu', 'ru', 'do'],
  onColumnToggle: (stuff) => {
    console.log(stuff);
  },
  onOrderChange: (items) => {
    console.log(items);
    // window.alert(JSON.stringify(items, null, 2));
  },
};
