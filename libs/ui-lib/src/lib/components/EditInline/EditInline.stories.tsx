import React from 'react';

import { Theme } from '@cellxpert/theme';
import styled from '@emotion/styled';
import { Meta, Story } from '@storybook/react';

import EditInline, { EditInlineProps } from '../EditInline/EditInline';

export default {
  title: 'UI Lib / Edit inline',
  component: EditInline,
  argTypes: {},
} as Meta;

const Container = styled('div')(({ theme }) => ({
  padding: `${theme.gutters.base * 2}px`,
}));

const useInput = () => {
  const [value, setValue] = React.useState<number>(400);

  return {
    value,
    onChange: (value: number) => setValue(value),
  };
};

const Template: Story<EditInlineProps> = (args) => {
  const input = useInput();
  return (
    <Container>
      <h1>Edit inline </h1>
      <EditInline {...{ ...args, ...input }} />
    </Container>
  );
};

export const WithPrefix = Template.bind({});
WithPrefix.args = {
  prefix: '$',
};

export const WithSuffix = Template.bind({});
WithSuffix.args = {
  suffix: '%',
};
