import React from 'react';

import { Meta, Story } from '@storybook/react';

// import Column from '../Column/Column';
// import EditInline from '../EditInline/EditInline';
// import Row from '../Row/Row';
import Accordion, { AccordionProps } from './Accordion';

export default {
  title: 'UI Lib / Accordion',
  component: Accordion,
  argTypes: {},
} as Meta;

const Template: Story<AccordionProps> = (args) => <Accordion {...args} />;

export const base = Template.bind({});
base.args = {
  header: 'Title',
  content: <div>Content</div>,
};
