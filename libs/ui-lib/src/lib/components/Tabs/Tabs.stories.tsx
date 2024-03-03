import React from 'react';

import { Story, Meta } from '@storybook/react';

import { Tabs, TabsProps, TabItem } from './Tabs';

export default {
  title: 'UI Lib / Tabs',
  component: Tabs,
  argTypes: {},
} as Meta;

const tabItems: Array<TabItem> = [
  {
    label: 'Personal Info',
    id: 'item_1',
    content: <>Content 1</>,
  },
  {
    label: 'Documents',
    id: 'item_2',
    content: <>Content 2</>,
  },
  {
    label: 'Payment details',
    id: 'item_3',
    content: (
      <>
        Content 3 this is test for longer content maybe longer then the width of the component. Let's see what is going
        to happen. Wait a sec, this is not enough, we need longer text. Uh, okay, this might be enough.
      </>
    ),
  },
  {
    label: 'Reset password',
    id: 'item_4',
    content: <>Content 4</>,
  },
  {
    label: 'Privacy settings',
    id: 'item_5',
    content: <>Content 5</>,
  },
  {
    label: 'Item 6',
    id: 'item_6',
    content: <>Invisible Content 6</>,
    isDisabled: true,
  },
  {
    label: 'Tab Item 7 this is test for longer labels',
    id: 'item_7',
    content: <>Content 7</>,
  },
];

const TabsWithContent: Story<TabsProps> = (args) => (
  <>
    <Tabs {...args} />
  </>
);

const TabsWithoutContent: Story<TabsProps> = (args) => {
  const [activeTabId, setActiveTabId] = React.useState<TabItem['id']>(tabItems[1].id);
  return (
    <>
      <Tabs
        {...{
          ...args,
          onChange: (tab) => setActiveTabId(tab),
          initialActiveTabItemValue: activeTabId,
        }}
      />
      {tabItems.find((item) => item.id === activeTabId)?.content}
    </>
  );
};

export const tabsWithContent = TabsWithContent.bind({});
tabsWithContent.args = {
  onChange: () => {
    console.log('onChange');
  },
  tabs: tabItems,
  initialActiveTabItemValue: 'item_4',
};

export const tabsWithoutContent = TabsWithoutContent.bind({});
tabsWithoutContent.args = {
  onChange: () => {
    console.log('onChange');
  },
  tabs: tabItems.map((item) => ({ label: item.label, id: item.id })),
};
