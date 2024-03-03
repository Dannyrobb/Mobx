import React from 'react';

import { Story, Meta } from '@storybook/react';

import { CopyClipboard, CopyClipboardProps } from './CopyClipboard';

export default {
  title: 'UI Lib / CopyClipboard',
  component: CopyClipboard,
  argTypes: {},
} as Meta;

const useInput = () => {
  const [value, setValue] = React.useState<string>('asd');

  return {
    value,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value),
  };
};

const Template: Story<CopyClipboardProps> = (args) => {
  const input = useInput();
  return (
    <div {...{ style: { padding: 40 } }}>
      <CopyClipboard {...{ ...input, ...args }} />
    </div>
  );
};

export const base = Template.bind({});
base.args = {
  readOnly: true,
  withButton: true,
};
