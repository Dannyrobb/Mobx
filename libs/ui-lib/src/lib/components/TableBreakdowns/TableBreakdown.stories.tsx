import React, {ComponentProps} from 'react';
import {Story, Meta} from '@storybook/react/types-6-0';

import {TableBreakdowns} from './TableBreakdowns';
import {Option} from "../Select/Select";

export default {
  title: 'UI Lib / TableBreakdown',
  component: TableBreakdowns,
  argTypes: {},
} as Meta;

const Template: Story<ComponentProps<typeof TableBreakdowns>> = (args) => {
  const [selectedList, setSelectedList] = React.useState<string[]>([]);
  const [nonSelectedList, setNonSelectedList] = React.useState<string[]>([]);

  const handleChange = (option: Option) => {
    setSelectedList([...selectedList, option.value]);
    setNonSelectedList(nonSelectedList.filter(item => item !== option.value));
  }
  return <>
    <TableBreakdowns {...args} options={args.options ?? []} selected={selectedList} onChange={handleChange}/>
  </>
};

export const base = Template.bind({});
base.args = {
  options: ['Brand', 'And', 'Land', 'Type']
};
