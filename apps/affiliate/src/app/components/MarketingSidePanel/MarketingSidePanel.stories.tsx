import { Story, Meta } from '@storybook/react';

import { MarketingSidePanel, MarketingSidePanelProps } from './MarketingSidePanel';

export default { title: 'marketing Tools / MarketingSidePanel', component: MarketingSidePanel, argtypes: {} } as Meta;

const Template: Story<MarketingSidePanelProps> = (args) => (
  <>
    <MarketingSidePanel />
  </>
);

export const base = Template.bind({ brand: 'marketing' });
