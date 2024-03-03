import React from 'react';

import { Story, Meta } from '@storybook/react';

import { TextInput, TextInputProps } from './TextInput';

export default {
  title: 'UI Lib / TextInput',
  component: TextInput,
  argTypes: {},
} as Meta;

const Template: Story<TextInputProps> = (args) => {
  return (
    <>
      <TextInput {...args} />
    </>
  );
};

const useInput = () => {
  const [value, setValue] = React.useState<string>('');

  return {
    value,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value),
  };
};
const All: Story<TextInputProps> = () => {
  const input = useInput();
  return (
    <div {...{ style: { display: 'inline-grid', gap: 16, width: '100%', margin: 5 } }}>
      <TextInput {...{ ...input, placeholder: 'Informational notification', howBig: 'small' }} />
      <TextInput {...{ ...input, placeholder: 'Informational notification', howBig: 'medium' }} />
      <TextInput {...{ ...input, placeholder: 'Informational notification', howBig: 'large' }} />

      <TextInput {...{ ...input, placeholder: 'Informational notification', howBig: 'small', label: 'Label Small' }} />
      <TextInput
        {...{ ...input, placeholder: 'Informational notification', howBig: 'medium', label: 'Label Medium' }}
      />
      <TextInput {...{ ...input, placeholder: 'Informational notification', howBig: 'large', label: 'Label Large' }} />

      <TextInput
        {...{ ...input, placeholder: 'Informational notification', howBig: 'small', error: 'We got a small problem' }}
      />
      <TextInput
        {...{ ...input, placeholder: 'Informational notification', howBig: 'medium', error: 'We got a problem' }}
      />
      <TextInput
        {...{ ...input, placeholder: 'Informational notification', howBig: 'large', error: 'We got a large problem' }}
      />
      {/* Just added password Open/Close need dbl check if everything is configured properly */}
      <TextInput
        {...{
          ...input,
          placeholder: 'This is the passwordOpen',
          howBig: 'medium',
          label: 'Label PasswordClose',
          passwordOpen: true,
        }}
      />
      <TextInput
        {...{
          ...input,
          placeholder: 'This is the passwordClose',
          howBig: 'medium',
          label: 'Label PasswordClose',
          passwordClose: true,
        }}
      />
      {/*^^^^^^^Just added password Open/Close need dbl check if everything is configured properly^^^^^^^*/}
      <TextInput
        {...{ ...input, placeholder: 'Informational notification', howBig: 'small', helper: 'Explain Stuff' }}
      />
      <TextInput
        {...{ ...input, placeholder: 'Informational notification', howBig: 'medium', helper: 'Explain Stuff' }}
      />
      <TextInput
        {...{ ...input, placeholder: 'Informational notification', howBig: 'large', helper: 'Explain Stuff' }}
      />

      <TextInput {...{ ...input, placeholder: 'Informational notification', howBig: 'small', disabled: true }} />
      <TextInput {...{ ...input, placeholder: 'Informational notification', howBig: 'medium', disabled: true }} />
      <TextInput {...{ ...input, placeholder: 'Informational notification', howBig: 'large', disabled: true }} />
      <TextInput
        {...{
          ...input,
          placeholder: 'Informational notification',
          howBig: 'small',
          label: 'Label Small',
          disabled: true,
        }}
      />
      <TextInput
        {...{
          ...input,
          placeholder: 'Informational notification',
          howBig: 'medium',
          label: 'Label Small',
          disabled: true,
        }}
      />
      <TextInput
        {...{
          ...input,
          placeholder: 'Informational notification',
          howBig: 'large',
          label: 'Label Small',
          disabled: true,
        }}
      />
      <TextInput
        {...{
          ...input,
          placeholder: 'Informational notification',
          howBig: 'small',
          label: 'Label Small',
          helper: 'Explain Stuff',
          disabled: true,
        }}
      />
      <TextInput
        {...{
          ...input,
          placeholder: 'Informational notification',
          howBig: 'medium',
          label: 'Label Small',
          helper: 'Explain Stuff',
          disabled: true,
        }}
      />
      <TextInput
        {...{
          ...input,
          placeholder: 'Informational notification',
          howBig: 'large',
          label: 'Label Small',
          helper: 'Explain Stuff',
          disabled: true,
        }}
      />

      <TextInput {...{ ...input, placeholder: 'Informational notification', howBig: 'small', loading: true }} />
      <TextInput {...{ ...input, placeholder: 'Informational notification', howBig: 'medium', loading: true }} />
      <TextInput {...{ ...input, placeholder: 'Informational notification', howBig: 'large', loading: true }} />
      <TextInput
        {...{
          ...input,
          placeholder: 'Informational notification',
          howBig: 'small',
          label: 'Label Small',
          loading: true,
        }}
      />
      <TextInput
        {...{
          ...input,
          placeholder: 'Informational notification',
          howBig: 'medium',
          label: 'Label Medium',
          loading: true,
        }}
      />
      <TextInput
        {...{
          ...input,
          placeholder: 'Informational notification',
          howBig: 'large',
          label: 'Label Large',
          loading: true,
        }}
      />
      <TextInput
        {...{
          ...input,
          placeholder: 'Informational notification',
          howBig: 'small',
          label: 'Label Small',
          helper: 'Explain Stuff',
          loading: true,
        }}
      />
      <TextInput
        {...{
          ...input,
          placeholder: 'Informational notification',
          howBig: 'medium',
          label: 'Label Medium',
          helper: 'Explain Stuff',
          loading: true,
        }}
      />
      <TextInput
        {...{
          ...input,
          placeholder: 'Informational notification',
          howBig: 'large',
          label: 'Label Large',
          helper: 'Explain Stuff',
          loading: true,
        }}
      />
    </div>
  );
};

