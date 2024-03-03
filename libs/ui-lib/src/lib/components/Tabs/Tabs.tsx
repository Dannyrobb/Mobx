import * as React from 'react';

import styled from '@emotion/styled';

import Tab from './Tab';

export interface TabItem {
  label: React.ReactElement | string;
  id: string;
  isDisabled?: boolean;
  content?: React.ReactNode;
}

export interface TabsProps {
  onChange?: (tabKey: string) => void;
  tabs: Array<TabItem>;
  initialActiveTabItemValue?: TabItem['id'];
  position?: 'center' | 'left' | 'right';
}

const TabItemContainer = styled('div')<Pick<TabsProps, 'position'>>(({ position = 'center' }) => ({
  width: 'auto',
  display: 'flex',
  justifyContent: position,
  overflow: 'auto',
}));

const TabContentContainer = styled('div')(() => ({
  width: 'auto',
}));

export const Tabs: React.FunctionComponent<TabsProps> = ({ onChange, tabs, initialActiveTabItemValue, position }) => {
  const [activeTabId, setActiveTabId] = React.useState<string>(
    (tabs.find((item) => item.id === initialActiveTabItemValue && !item.isDisabled) ?? tabs[0]).id
  );
  const [activeTab, setActiveTab] = React.useState<TabItem>(
    tabs.find((item) => item.id === initialActiveTabItemValue && !item.isDisabled) ?? tabs[0]
  );
  React.useEffect(() => {
    const newTab = tabs.find((item) => item.id === activeTabId);

    if (!newTab) {
      return;
    }
    onChange?.(newTab.id);
    setActiveTab(newTab);
  }, [activeTabId]);

  return (
    <>
      <TabItemContainer {...{ position }}>
        {tabs.map((item) => (
          <Tab
            {...{
              ...item,
              isActive: item.id === activeTabId,
              onSelect: (id) => {
                const activatedItem = tabs.find((item) => item.id === id);
                if (activatedItem && !item.isDisabled) {
                  setActiveTabId(activatedItem.id);
                  onChange && onChange(activatedItem.id);
                }
              },
              key: item.id,
            }}
          />
        ))}
      </TabItemContainer>
      {activeTab.content && <TabContentContainer>{activeTab.content}</TabContentContainer>}
    </>
  );
};

export default Tabs;
