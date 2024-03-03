import React from 'react';

import { Story, Meta } from '@storybook/react';

import { Initial, InitialProps } from './Initial';

export default {
  title: 'Playground / Initial',
  component: Initial,
  argTypes: {},
} as Meta;

const Template: Story<InitialProps> = (args) => (
  <>
    <Initial {...args} />
  </>
);

export const base = Template.bind({});
base.args = {};
