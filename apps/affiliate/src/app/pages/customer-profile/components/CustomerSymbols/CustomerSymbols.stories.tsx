import React, { ComponentProps } from 'react';

import { Meta, Story } from '@storybook/react';

import { CustomerSymbols, TabKey } from './CustomerSymbols';

export default {
  title: 'Customer Profile / Components / CustomerSymbols',
  component: CustomerSymbols,
  argTypes: {},
} as Meta;

const volumeChartData: ComponentProps<typeof CustomerSymbols>['chartData'] = {
  labels: ['USD JPY', 'GBD JPY', 'USD CAD', 'GBD USD', 'Other'],
  datasets: [
    {
      data: [43, 3, 6, 9, 10],
    },
  ],
};

const countChartData: ComponentProps<typeof CustomerSymbols>['chartData'] = {
  labels: ['USD JPY', 'GBD JPY', 'USD CAD', 'GBD USD', 'Other'],
  datasets: [
    {
      data: [5, 7, 4, 6, 8],
    },
  ],
};

const Template: Story<ComponentProps<typeof CustomerSymbols>> = (args) => {
  const [activeTab, setActiveTab] = React.useState<TabKey>('volume');
  return (
    <div {...{ style: { marginTop: '15' } }}>
      <CustomerSymbols
        {...{
          setActiveChartTabId: (tab) => {
            setActiveTab(tab);
          },
          activeChartTabId: activeTab,
          chartData: activeTab === 'volume' ? volumeChartData : activeTab === 'count' ? countChartData : null,
        }}
        {...args}
      />
    </div>
  );
};

export const base = Template.bind({});
base.args = {
  chartData: volumeChartData,
};

export const hasMoreThan6DataItems = Template.bind({});
hasMoreThan6DataItems.args = {
  chartData: {
    labels: volumeChartData.labels,
    datasets: [{ ...volumeChartData.datasets[0], data: [1, 2, 3, 4, 7, 100] }],
  },
  setActiveChartTabId: () => {
    console.log('set id');
  },
};
