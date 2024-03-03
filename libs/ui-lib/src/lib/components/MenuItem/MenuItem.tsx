import React from 'react';

import { ChevronDownIcon, ChevronUpIcon } from '@cellxpert/icons';
import { flex, theme } from '@cellxpert/theme';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

export interface MenuItemProps extends MenuItemBase {
  visible: boolean;
  subItems?: MenuItemBase[];
  onClick?: (path: string) => void;
  isExpanded: boolean;
  isActive: boolean;
  currentPath: string;
  hasChildrenActive: boolean;
}

export interface MenuItemBase {
  key: string;
  icon: React.ReactNode;
  title: string;
  path: string;
  isActive: boolean;
  subItems?: MenuItemBase[];
}

export const BaseElement = styled('div')<{
  isActive: boolean;
  isMainItem: boolean;
  hasSubItems: boolean;
  isExpanded?: boolean;
  onClick?: () => void;
}>(({ isActive, isMainItem, isExpanded }) => ({
  ...theme.typography.meta.body2,
  cursor: 'pointer',
  height: theme.gutters.base * 4,
  display: 'grid',
  alignItems: 'center',
  borderRadius: `0px 100px 100px 0px`,
  backgroundColor: isExpanded && isActive ? theme.palette.main.primary1[100] : theme.palette.text.contrast,
  color: isActive ? theme.palette.main.primary1.base : theme.palette.text.dark,
  fill: isActive ? theme.palette.main.primary1.base : theme.palette.text.dark,
  gridTemplateColumns: `${theme.gutters.base * 6.5}px 1fr ${theme.gutters.base * 4}px`,
  borderLeft: `${theme.gutters.base * 0.5}px solid ${
    isExpanded && isActive ? theme.palette.main.primary1.base : 'transparent'
  }`,
  ...(isExpanded &&
    !isActive && {
      '&:hover': {
        color: theme.palette.text.main,
        backgroundColor: theme.palette.additional.grey[300],
        fill: theme.palette.text.main,
      },
      '&:active': {
        color: theme.palette.text.main,
        backgroundColor: theme.palette.additional.grey[500],
        fill: theme.palette.text.main,
      },
    }),
  ...(isMainItem && {
    fontWeight: 700,
  }),
}));

export const StyledLink = styled(Link)(() => ({
  textDecoration: 'none',
}));

export const TooltipTip = styled('span')(() => ({
  position: 'relative',
  '&:hover:after': {
    display: 'block',
  },
  '&:hover:before': {
    display: 'block',
  },
  '&:before': {
    content: 'attr(data-text)',
    position: 'absolute',
    whiteSpace: 'nowrap',
    top: '50%',
    transform: 'translateY(-50%)',
    left: '100%',
    padding: `${theme.gutters.base / 2}px ${theme.gutters.base / 2}px ${theme.gutters.base / 2}px ${
      theme.gutters.base * 1.5
    }px`,
    borderRadius: '2px',
    background: `${theme.palette.text.main}`,
    color: '#fff',
    textAlign: 'center',
    display: 'none',
    ...theme.typography.meta.subtitle2,
    lineHeight: 1,
  },
  '&:after': {
    content: 'attr(data-textt)',
    position: 'absolute',
    right: '0',
    top: '50%',
    transform: 'translateY(-50%)',
    border: `5px solid ${theme.palette.text.main}`,
    borderColor: 'transparent black transparent transparent',
    display: 'none',
  },
}));

export const IconWrap = styled('div')<{
  isExpanded: boolean;
  isActive: boolean;
  hasChildrenActive: boolean;
}>(({ isExpanded, isActive, hasChildrenActive }) => ({
  ...flex,
  width: '42px',
  '> div': {
    height: '32px',
    width: '32px',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    backgroundColor: !isExpanded && (isActive || hasChildrenActive) ? theme.palette.main.primary1[100] : 'transparent',
    ...(!isActive &&
      !isExpanded && {
        '&:hover': {
          backgroundColor: !isExpanded ? theme.palette.additional.grey[300] : 'transparent',
        },
      }),
  },
  justifyContent: 'center',
  alignItems: 'center',
  ' svg': {
    ...(((!isActive && isExpanded) || (!isExpanded && !isActive && !hasChildrenActive)) && {
      color: theme.palette.text.main,
      fill: theme.palette.text.main,
    }),
  },
}));

export const ChevronWrap = styled('div')<{ isExpanded: boolean }>(({ isExpanded }) => ({
  ...flex,
  ...(isExpanded && {
    transform: 'rotate(180deg) scaleX(-1)',
  }),
}));

const MenuItemWrapper: React.FunctionComponent<{
  hasSubItems: boolean;
  path: string;
  isActive: boolean;
  isMainItem: boolean;
  isExpanded: boolean;
  onClick?: () => void;
}> = ({ path, isActive, isMainItem, isExpanded, hasSubItems, children, onClick }) => {
  return !hasSubItems ? (
    <StyledLink {...{ to: path, href: path, isActive, onClick }}>
      <BaseElement {...{ isActive, isMainItem, hasSubItems, isExpanded }}>{children}</BaseElement>
    </StyledLink>
  ) : (
    <BaseElement {...{ isActive, isMainItem, hasSubItems, isExpanded, onClick }}>{children}</BaseElement>
  );
};

export const MenuItem: React.FunctionComponent<MenuItemProps> = ({
  icon,
  title,
  path,
  subItems,
  isExpanded,
  isActive,
  currentPath,
  onClick,
  hasChildrenActive = false,
}) => {
  const hasSubItems = Boolean(subItems);
  const [isChildrenVisible, setChildrenVisible] = React.useState<boolean>(hasChildrenActive);

  return (
    <>
      <MenuItemWrapper
        {...{
          path,
          isActive,
          isMainItem: true,
          hasSubItems,
          isExpanded,
          onClick: () => (hasSubItems ? setChildrenVisible(!isChildrenVisible) : onClick && onClick(path)),
        }}
      >
        {!isExpanded ? (
          <TooltipTip data-text={title} data-textt={' '}>
            <IconWrap
              {...{
                isExpanded,
                isActive,
                hasChildrenActive,
              }}
            >
              <div>{icon}</div>
            </IconWrap>
          </TooltipTip>
        ) : (
          <IconWrap
            {...{
              isExpanded,
              isActive,
              hasChildrenActive,
            }}
          >
            <div>{icon}</div>
          </IconWrap>
        )}

        {isExpanded && <div>{title}</div>}

        {isExpanded && hasSubItems && (
          <ChevronWrap {...{ isExpanded }}>
            {isChildrenVisible && <ChevronDownIcon {...{ width: 16, height: 16 }} />}
            {!isChildrenVisible && <ChevronUpIcon {...{ width: 16, height: 16 }} />}
          </ChevronWrap>
        )}
      </MenuItemWrapper>
      {isChildrenVisible &&
        hasSubItems &&
        isExpanded &&
        subItems?.map((subItem) => {
          return (
            <MenuItemWrapper
              {...{
                ...subItem,
                isMainItem: false,
                hasSubItems: false,
                onClick: () => onClick && onClick(subItem.path),
                isExpanded,
                isActive: subItem.path === currentPath,
              }}
            >
              <div />
              {isExpanded && <div>{subItem.title}</div>}
            </MenuItemWrapper>
          );
        })}
    </>
  );
};
