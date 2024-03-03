import React, { ComponentProps } from 'react';
import { Story, Meta } from '@storybook/react';

import { Foo } from './Foo';

export default {
  title: 'Components / Foo',
  component: Foo,
  argTypes: {},
} as Meta;

const Template: Story<ComponentProps<typeof Foo>> = (args) => (
  <>
    <Foo {...args} />
  </>
);

export const base = Template.bind({});
base.args = {
  
};
