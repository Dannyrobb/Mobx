import React from 'react';

import { Story, Meta } from '@storybook/react';

import { Toggle, ToggleProps } from './Toggle';

export default {
  title: 'UI Lib / Toggle',
  component: Toggle,
  argTypes: {},
} as Meta;

const All: Story<ToggleProps> = () => (
  <div {...{ style: { display: 'inline-grid', gap: 16 } }}>
    <Toggle {...{ variant: 'small', checked: false, label: 'Small Toggle' }} />
    <Toggle {...{ variant: 'small', checked: false, disabled: true, label: 'Small Toggle' }} />
    <Toggle {...{ variant: 'small', checked: true, label: 'Small Toggle' }} />
    <Toggle {...{ variant: 'small', checked: true, disabled: true, label: 'Small Toggle' }} />
    <Toggle {...{ checked: false, label: 'Large Toggle' }} />
    <Toggle {...{ checked: false, disabled: true, label: 'Large Toggle' }} />
    <Toggle {...{ checked: true, label: 'Large Toggle' }} />
    <Toggle {...{ checked: true, disabled: true, label: 'Large Toggle' }} />
  </div>
);

const Small: Story<ToggleProps> = () => (
  <div {...{ style: { display: 'inline-grid', gap: 16 } }}>
    <Toggle {...{ variant: 'small' }} />
    <Toggle {...{ variant: 'small', checked: true }} />
    <Toggle {...{ variant: 'small', checked: true, label: 'With Label' }} />
    <Toggle {...{ variant: 'small', checked: true, disabled: true, label: 'Disabled' }} />
  </div>
);

const Large: Story<ToggleProps> = () => (
  <div {...{ style: { display: 'inline-grid', gap: 16 } }}>
    <Toggle {...{}} />
    <Toggle {...{ checked: true }} />
    <Toggle {...{ checked: true, label: 'With Label' }} />
    <Toggle {...{ checked: true, disabled: true, label: 'Disabled' }} />
  </div>
);

const Template: Story<ToggleProps> = (args) => {
  return (
    <>
      <Toggle {...args} />
    </>
  );
};

export const all = All.bind({});
all.args = {};

export const small = Small.bind({});
small.args = {};

export const large = Large.bind({});
large.args = {};

export const base = Template.bind({});
base.args = {};
