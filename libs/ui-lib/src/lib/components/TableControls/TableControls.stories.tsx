import React from 'react';

import { Story, Meta } from '@storybook/react';

import { TableControls, TableControlsProps } from './TableControls';

export default {
  title: 'UI Lib / TableControls',
  component: TableControls,
  argTypes: {},
} as Meta;

const useStartDate = () => {
  const [startDate, setStartDate] = React.useState<string | null>('1/1/2010');
  return {
    startDate,
    setStartDate,
  };
};

const useEndDate = () => {
  const [endDate, setEndDate] = React.useState<string | null>('1/1/2010');
  return {
    endDate,
    setEndDate,
  };
};

const Template: Story<TableControlsProps> = (args) => {
  const startDateState = useStartDate();
  const endDateState = useEndDate();
  return (
    <>
      <TableControls {...args} {...startDateState} {...endDateState} />
    </>
  );
};

export const base = Template.bind({});
base.args = {
  hiddenColumns: [],
  runReport: () => {
    console.log('running');
  },
  columns: [
    { Header: 'foo', accessor: 'FOO' },
    { Header: 'BAR', accessor: 'BAR' },
  ],
  withAdditionalSelect: true,
  additionalSelectProps: {
    options: ['hi', 'there'].map((opt) => ({ key: opt, label: opt, value: opt })),
    onChange: (opt) => {
      console.log(opt);
    },
    selected: { key: 'hi', label: 'hi', value: 'hi' },
  },
};
