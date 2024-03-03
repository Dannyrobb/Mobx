import React, { ComponentProps } from 'react';

import { Story, Meta } from '@storybook/react';

import { InnerScroll } from './InnerScroll';

export default {
  title: 'UI-Lib / InnerScroll',
  component: InnerScroll,
  argTypes: {},
} as Meta;

const Template: Story<ComponentProps<typeof InnerScroll>> = (args) => (
  <div {...{ style: { height: 100 } }}>
    <InnerScroll {...args} />
  </div>
);

export const base = Template.bind({});
base.args = {
  children:
    'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi ea autem quos corrupti? Provident inventore Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi ea autem quos corrupti? Provident inventore Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi ea autem quos corrupti? Provident inventore Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi ea autem quos corrupti? Provident inventore Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi ea autem quos corrupti? Provident inventore Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi ea autem quos corrupti? Provident inventore Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi ea autem quos corrupti? Provident inventore Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi ea autem quos corrupti? Provident inventore Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi ea autem quos corrupti? Provident inventore Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi ea autem quos corrupti? Provident inventore Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi ea autem quos corrupti? Provident inventore Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi ea autem quos corrupti? Provident inventore Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi ea autem quos corrupti? Provident inventore Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi ea autem quos corrupti? Provident inventore Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi ea autem quos corrupti? Provident inventore Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi ea autem quos corrupti? Provident inventore Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi ea autem quos corrupti? Provident inventore Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi ea autem quos corrupti? Provident inventore Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi ea autem quos corrupti? Provident inventore Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi ea autem quos corrupti? Provident inventore Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi ea autem quos corrupti? Provident inventore Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi ea autem quos corrupti? Provident inventore Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi ea autem quos corrupti? Provident inventore Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi ea autem quos corrupti? Provident inventore Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi ea autem quos corrupti? Provident inventore Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi ea autem quos corrupti? Provident inventore Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi ea autem quos corrupti? Provident inventore Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi ea autem quos corrupti? Provident inventore Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi ea autem quos corrupti? Provident inventore Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi ea autem quos corrupti? Provident inventore Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi ea autem quos corrupti? Provident inventore Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi ea autem quos corrupti? Provident inventore Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi ea autem quos corrupti? Provident inventore Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi ea autem quos corrupti? Provident inventore Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi ea autem quos corrupti? Provident inventore Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi ea autem quos corrupti? Provident inventore Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi ea autem quos corrupti? Provident inventore Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi ea autem quos corrupti? Provident inventore Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi ea autem quos corrupti? Provident inventore Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi ea autem quos corrupti? Provident inventore Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi ea autem quos corrupti? Provident inventore Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi ea autem quos corrupti? Provident inventore Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi ea autem quos corrupti? Provident inventore Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi ea autem quos corrupti? Provident inventore Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi ea autem quos corrupti? Provident inventore Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi ea autem quos corrupti? Provident inventore Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi ea autem quos corrupti? Provident inventore Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi ea autem quos corrupti? Provident inventore Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi ea autem quos corrupti? Provident inventore Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi ea autem quos corrupti? Provident inventore Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi ea autem quos corrupti? Provident inventore Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi ea autem quos corrupti? Provident inventore Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi ea autem quos corrupti? Provident inventore Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi ea autem quos corrupti? Provident inventore Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi ea autem quos corrupti? Provident inventore Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi ea autem quos corrupti? Provident inventore Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi ea autem quos corrupti? Provident inventore Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi ea autem quos corrupti? Provident inventore Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi ea autem quos corrupti? Provident inventore Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi ea autem quos corrupti? Provident inventore Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi ea autem quos corrupti? Provident inventore Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi ea autem quos corrupti? Provident inventore Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi ea autem quos corrupti? Provident inventore Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi ea autem quos corrupti? Provident inventore Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi ea autem quos corrupti? Provident inventore Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi ea autem quos corrupti? Provident inventore Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi ea autem quos corrupti? Provident inventore Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi ea autem quos corrupti? Provident inventore Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi ea autem quos corrupti? Provident inventore Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi ea autem quos corrupti? Provident inventore Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi ea autem quos corrupti? Provident inventore Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi ea autem quos corrupti? Provident inventore Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi ea autem quos corrupti? Provident inventore Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi ea autem quos corrupti? Provident inventore Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi ea autem quos corrupti? Provident inventore Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi ea autem quos corrupti? Provident inventore Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi ea autem quos corrupti? Provident inventore Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi ea autem quos corrupti? Provident inventore Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi ea autem quos corrupti? Provident inventore Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi ea autem quos corrupti? Provident inventore Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi ea autem quos corrupti? Provident inventore Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi ea autem quos corrupti? Provident inventore Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi ea autem quos corrupti? Provident inventore Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi ea autem quos corrupti? Provident inventore Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi ea autem quos corrupti? Provident inventore Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi ea autem quos corrupti? Provident inventore Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi ea autem quos corrupti? Provident inventore Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi ea autem quos corrupti? Provident inventore Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi ea autem quos corrupti? Provident inventore Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi ea autem quos corrupti? Provident inventore Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi ea autem quos corrupti? Provident inventore Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi ea autem quos corrupti? Provident inventore Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi ea autem quos corrupti? Provident inventore Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi ea autem quos corrupti? Provident inventore Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi ea autem quos corrupti? Provident inventore Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi ea autem quos corrupti? Provident inventore Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi ea autem quos corrupti? Provident inventore Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi ea autem quos corrupti? Provident inventore Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi ea autem quos corrupti? Provident inventore Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi ea autem quos corrupti? Provident inventore Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi ea autem quos corrupti? Provident inventore Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi ea autem quos corrupti? Provident inventore Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi ea autem quos corrupti? Provident inventore Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi ea autem quos corrupti? Provident inventore Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi ea autem quos corrupti? Provident inventore Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi ea autem quos corrupti? Provident inventore Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi ea autem quos corrupti? Provident inventore Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi ea autem quos corrupti? Provident inventore Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi ea autem quos corrupti? Provident inventore Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi ea autem quos corrupti? Provident inventore Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi ea autem quos corrupti? Provident inventore Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi ea autem quos corrupti? Provident inventore Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi ea autem quos corrupti? Provident inventore Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi ea autem quos corrupti? Provident inventore Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi ea autem quos corrupti? Provident inventore Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi ea autem quos corrupti? Provident inventore Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi ea autem quos corrupti? Provident inventore Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi ea autem quos corrupti? Provident inventore Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi ea autem quos corrupti? Provident inventore Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi ea autem quos corrupti? Provident inventore Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi ea autem quos corrupti? Provident inventore Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi ea autem quos corrupti? Provident inventore Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi ea autem quos corrupti? Provident inventore Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi ea autem quos corrupti? Provident inventore Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi ea autem quos corrupti? Provident inventore Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi ea autem quos corrupti? Provident inventore Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi ea autem quos corrupti? Provident inventore Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi ea autem quos corrupti? Provident inventore Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi ea autem quos corrupti? Provident inventore Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi ea autem quos corrupti? Provident inventore Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi ea autem quos corrupti? Provident inventore Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi ea autem quos corrupti? Provident inventore Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi ea autem quos corrupti? Provident inventore Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi ea autem quos corrupti? Provident inventore Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi ea autem quos corrupti? Provident inventore Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi ea autem quos corrupti? Provident inventore Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi ea autem quos corrupti? Provident inventore Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi ea autem quos corrupti? Provident inventore Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi ea autem quos corrupti? Provident inventore Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi ea autem quos corrupti? Provident inventore Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi ea autem quos corrupti? Provident inventore Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi ea autem quos corrupti? Provident inventore Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi ea autem quos corrupti? Provident inventore Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi ea autem quos corrupti? Provident inventore Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi ea autem quos corrupti? Provident inventore Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi ea autem quos corrupti? Provident inventore Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi ea autem quos corrupti? Provident inventore Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi ea autem quos corrupti? Provident inventore Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi ea autem quos corrupti? Provident inventore Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi ea autem quos corrupti? Provident inventore Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi ea autem quos corrupti? Provident inventore Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi ea autem quos corrupti? Provident inventore Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi ea autem quos corrupti? Provident inventore Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi ea autem quos corrupti? Provident inventore Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi ea autem quos corrupti? Provident inventore Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi ea autem quos corrupti? Provident inventore Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi ea autem quos corrupti? Provident inventore Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi ea autem quos corrupti? Provident inventore Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi ea autem quos corrupti? Provident inventore Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi ea autem quos corrupti? Provident inventore ',
};
