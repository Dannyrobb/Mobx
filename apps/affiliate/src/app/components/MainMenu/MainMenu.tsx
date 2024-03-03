import React from 'react';

import {
  BullhornIcon,
  CreditCardIcon,
  InformationIcon,
  MigrateIcon,
  ParentChildIcon,
  ReceiptIcon,
  ReportIcon,
  StoreIcon,
  WorkspaceIcon,
} from '@cellxpert/icons';
import { MainMenu as MainMenuComponent } from '@cellxpert/ui-lib';
import { useLocation } from 'react-router-dom';

import { Route as RouteInterface } from '../../routes';
import { MenuUserInfo } from '../MenuUserInfo/MenuUserInfo';

interface MainMenuProps {
  routes: RouteInterface[];
}

const iconsMap: Record<string, React.ReactNode> = {
  dashboard: <WorkspaceIcon />,
  // accountDetails: <ReportIcon />,
  marketingTools: <BullhornIcon />,
  reports: <ReportIcon />,
  payments: <CreditCardIcon />,
  postback: <MigrateIcon />,
  subAffiliates: <ParentChildIcon />,
  commissionPlan: <ReceiptIcon />,
  userGuide: <InformationIcon />,
  store: <StoreIcon />,
};

export const MainMenu: React.FunctionComponent<MainMenuProps> = ({ routes }) => {
  const { pathname } = useLocation();
  return (
    <MainMenuComponent
      {...{
        menuItems: routes.map((item) => ({
          key: item.key,
          icon: iconsMap[item.key] ?? 'N/A',
          title: item.text,
          path: item.linksTo,
          isActive: pathname === item.linksTo,
          subItems: item?.subItems?.map((sub) => {
            return {
              key: sub.key,
              icon: iconsMap[sub.key] ?? 'N/A',
              title: sub.text,
              path: sub.linksTo,
              isActive: pathname === item.linksTo,
            };
          }),
        })),
        footer: <MenuUserInfo />,
      }}
    />
  );
};
