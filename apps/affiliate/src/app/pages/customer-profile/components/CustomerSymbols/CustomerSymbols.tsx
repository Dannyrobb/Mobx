import * as React from 'react';

import { SymbolsIcon } from '@cellxpert/icons';
import { theme } from '@cellxpert/theme';
import { Card, Tabs, Typography } from '@cellxpert/ui-lib';
import styled from '@emotion/styled';
import { ChartData, ChartOptions } from 'chart.js';
import { observer } from 'mobx-react';
import { Doughnut } from 'react-chartjs-2';

import { useStore } from '../../../../stores/setupContext';
import { TabItem } from '@cellxpert/ui-lib';

export interface CustomerSymbolsProps {
  chartDataArray?: Array<{ key: ChartDataKey; value: string | number | string[] }>;
  chartData: ChartData | null;
  setActiveChartTabId: (tabkey: TabKey) => void;
  activeChartTabId: TabKey;
}

export type ChartDataKey = 'Count' | 'Symbols' | 'Volume';

const SymbolsWrapper = styled('div')(() => ({
  flexGrow: 6,
}));

const DoughnutWrapper = styled('div')(({ theme }) => ({
  height: theme.gutters.base * 18.75,
}));

const TabsGraphWrapper = styled('div')(() => ({
  display: 'inline-block',
}));

const ChartCardMostTraded = styled(Typography)(({ theme }) => ({
  marginTop: theme.gutters.base * 1.375,
  marginLeft: theme.gutters.base * 3,
}));

const ChartCardTitleAndTabs = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
}));

const chartOptions: ChartOptions<'doughnut'> = {
  maintainAspectRatio: false,
  cutout: '70%',
  responsive: true,
  layout: {
    padding: {
      top: theme.gutters.base,
      right: theme.gutters.base * 4,
      bottom: theme.gutters.base * 2,
    },
  },
  plugins: {
    legend: {
      position: 'right',
      labels: {
        usePointStyle: true,
        boxWidth: 10,
        font: {
          size: 10,
        },
      },
    },
  },
};

export type TabKey = 'count' | 'volume';

const chartTabArray: Array<TabItem> = [
  { label: 'Volume', id: 'volume' },
  { label: 'Count', id: 'count' },
];

const defaultChartStuff = {
  backgroundColor: ['#2d7aff', '#ffce32', '#78e4ff', '#8871f9', '#fb8e5f'],
  borderWidth: 1,
  hoverOffset: 12,
  hoverBorderWidth: 5,
  hoverBorderColor: [
    'rgb(45, 122, 255, 0.5)',
    'rgb(255, 206, 50, 0.5)',
    'rgb(120, 228, 255, 0.5)',
    'rgb(136, 113, 249, 0.5)',
    'rgb(251, 142, 95, 0.5)',
  ],
};

export const CustomerSymbols: React.FunctionComponent<CustomerSymbolsProps> = ({
  chartData,
  setActiveChartTabId,
  activeChartTabId,
}) => {
  if (!chartData || chartData.datasets[0].data.length > 5) {
    return <h1>Ooops something is wrong</h1>;
  }
  return (
    <SymbolsWrapper>
      <Card
        {...{
          icon: <SymbolsIcon {...{ color: 'main', height: 20, width: 20 }} />,
          title: 'Symbols',
          largeCard: true,
          withoutPadding: true,
          children: (
            <>
              <ChartCardTitleAndTabs>
                <ChartCardMostTraded {...{ variant: 'caption', color: 'dark' }}>Most Traded</ChartCardMostTraded>
                <TabsGraphWrapper>
                  <Tabs
                    {...{
                      tabs: chartTabArray,
                      onChange: (tab) => setActiveChartTabId(tab as TabKey),
                      initialActiveTabItemValeue: activeChartTabId,
                      activeTabId: activeChartTabId,
                    }}
                  />
                </TabsGraphWrapper>
              </ChartCardTitleAndTabs>
              <DoughnutWrapper>
                <Doughnut
                  data={{
                    labels: chartData.labels,
                    datasets: [{ ...defaultChartStuff, data: chartData.datasets[0].data }],
                  }}
                  options={chartOptions}
                />
              </DoughnutWrapper>
            </>
          ),
        }}
      />
    </SymbolsWrapper>
  );
};

const Observed = observer(CustomerSymbols);
const WithStoreConnection = () => {
  const { customerProfileOverview } = useStore();
  const { setActiveChartTabId, activeChartTabId, getActivityReport, chartData } = customerProfileOverview;
  React.useEffect(() => {
    getActivityReport();
  }, []);
  return <Observed {...{ getActivityReport, chartData, setActiveChartTabId, activeChartTabId }} />;
};

export default observer(WithStoreConnection);
