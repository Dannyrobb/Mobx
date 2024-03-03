import React from 'react';

import { Story, Meta } from '@storybook/react';

import { Button, ButtonProps, LoadingButton, PlusButton } from './Button';

export default {
  title: 'UI Lib / Button',
  component: Button,
  argTypes: {},
} as Meta;

const All: Story<ButtonProps> = () => (
  <div {...{ style: { display: 'inline-grid', gap: 16 } }}>
    <Button {...{ children: 'Small btn', size: 'small' }} />
    <Button {...{ children: 'Small btn sec', size: 'small', variant: 'secondary' }} />
    <Button {...{ children: 'Medium btn', size: 'medium', variant: 'primary' }} />
    <Button {...{ children: 'Large btn', size: 'large', variant: 'primary' }} />
    <Button {...{ children: 'Large btn', size: 'large', variant: 'primary', label: 'Disabled', disabled: true }} />
  </div>
);
const Template: Story<ButtonProps> = (args) => (
  <>
    <Button {...args} />
  </>
);

const LabelButtons: Story<ButtonProps> = () => (
  <div {...{ style: { display: 'grid', gap: 16, gridTemplateColumns: 'auto' } }}>
    <Button {...{ size: 'small', label: 'Small Button' }} />
    <Button {...{ size: 'medium', label: 'Medium Button' }} />
    <Button {...{ size: 'large', label: 'Large Button' }} />
    <Button {...{ variant: 'secondary', size: 'small', label: 'Small Button' }} />
    <Button {...{ variant: 'secondary', size: 'medium', label: 'Medium Button' }} />
    <Button {...{ variant: 'secondary', size: 'large', label: 'Large Button' }} />
    <Button {...{ variant: 'ghostBlack', size: 'small', label: 'Small Button' }} />
    <Button {...{ variant: 'ghostBlue', size: 'small', label: 'Small Button' }} />
    <Button {...{ variant: 'ghostRed', size: 'small', label: 'Small Button' }} />
  </div>
);
const IconButtons: Story<ButtonProps> = () => (
  <div {...{ style: { display: 'grid', gap: 16, gridTemplateColumns: 'max-content' } }}>
    <Button {...{ size: 'small', icon: <div>+</div> }} />
    <Button {...{ size: 'medium', icon: <div>+</div> }} />
    <Button {...{ size: 'large', icon: <div>+</div> }} />
    <Button {...{ variant: 'secondary', size: 'small', icon: <div>+</div> }} />
    <Button {...{ variant: 'secondary', size: 'medium', icon: <div>+</div> }} />
    <Button {...{ variant: 'secondary', size: 'large', icon: <div>+</div> }} />
    <Button {...{ variant: 'ghostBlack', size: 'small', icon: <div>+</div> }} />
    <Button {...{ variant: 'ghostBlue', size: 'small', icon: <div>+</div> }} />
    <Button {...{ variant: 'ghostRed', size: 'small', icon: <div>+</div> }} />
  </div>
);

const PlusButtons: Story<ButtonProps> = () => (
  <div {...{ style: { display: 'grid', gap: 16, gridTemplateColumns: 'max-content' } }}>
    <PlusButton {...{ size: 'small' }} />
    <PlusButton {...{ size: 'medium' }} />
    <PlusButton {...{ size: 'large' }} />
    <PlusButton {...{ variant: 'secondary', size: 'small' }} />
    <PlusButton {...{ variant: 'secondary', size: 'medium' }} />
    <PlusButton {...{ variant: 'secondary', size: 'large' }} />
  </div>
);
const LoadingButtons: Story<ButtonProps> = () => (
  <div {...{ style: { display: 'grid', gap: 16, gridTemplateColumns: 'max-content' } }}>
    <LoadingButton {...{ label: 'Loading', size: 'small' }} />
    <LoadingButton {...{ label: 'Loading', size: 'medium' }} />
    <LoadingButton {...{ label: 'Loading', size: 'large' }} />
    <LoadingButton {...{ label: 'Loading', variant: 'secondary', size: 'small' }} />
    <LoadingButton {...{ label: 'Loading', variant: 'secondary', size: 'medium' }} />
    <LoadingButton {...{ label: 'Loading', variant: 'secondary', size: 'large' }} />
  </div>
);

const ComboButtons: Story<ButtonProps> = () => (
  <div {...{ style: { display: 'grid', gap: 16, gridTemplateColumns: 'max-content' } }}>
    <Button
      {...{
        comboClick: () => {
          console.log('combo click');
        },
        variant: 'primary',
        size: 'small',
        label: 'Small Button',
      }}
    />
    <Button
      {...{
        comboClick: () => {
          console.log('combo click');
        },
        variant: 'primary',
        size: 'medium',
        label: 'Medium Button',
      }}
    />
    <Button
      {...{
        comboClick: () => {
          console.log('combo click');
        },
        variant: 'primary',
        size: 'large',
        label: 'Large Button',
      }}
    />
    <Button
      {...{
        comboClick: () => {
          console.log('combo click');
        },
        variant: 'secondary',
        size: 'small',
        label: 'Small Button',
      }}
    />
  </div>
);

export const all = All.bind({});
all.args = {};

export const labelButtons = LabelButtons.bind({});
labelButtons.args = {
  label: 'Small Button',
};

export const iconButtons = IconButtons.bind({});
iconButtons.args = {};

export const plusButtons = PlusButtons.bind({});
plusButtons.args = {};

export const loadingButtons = LoadingButtons.bind({});
loadingButtons.args = {};

export const comboButtons = ComboButtons.bind({});
comboButtons.args = {};

export const base = Template.bind({});
base.args = {
  label: 'Action',
};

export const withLeftIcon = Template.bind({});
withLeftIcon.args = {
  children: 'Action',

  leftIcon: <div>+</div>,
};
