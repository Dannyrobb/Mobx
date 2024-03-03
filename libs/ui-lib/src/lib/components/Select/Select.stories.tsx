import React, { ComponentProps } from 'react';

import { Story, Meta } from '@storybook/react';

import { Select, SelectProps } from './Select';
import { Checkbox } from '../Checkbox/Checkbox';

export default {
  title: 'UI-Lib / Select',
  component: Select,
  argTypes: {},
} as Meta;

const selectOptions = [
  {
    label: 'Foo',
  },
  {
    label: 'Bar',
  },
  {
    label: 'Baz',
  },
];

const Template: Story<SelectProps> = (args) => (
  <div {...{ style: { background: '#e5ebf4', height: 300, padding: 50 } }}>
    <Select {...args} />
  </div>
);

export const base = Template.bind({});

const Children: Story<ComponentProps<typeof Select>> = (args) => {
  const keys = ['a', 'b', 'c'] as const;
  const [checked, setChecked] = React.useState({ a: false, b: false, c: false });
  return (
    <div {...{ style: { background: '#e5ebf4', height: 300, padding: 50 } }}>
      <Select {...args}>
        {keys.map((key) => {
          return (
            <div {...{ key, style: { padding: 16 } }}>
              <Checkbox
                {...{
                  label: key.toUpperCase(),
                  checked: checked[key],
                  onClick: (e) => e.stopPropagation(),
                  onChange: (a) => setChecked({ ...checked, [key]: !checked[key] }),
                }}
              />
            </div>
          );
        })}
      </Select>
    </div>
  );
};

export const withChildren = Children.bind({});
withChildren.args = {
  label: 'Select Something',
  placeholder: 'Select Something',
  onChange: (option) => {
    console.log(option);
  },
  // disabled: true,
  // withSearch: false,
  isMultiSelect: true,
  withCheckboxes: true,
  searchPlaceholder: 'Search Option',
  variant: 'regular',
  options: selectOptions.map((opt) => ({
    key: opt.label,
    value: opt.label,
    label: opt.label,
  })),
};

const InlineSelectStory: Story<ComponentProps<typeof Select>> = (args) => {
  const [checked, setChecked] = React.useState({ a: false, b: false, c: false });
  return (
    <div {...{ style: { background: '#e5ebf4', height: 300, padding: 50 } }}>
      <Select {...args}></Select>
    </div>
  );
};

export const inlineSelect = InlineSelectStory.bind({});
inlineSelect.args = {
  label: 'Select Something',
  placeholder: 'Select Something',
  onChange: (option) => {
    console.log(option);
  },
  // isMultiSelect: true,
  // withCheckboxes: true,
  searchPlaceholder: 'Search Option',
  variant: 'inline',
  options: selectOptions.map((opt) => ({
    key: opt.label,
    value: opt.label,
    label: opt.label,
  })),
};

const RegularVariantSelectStory: Story<ComponentProps<typeof Select>> = (args) => {
  const [checked, setChecked] = React.useState({ a: false, b: false, c: false });
  return (
    <div {...{ style: { background: '#e5ebf4', height: 300, padding: 50 } }}>
      <Select {...args}></Select>
    </div>
  );
};

export const regularVariantSelect = RegularVariantSelectStory.bind({});
regularVariantSelect.args = {
  label: 'Select Something',
  placeholder: 'Select Something',
  onChange: (option) => {
    console.log(option);
  },
  // isMultiSelect: true,
  // withCheckboxes: true,
  searchPlaceholder: 'Search Option',
  variant: 'regular',
  options: selectOptions.map((opt) => ({
    key: opt.label,
    value: opt.label,
    label: opt.label,
  })),
};
