import React from 'react';

import { Story, Meta } from '@storybook/react';

import { Toast, ToastProps } from './Toast';

export default {
  title: 'UI Lib / Toast',
  component: Toast,
  args: {},
} as Meta;

const Template: Story<ToastProps> = (args) => (
  <>
    <Toast {...args} />
  </>
);

const InformationToaster: Story<ToastProps> = () => (
  <div {...{ style: { display: 'inline-grid', gap: 16 } }}>
    <Toast {...{ title: 'titleheloo', message: 'testing', information: true }} />
  </div>
);
const SuccessToaster: Story<ToastProps> = () => (
  <div {...{ style: { display: 'inline-grid', gap: 16 } }}>
    <Toast {...{ title: 'titleheloo', message: 'testing', success: true }} />
  </div>
);
const WarningToaster: Story<ToastProps> = () => (
  <div {...{ style: { display: 'inline-grid', gap: 16 } }}>
    <Toast {...{ title: 'titleheloo', message: 'testing', warning: true }} />
  </div>
);
const ErrorToaster: Story<ToastProps> = () => (
  <div {...{ style: { display: 'inline-grid', gap: 16 } }}>
    <Toast {...{ title: 'titleheloo', message: 'testing', error: true }} />
  </div>
);

export const base = Template.bind({});
base.args = {};

export const information = InformationToaster.bind({});
export const success = SuccessToaster.bind({});
export const warning = WarningToaster.bind({});
export const error = ErrorToaster.bind({});
