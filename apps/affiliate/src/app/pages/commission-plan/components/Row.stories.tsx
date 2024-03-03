import React from 'react';

import { Story, Meta } from '@storybook/react';

import { Row, RowProps } from './Row';

export default {
  title: 'Commission Plan / Components / Row',
  component: Row,
  argTypes: {},
} as Meta;

const Template: Story<RowProps> = (args) => (
  <>
    <Row {...args} />
  </>
);
const ManyRows: Story<RowProps> = (args) => (
  <>
    <Row {...args} />
    <Row {...args} />
    <Row {...args} {...{ isSubRow: true }} />
    <Row {...args} />
  </>
);

export const base = Template.bind({});
base.args = {
  // children: 'Foo',
};

export const manyRows = ManyRows.bind({});
manyRows.args = {
  // children: 'Foo',
};
