import { Story, Meta } from '@storybook/react';

import { HelpPopperComponent, HelpPopperComponentProps } from './HelpPopperComponent';

export default {
  title: 'UI Lib / HelpPoperComponent',
  component: HelpPopperComponent,
  argTypes: {},
} as Meta;

const Template: Story<HelpPopperComponentProps> = (args) => (
  <>
    <HelpPopperComponent {...args} />
  </>
);

export const base = Template.bind({});
export const prefilled = Template.bind({});
base.args = {};
prefilled.args = {
  titles: 'Testing',
  body: 'asdsadsadsadsadsadsadsadsa',
};
