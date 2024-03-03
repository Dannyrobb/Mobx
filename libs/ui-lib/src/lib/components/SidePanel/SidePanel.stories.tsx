import { Story, Meta } from '@storybook/react';

import { SidePanel, SidePanelProps } from './SidePanel';

export default {
  title: 'UI Lib / Side Panel',
  component: SidePanel,
  argTypes: {},
} as Meta;

const Template: Story<SidePanelProps> = (args) => (
  <div>
    <SidePanel {...{ onWhichSide: 'right' }}>
      <h1>To show some content and use calc for width</h1>
    </SidePanel>
  </div>
);

export const base = Template.bind({});
base.args = {};
