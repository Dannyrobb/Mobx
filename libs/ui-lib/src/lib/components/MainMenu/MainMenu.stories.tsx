import React from 'react';

import {
  CloseIcon,
  PixelIcon,
  StoreIcon,
  CommissionPlanIcon,
  WorldIcon,
  SubAffiliatesIcon,
  CreditCardIcon,
} from '@cellxpert/icons';
import { Story, Meta } from '@storybook/react';

import { MainMenu, MainMenuProps } from './MainMenu';
// import { MenuUserInfo } from '@cellxpert/affiliate';

export default {
  title: 'UI Lib / MainMenu',
  component: MainMenu,
  argTypes: {},
} as Meta;

const Template: Story<MainMenuProps> = (args) => (
  <div {...{ style: { height: '100vh' } }}>
    <MainMenu {...args} />
  </div>
);

export const base = Template.bind({});
base.args = {
  // footer: <MenuUserInfo />,
  menuItems: [
    {
      key: 'dashboard',
      icon: <StoreIcon />,
      title: 'DashboardRouter',
      // visible: true,
      path: '/dash',
      isActive: false,
    },
    {
      key: 'marketing-tools',
      icon: <PixelIcon />,
      title: 'Marketing Tools',
      // visible: true,
      path: '/dark',
      isActive: false,
      subItems: [
        {
          key: 'all-marketing-tools',
          icon: <CloseIcon />,
          title: 'All Marketing Tools',
          // visible: true,
          path: '/dark/1',
          isActive: false,
        },
        {
          key: 'private-marketing-tools',
          icon: <CloseIcon />,
          title: 'Private Marketing Tools',
          // visible: true,
          path: '/dark/2',
          isActive: true,
        },
      ],
    },
    {
      key: 'pixelIcon',
      icon: <CreditCardIcon />,
      title: 'Credit cardIcon',
      // visible: true,
      path: '/PixelIcon',
      isActive: false,
    },
    {
      key: 'pixelIcon1',
      icon: <PixelIcon />,
      title: 'Pixel icon',
      // visible: true,
      path: '/pixelIcon1',
      isActive: false,
    },
    {
      key: 'Sub affiliates',
      icon: <CommissionPlanIcon />,
      title: 'Sub affiliates',
      // visible: true,
      path: '/marketing-tools-',
      isActive: false,
      subItems: [
        {
          key: 'all-marketing-tools-',
          icon: <WorldIcon />,
          title: 'All Marketing Tools',
          // visible: true,
          path: '/marketing-tools-/1',
          isActive: false,
        },
        {
          key: 'private-marketing-tools-',
          icon: <SubAffiliatesIcon />,
          title: 'Private Marketing Tools',
          // visible: true,
          path: '/marketing-tools-/2',
          isActive: true,
        },
      ],
    },
  ],
};
