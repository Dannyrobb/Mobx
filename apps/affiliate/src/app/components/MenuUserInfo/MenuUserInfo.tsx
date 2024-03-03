import * as React from 'react';

import { WorkspaceIcon } from '@cellxpert/icons';
import { Tooltip, Typography } from '@cellxpert/ui-lib';
import styled from '@emotion/styled';

export interface MenuUserInfoProps {}

export const UserInfoContainer = styled('div')(({ theme }) => ({
  borderTop: '1px solid #000',
  padding: theme.gutters.base * 1.5,
  display: 'flex',
}));

export const AffiliateDetails = styled('div')(({ theme }) => ({
  overflow: 'hidden',
  maxWidth: '80%',
  fontSize: theme.typography.meta.body2.fontSize,
  color: theme.palette.additional.grey['700'],
}));

export const AffiliateName = styled(Typography)(() => ({
  textOverflow: 'ellipsis',
  overflow: 'hidden',
}));

export const AffiliateId = styled(Typography)(() => ({}));

export const ProfilePlaceholder = styled('div')(({ theme }) => ({
  height: '32px',
  maxWidth: '32px',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  display: 'flex',
  flex: 1,
  marginRight: theme.gutters.base * 1.5,
  backgroundColor: theme.palette.main.secondary2['400'],
}));

export const PopoverProfileAccountMenu = styled('ul')(({ theme }) => ({
  padding: theme.gutters.base,
  margin: theme.gutters.base,
  backgroundColor: 'white',
  boxShadow: `0 1px 5px 0 rgba(0,0,0,0.2)`,
  cursor: 'pointer',
}));

export const PopoverProfileAccountMenuItem = styled('li')(({ theme }) => ({
  alignItems: 'center',
  display: 'flex',
  flex: 1,
  padding: theme.gutters.base,
}));

export const PopoverProfileAccountMenuItemIcon = styled(Typography)(({ theme }) => ({
  alignItems: 'center',
  display: 'flex',
  ' svg': {
    color: theme.palette.additional.grey['700'],
    fill: theme.palette.additional.grey['700'],
  },
}));

export const PopoverProfileAccountMenuItemLabel = styled(Typography)(({ theme }) => ({
  alignItems: 'center',
  display: 'flex',
  flex: 1,
  marginLeft: theme.gutters.base * 2,
  color: theme.palette.additional.grey['700'],
}));

export const MenuUserInfo: React.FunctionComponent<MenuUserInfoProps> = () => {
  return (
    <Tooltip
      {...{
        isOpen: false,
        button: (
          <UserInfoContainer>
            <ProfilePlaceholder>B</ProfilePlaceholder>
            <AffiliateDetails>
              <AffiliateName {...{ variant: 'body2' }}>backofficedrpbocc@gmail.com</AffiliateName>
              <AffiliateId {...{ variant: 'caption' }}>ID: 335769</AffiliateId>
            </AffiliateDetails>
          </UserInfoContainer>
        ),
      }}
    >
      <PopoverProfileAccountMenu>
        <PopoverProfileAccountMenuItem>
          <PopoverProfileAccountMenuItemIcon>
            <WorkspaceIcon />
          </PopoverProfileAccountMenuItemIcon>
          <PopoverProfileAccountMenuItemLabel {...{ variant: 'body2' }}>
            Account settings
          </PopoverProfileAccountMenuItemLabel>
        </PopoverProfileAccountMenuItem>

        <PopoverProfileAccountMenuItem>
          <PopoverProfileAccountMenuItemIcon>
            <WorkspaceIcon />
          </PopoverProfileAccountMenuItemIcon>
          <PopoverProfileAccountMenuItemLabel {...{ variant: 'body2' }}>
            Switch to old version
          </PopoverProfileAccountMenuItemLabel>
        </PopoverProfileAccountMenuItem>

        <PopoverProfileAccountMenuItem>
          <PopoverProfileAccountMenuItemIcon>
            <WorkspaceIcon />
          </PopoverProfileAccountMenuItemIcon>
          <PopoverProfileAccountMenuItemLabel
            {...{
              variant: 'body2',
              onClick: () => {
                localStorage.removeItem('token');
                window.location.href = '/';
              },
            }}
          >
            Logout
          </PopoverProfileAccountMenuItemLabel>
        </PopoverProfileAccountMenuItem>
      </PopoverProfileAccountMenu>
    </Tooltip>
  );
};
