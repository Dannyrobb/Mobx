import React from 'react';

import { BullhornIcon, StoreIcon } from '@cellxpert/icons';
import { Meta, Story } from '@storybook/react';

import { MenuItem, MenuItemProps } from './MenuItem';

export default {
  title: 'UI Lib / MenuItem',
  component: MenuItem,
  argTypes: {},
} as Meta;

const Template: Story<MenuItemProps> = (args) => {
  return (
    <>
      <MenuItem {...args} />
    </>
  );
};

export const link = Template.bind({});
link.args = { title: 'DashboardRouter', isActive: false, icon: <BullhornIcon {...{ height: 16, width: 16 }} /> };

export const activeLink = Template.bind({});
activeLink.args = { title: 'DashboardRouter', isActive: true, icon: <BullhornIcon {...{ height: 16, width: 16 }} /> };

export const withExpandedSubItems = Template.bind({});
withExpandedSubItems.args = {
  key: 'marketing-tools',
  icon: <StoreIcon {...{ height: 16, width: 16 }} />,
  title: 'Marketing Tools',
  visible: true,
  path: '/mark',
  isExpanded: true,
  subItems: [
    {
      key: 'all-marketing-tools',
      icon: <BullhornIcon {...{ height: 16, width: 16 }} />,
      title: 'All Marketing Tools',
      path: '/is',
      isActive: true,
    },
    {
      key: 'private-marketing-tools',
      icon: <BullhornIcon {...{ height: 16, width: 16 }} />,
      title: 'Private Marketing Tools',
      path: '/back',
      isActive: false,
    },
  ],
};

export const withNonExpandedSubItems = Template.bind({});
withNonExpandedSubItems.args = {
  key: 'marketing-tools',
  icon: <BullhornIcon {...{ height: 16, width: 16 }} />,
  title: 'Marketing Tools',
  visible: true,
  path: '/mark',
  isExpanded: false,
  subItems: [
    {
      key: 'all-marketing-tools',
      icon: <BullhornIcon {...{ height: 16, width: 16 }} />,
      title: 'All Marketing Tools',
      path: '/is',
      isActive: false,
    },
    {
      key: 'private-marketing-tools',
      icon: <BullhornIcon {...{ height: 16, width: 16 }} />,
      title: 'Private Marketing Tools',
      path: '/great',
      isActive: false,
    },
  ],
};
