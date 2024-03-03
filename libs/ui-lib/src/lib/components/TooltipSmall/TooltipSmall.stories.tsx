import React from 'react';

import { Meta, Story } from '@storybook/react';

import TooltipSmall, { TooltipProps } from './TooltipSmall';

export default {
  title: 'UI Lib / TooltipSmall',
  component: TooltipSmall,
  argTypes: {},
} as Meta;

const Template: Story<TooltipProps> = (args) => {
  return (
    <>
      <TooltipSmall {...args} />
    </>
  );
};

export const link = Template.bind({});
link.args = { title: 'Hi, this is tooltip text', children: <div>Hover me please</div> };
