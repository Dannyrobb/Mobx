import React from 'react';

import { Story, Meta } from '@storybook/react';

import { PasswordInputprops, PasswordInput } from './PasswordInput';

export default {
  title: 'UI Lib / Password Input',
  component: PasswordInput,
  args: {},
} as Meta;

const Template: Story<PasswordInputprops> = (args) => (
  <>
    <PasswordInput {...args} />
  </>
);

const useInput = () => {
  const [value, setValue] = React.useState('');

  return {
    value,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value),
  };
};

const All: Story<PasswordInputprops> = () => {
  const input = useInput();
  return (
    <div {...{ style: { display: 'inline-grid', gap: 16, width: '100%' } }}>
      <PasswordInput {...{ ...input, placeholder: 'type password', howBig: 'small' }} />
      <PasswordInput {...{ ...input, placeholder: 'type password', howBig: 'medium' }} />
      <PasswordInput {...{ ...input, placeholder: 'type password', howBig: 'large' }} />
      <PasswordInput
        {...{
          ...input,
          placeholder: 'type password',
          howBig: 'small',
          label: 'This is a password label',
        }}
      />
      <PasswordInput
        {...{
          ...input,
          placeholder: 'type password',
          howBig: 'medium',
          label: 'This is a password label',
        }}
      />
      <PasswordInput
        {...{
          ...input,
          placeholder: 'type password',
          howBig: 'large',
          label: 'This is a password label',
        }}
      />
      <PasswordInput
        {...{
          ...input,
          placeholder: 'type password',
          howBig: 'small',
          label: 'This is a password label',
          helper: 'Explain Stuff',
        }}
      />
      <PasswordInput
        {...{
          ...input,
          placeholder: 'type password',
          howBig: 'medium',
          label: 'This is a password label',
          helper: 'Explain Stuff',
        }}
      />
      <PasswordInput
        {...{
          ...input,
          placeholder: 'type password',
          howBig: 'large',
          label: 'This is a password label',
          helper: 'Explain Stuff',
        }}
      />
      <PasswordInput
        {...{
          ...input,
          placeholder: 'type password',
          howBig: 'small',
          error: 'This is an error message',
        }}
      />
      <PasswordInput
        {...{
          ...input,
          placeholder: 'type password',
          howBig: 'medium',
          error: 'This is an error message',
        }}
      />
      <PasswordInput
        {...{
          ...input,
          placeholder: 'type password',
          howBig: 'large',
          error: 'This is an error message',
        }}
      />
      <PasswordInput
        {...{
          ...input,
          placeholder: 'type password',
          howBig: 'small',
          label: 'This is a password label',
          helper: 'Explain Stuff',
          disabled: true,
        }}
      />
      <PasswordInput
        {...{
          ...input,
          placeholder: 'type password',
          howBig: 'medium',
          label: 'This is a password label',
          helper: 'Explain Stuff',
          disabled: true,
        }}
      />
      <PasswordInput
        {...{
          ...input,
          placeholder: 'type password',
          howBig: 'large',
          label: 'This is a password label',
          helper: 'Explain Stuff',
          disabled: true,
        }}
      />
      <PasswordInput {...{ ...input, howBig: 'small', label: 'This is a password label', loading: true }} />
      <PasswordInput {...{ ...input, howBig: 'medium', label: 'This is a password label', loading: true }} />
      <PasswordInput {...{ ...input, howBig: 'large', label: 'This is a password label', loading: true }} />
      <PasswordInput
        {...{
          ...input,
          howBig: 'small',
          label: 'This is a password label',
          loading: true,
          helper: 'Explaning some stuff',
        }}
      />
      <PasswordInput
        {...{
          ...input,
          howBig: 'medium',
          label: 'This is a password label',
          loading: true,
          helper: 'Explaning some stuff',
        }}
      />
      <PasswordInput
        {...{
          ...input,
          howBig: 'large',
          label: 'This is a password label',
          loading: true,
          helper: 'Explaning some stuff',
        }}
      />
    </div>
  );
};

export const all = All.bind({});

export const base = Template.bind({});
