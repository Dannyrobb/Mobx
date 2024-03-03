import React, { ComponentProps } from 'react';
import { Story, Meta } from '@storybook/react';

import { MarketingCard } from './MarketingCard';

export default {
  title: 'Components / MarketingCard',
  component: MarketingCard,
  argTypes: {},
} as Meta;

const Template: Story<ComponentProps<typeof MarketingCard>> = (args) => (
  <>
    <MarketingCard {...args} />
  </>
);

export const base = Template.bind({});
base.args = {
  
};
