import * as React from 'react';

import { CellxpertLogo, ChevronLeftIcon, ChevronRightIcon } from '@cellxpert/icons';
import { flex, flexBetweenCenter, theme } from '@cellxpert/theme';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

import { MenuItem, MenuItemBase } from '../MenuItem/MenuItem';

export interface MainMenuProps {
  menuItems: Array<MenuItemBase & { isActive: boolean }>;
  footer?: React.ReactNode;
}

export const Container = styled(motion.nav)(() => ({
  background: theme.palette.blacks.white,
  gridArea: 'menu',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  boxShadow: `0 1px 5px 0 rgba(0,0,0,0.2)`,
  position: 'relative',
}));

export const MenuToggle = styled('div')(() => ({
  width: theme.gutters.base * 3,
  height: theme.gutters.base * 3,
  background: theme.palette.blacks.white,
  borderRadius: '50%',
  boxShadow: `0 1px 5px 0 rgba(0,0,0,0.2)`,
  position: 'absolute',
  right: -29,
  top: theme.gutters.base * 3,
  cursor: 'pointer',
  transform: 'translateX(-15px)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

export const SidebarLink = styled(Link)(() => ({
  ...flexBetweenCenter,
  color: 'black',
  padding: '20px',
  textDecoration: 'none',
}));

export const Logo = styled('div')<{ isExpanded: boolean }>(({ isExpanded }) => ({
  padding: `25px ${!isExpanded ? theme.gutters.base * 1.5 : theme.gutters.base * 2}px`,
  ...flex,
  alignItems: 'center',
}));

export const MenuItems = styled('ul')<{ isExpanded: boolean }>(({ isExpanded }) => ({
  ...flex,
  flexDirection: 'column',
  flex: '1',
  paddingRight: isExpanded ? theme.gutters.base * 2 : 0,
  '& > a': {
    marginBottom: theme.gutters.base,
  },
  '& > div': {
    marginBottom: theme.gutters.base,
  },
}));

const menuVariants = {
  opened: {
    width: 256,
  },
  closed: {
    width: 50,
  },
};

export const MainMenu: React.FunctionComponent<MainMenuProps> = ({ children, menuItems = [], footer }) => {
  const [isMenuOpen, setMenuOpen] = React.useState<boolean>(true);
  const [currentPath, setCurrentPath] = React.useState<string>('/mark/2');

  const menuVariantState = isMenuOpen ? 'opened' : 'closed';

  return (
    <Container
      {...{
        initial: menuVariantState,
        animate: menuVariantState,
        variants: menuVariants,
      }}
    >
      <Logo {...{ isExpanded: isMenuOpen }}>
        <CellxpertLogo
          {...{
            viewBox: `0 0 ${isMenuOpen ? '150' : '24'} 24`,
            width: isMenuOpen ? 150 : 24,
          }}
        />
      </Logo>

      <MenuItems {...{ isExpanded: isMenuOpen }}>
        {menuItems.map((item) => {
          return (
            <MenuItem
              {...item}
              {...{
                visible: true,
                isActive: item.path === currentPath,
                hasChildrenActive: item.path !== '/' && currentPath !== item.path && currentPath.includes(item.path),
                isExpanded: isMenuOpen,
                onClick: setCurrentPath,
                currentPath,
              }}
            />
          );
        })}
      </MenuItems>
      <MenuToggle {...{ onClick: () => setMenuOpen(!isMenuOpen) }}>
        {isMenuOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
      </MenuToggle>
      {isMenuOpen && footer}
      {children}
    </Container>
  );
};

export default MainMenu;
