import React from 'react';

import { Story, Meta } from '@storybook/react';

import { Typography, TypographyProps } from './Typography';

export default {
  title: 'UI Lib / Typography',
  component: Typography,
  argTypes: {},
} as Meta;

const Template: Story<TypographyProps & { children: React.ReactNode }> = (args) => (
  <>
    <Typography {...args} />
  </>
);

const variants: TypographyProps['variant'][] = [
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'subtitle1',
  'subtitle2',
  'body1',
  'body2',
  // 'body3',
  'button',
  'caption',
  'overline',
];

export const base = () => (
  <>
    {variants.map((v) => (
      <Typography {...{ variant: v }}>This is - {v} Variant</Typography>
    ))}
  </>
);

export const variantH1 = Template.bind({});
variantH1.args = {
  children: 'h1 variant',
  variant: 'h1',
  component: 'h1',
};

export const variantH2 = Template.bind({});
variantH2.args = {
  children: 'h2 variant',
  variant: 'h2',
  component: 'h2',
};

export const variantH3 = Template.bind({});
variantH3.args = {
  children: 'h3 variant',
  variant: 'h3',
  component: 'h3',
};

export const variantH4 = Template.bind({});
variantH4.args = {
  children: 'h4 variant',
  variant: 'h4',
  component: 'h4',
};

export const variantH5 = Template.bind({});
variantH5.args = {
  children: 'h5 variant',
  variant: 'h5',
  component: 'h5',
};

export const variantH6 = Template.bind({});
variantH6.args = {
  children: 'h6 variant',
  variant: 'h6',
  component: 'h6',
};

export const variantBody1 = Template.bind({});
variantBody1.args = {
  children: 'Body 1 variant',
  variant: 'body1',
};

export const variantBody2 = Template.bind({});
variantBody2.args = {
  children: 'Body 2 variant',
  variant: 'body2',
};

// export const variantBody3 = Template.bind({});
// variantBody3.args = {
//   children: 'Body 3 variant',
//   variant: 'body3',
// };

export const variantButton = Template.bind({});
variantButton.args = {
  children: 'Button variant',
  variant: 'button',
};

export const variantCaption = Template.bind({});
variantCaption.args = {
  children: 'Caption variant',
  variant: 'button',
};

export const variantOverline = Template.bind({});
variantOverline.args = {
  children: 'Button variant',
  variant: 'overline',
};
