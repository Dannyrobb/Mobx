import React from 'react';

import { flexCenterCenter, Theme } from '@cellxpert/theme';
import { Typography } from '@cellxpert/ui-lib';
import styled from '@emotion/styled';

export interface UserInfoProps {
  avatarUrl?: string;
  name: string;
  affiliateId: string | number;
}

const UserInfoContainer = styled('div')(({ theme }) => ({
  ...flexCenterCenter,
  paddingTop: theme.gutters.base * 4,
  paddingBottom: theme.gutters.base * 4,
}));

const Avatar = styled('span')(({ theme }) => ({
  ...flexCenterCenter,
  overflow: 'hidden',
  borderRadius: '50%',
  backgroundColor: theme.palette.main.secondary2['400'],
  width: theme.gutters.base * 15,
  height: theme.gutters.base * 15,
  marginRight: theme.gutters.base * 2,
}));

export const AffiliateName = styled(Typography)(({ theme }) => ({
  marginTop: 0,
  marginBottom: theme.gutters.base / 2,
}));

export const AffiliateId: React.FunctionComponent<Pick<UserInfoProps, 'affiliateId'>> = ({ affiliateId }) => (
  <Typography {...{ noMargin: true, variant: 'body2' }}>ID: {affiliateId}</Typography>
);

export const ProfileIcon: React.FunctionComponent<Pick<UserInfoProps, 'avatarUrl' | 'name'>> = ({
  name,
  avatarUrl,
}) => (
  <Avatar>
    {avatarUrl ? (
      <img {...{ src: avatarUrl }} alt={name} />
    ) : (
      <Typography {...{ variant: 'h2', component: 'h2', color: 'contrast' }}>{name.slice(0, 1)}</Typography>
    )}
  </Avatar>
);

export const UserInfo: React.FunctionComponent<UserInfoProps> = ({ avatarUrl, name, affiliateId }) => {
  return (
    <UserInfoContainer>
      <ProfileIcon {...{ avatarUrl, name }} />
      <div>
        <AffiliateName {...{ variant: 'h6', component: 'h6' }}>{name}</AffiliateName>
        <AffiliateId {...{ affiliateId }} />
      </div>
    </UserInfoContainer>
  );
};
