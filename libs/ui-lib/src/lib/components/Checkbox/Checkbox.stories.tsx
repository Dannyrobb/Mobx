import React from 'react';

import { Story, Meta } from '@storybook/react';

import { Checkbox, CheckboxProps } from './Checkbox';

export default {
  title: 'UI Lib / Checkbox',
  component: Checkbox,
  argTypes: {},
} as Meta;

const useInput = () => {
  const [checked, setChecked] = React.useState(true);

  return {
    checked,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => setChecked(!checked),
  };
};

const Template: Story<CheckboxProps> = (args) => (
  <>
    <Checkbox {...args} />
  </>
);

const All: Story<CheckboxProps> = () => {
  const input = useInput();
  return (
    <div {...{ style: { display: 'inline-grid', gap: 16, width: '100%' } }}>
      <Checkbox {...{ ...input, label: 'this is a test' }} />
      <Checkbox {...{ ...input, label: 'Label here' }} />
      <Checkbox {...{ ...input, label: 'This is disabled', disabled: true }} />
      <Checkbox {...{ ...input, label: 'This is loading', loading: true }} />
      <Checkbox {...{ ...input, label: 'Checking for error', singleError: 'This is single error' }} />
      <Checkbox {...{ ...input, label: 'Checking multiple errors', multipleErrors: 'Multiple errors reported' }} />
    </div>
  );
};

export const all = All.bind({});

export const base = Template.bind({});
