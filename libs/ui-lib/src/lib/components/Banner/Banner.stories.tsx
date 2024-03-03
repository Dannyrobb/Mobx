import React from 'react';

import { Story, Meta } from '@storybook/react';

import { Banner, BannerProps } from './Banner';

export default {
  title: 'UI Lib / Banner',
  component: Banner,
  argTypes: {},
} as Meta;

const All: Story<BannerProps> = () => (
  <div {...{ style: { display: 'inline-grid', gap: 16, width: '100%' } }}>
    <Banner {...{ title: 'Informational notification', subtitle: '?asd', variant: 'info' }} />
    <Banner {...{ title: 'Something Dangerous', variant: 'warning' }} />
    <Banner {...{ title: 'Something Dangerous', variant: 'error' }} />
    <Banner {...{ title: 'Something Dangerous', variant: 'success' }} />
  </div>
);
const Template: Story<BannerProps> = (args) => (
  <>
    <Banner {...args} />
  </>
);

export const all = All.bind({});
all.args = {};

export const info = Template.bind({});
info.args = {
  title: 'Informational notification',
  subtitle: '?asd',
  variant: 'info',
};

export const warning = Template.bind({});
warning.args = {
  title: 'Something Dangerous',
  variant: 'warning',
};

export const error = Template.bind({});
error.args = {
  title: 'Something Dangerous',
  variant: 'error',
};

export const success = Template.bind({});
success.args = {
  title: 'Something Dangerous',
  variant: 'success',
};
