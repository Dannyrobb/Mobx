import { Story, Meta } from '@storybook/react';
import { RadioGroup, RadioGroupProps } from './RadioGroup';

export default {
  title: 'Ui Lib / Radio Button',
  component: RadioGroup,
  argTypes: {},
} as Meta;

const Template: Story<RadioGroupProps> = (args) => (
  <div style={{ margin: 20 }}>
    <RadioGroup {...args} />
  </div>
);

export const base = Template.bind({});
base.args = { radioButtons: [{ label: 'Radio button goes here', value: 'radio1' }] };

export const radioButtons = Template.bind({});
radioButtons.args = {
  radioButtons: [
    { label: 'Test 1', value: 'test1' },
    { label: 'Test 2', value: 'test2' },
    { label: 'Test 3', value: 'test3' },
  ],
};

export const radioButtonsWithHeading = Template.bind({});
radioButtonsWithHeading.args = {
  heading: 'This is a heading',
  radioButtons: [
    { label: 'Test 1', value: 'test1' },
    { label: 'Test 2', value: 'test2' },
    { label: 'Test 3', value: 'test3' },
  ],
};

export const disabledState = Template.bind({});
disabledState.args = {
  disabled: true,
  radioButtons: [
    { label: 'Test 1', value: 'test1' },
    { label: 'Test 2', value: 'test2' },
    { label: 'Test 3', value: 'test3' },
  ],
};

export const disabledStateWithHeading = Template.bind({});
disabledStateWithHeading.args = {
  heading: 'This is a heading',
  disabled: true,
  radioButtons: [
    { label: 'Test 1', value: 'test1' },
    { label: 'Test 2', value: 'test2' },
    { label: 'Test 3', value: 'test3' },
  ],
};

export const loadingState = Template.bind({});
loadingState.args = {
  loading: true,
  radioButtons: [
    { label: 'Test 1', value: 'test1' },
    { label: 'Test 2', value: 'test2' },
    { label: 'Test 3', value: 'test3' },
  ],
};

export const loadingStateWithHeading = Template.bind({});
loadingStateWithHeading.args = {
  heading: 'This is a heading',
  loading: true,
  radioButtons: [
    { label: 'Test 1', value: 'test1' },
    { label: 'Test 2', value: 'test2' },
    { label: 'Test 3', value: 'test3' },
  ],
};
