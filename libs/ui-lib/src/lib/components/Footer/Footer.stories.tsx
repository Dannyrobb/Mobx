import React from 'react';

import { Meta, Story } from '@storybook/react';

import Footer from './Footer';

export default {
  title: 'UI Lib / Footer',
  component: Footer,
  argsTypes: {},
} as Meta;

const Template: Story = (args) => (
  <div {...{ style: { display: 'inline-grid', gap: 16, width: '100%', marginTop: 10 } }}>
    <Footer {...args} />
  </div>
);

export const base = Template.bind({});
