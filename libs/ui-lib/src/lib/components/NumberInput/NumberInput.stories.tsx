import React from 'react';

import { Story, Meta } from '@storybook/react';
import { NumberInput, NumberInputProps } from './NumberInput';

export default {
  title: 'UI Lib / Number Input',
  component: NumberInput,
  argTypes: {},
} as Meta;

const Template: Story<NumberInputProps> = (args) => (
  <>
    <NumberInput {...args} />
  </>
);

const useInput = () => {
  const [value, setValue] = React.useState('');

  return {
    value,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value),
  };
};

const All: Story<NumberInputProps> = () => {
  const input = useInput();
  return (
    <div {...{ style: { display: 'inline-grid', gap: 16, width: '100%' } }}>
      <NumberInput {...{ ...input, placeholder: '1000', howBig: 'small' }} />
      <NumberInput {...{ ...input, placeholder: '1000', howBig: 'medium' }} />
      <NumberInput {...{ ...input, placeholder: '1000', howBig: 'large' }} />
      <NumberInput {...{ ...input, placeholder: '1000', howBig: 'small', label: 'Label Small' }} />
      <NumberInput {...{ ...input, placeholder: '1000', howBig: 'medium', label: 'Label Medium' }} />
      <NumberInput {...{ ...input, placeholder: '1000', howBig: 'large', label: 'Label Large' }} />
      <NumberInput {...{ ...input, placeholder: '1000', howBig: 'small', error: 'We got a small problem!' }} />
      <NumberInput
        {...{
          ...input,
          placeholder: '1000',
          howBig: 'medium',
          error: 'We got a medium problem!',
        }}
      />
      <NumberInput {...{ ...input, placeholder: '1000', howBig: 'large', error: 'We got a large problem!' }} />
      <NumberInput
        {...{
          ...input,
          placeholder: '1000',
          helper: 'Explain Suff',
          howBig: 'small',
          label: 'Label Small',
          disabled: true,
        }}
      />
      <NumberInput
        {...{
          ...input,
          placeholder: '1000',
          helper: 'Explain Suff',
          howBig: 'medium',
          label: 'Label Medium',
          disabled: true,
        }}
      />
      <NumberInput
        {...{
          ...input,
          placeholder: '1000',
          helper: 'Explain Suff',
          howBig: 'large',
          label: 'Label Large',
          disabled: true,
        }}
      />
      <NumberInput
        {...{
          ...input,
          placeholder: '1000',
          helper: 'this is a helper',
          howBig: 'small',
          label: 'testing loading',
          loading: true,
        }}
      />
      <NumberInput
        {...{
          ...input,
          placeholder: '1000',
          helper: 'this is a helper',
          howBig: 'medium',
          label: 'testing loading',
          loading: true,
        }}
      />
      <NumberInput
        {...{
          ...input,
          placeholder: '1000',
          helper: 'this is a helper',
          howBig: 'large',
          label: 'testing loading',
          loading: true,
        }}
      />
    </div>
  );
};

export const all = All.bind({});

export const base = Template.bind({});
