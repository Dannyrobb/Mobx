import { Story, Meta } from '@storybook/react';

import { ContentSwitcher, ContentSwitcherProps } from './ContentSwitcher';

export default {
  title: 'UI Lib / Content Switcher',
  component: ContentSwitcher,
  argTypes: {},
} as Meta;

const Template: Story<ContentSwitcherProps> = (args) => (
  <div style={{ margin: 30 }}>
    <ContentSwitcher {...args} />
  </div>
);

export const base = Template.bind({});
base.args = { options: [] };

export const prefilledOptions = Template.bind({});
prefilledOptions.args = { options: ['Asdsadsa', 'Dddsdsdsdsdsd', 'Yoyoooyoyyoyo'] };

export const prefilledOptionsDisabled = Template.bind({});
prefilledOptionsDisabled.args = { options: ['asdsadsa', 'dddsdsdsdsdsd', 'yoyoooyoyyoyo'], disabled: true };
