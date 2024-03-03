import React, { ComponentProps } from 'react';
import { Story, Meta } from '@storybook/react';

import { SkeletonBox } from './SkeletonBox';

export default {
  title: 'Ui Lib / SkeletonBox',
  component: SkeletonBox,
  argTypes: {},
} as Meta;

const Template: Story<ComponentProps<typeof SkeletonBox>> = (args) => (
  <>
    <SkeletonBox {...args} />
  </>
);

export const base = Template.bind({});
base.args = {
  height: 100,
  width: 100,
};