const OnlyInput: Story<TextInputProps> = () => {
  const input = useInput();
  return (
    <div {...{ style: { display: 'grid', gap: 16, width: '100%' } }}>
      <TextInput {...{ ...input, placeholder: 'Informational notification', howBig: 'small' }} />
      <TextInput {...{ ...input, placeholder: 'Informational notification', howBig: 'medium' }} />
      <TextInput {...{ ...input, placeholder: 'Informational notification', howBig: 'large' }} />
    </div>
  );
};

const WithLabel: Story<TextInputProps> = () => {
  const input = useInput();
  return (
    <div {...{ style: { display: 'grid', gap: 16, width: '100%' } }}>
      <TextInput {...{ ...input, placeholder: 'Informational notification', howBig: 'small', label: 'Label Small' }} />
      <TextInput
        {...{ ...input, placeholder: 'Informational notification', howBig: 'medium', label: 'Label Medium' }}
      />
      <TextInput {...{ ...input, placeholder: 'Informational notification', howBig: 'large', label: 'Label Large' }} />
    </div>
  );
};

const WithHelper: Story<TextInputProps> = () => {
  const input = useInput();
  return (
    <div {...{ style: { display: 'grid', gap: 16, width: '100%' } }}>
      <TextInput
        {...{ ...input, placeholder: 'Informational notification', howBig: 'small', helper: 'Explain Stuff' }}
      />
      <TextInput
        {...{ ...input, placeholder: 'Informational notification', howBig: 'medium', helper: 'Explain Stuff' }}
      />
      <TextInput
        {...{ ...input, placeholder: 'Informational notification', howBig: 'large', helper: 'Explain Stuff' }}
      />
    </div>
  );
};

export const all = All.bind({});

export const onlyInput = OnlyInput.bind({});

export const withLabel = WithLabel.bind({});

export const withHelper = WithHelper.bind({});

export const readMode = Template.bind({});
readMode.args = {
  readOnly: true,
  label: 'Label',
};

export const base = Template.bind({});
base.args = {
  label: 'Action',
  error: '',
};

all.args = {};
