import * as React from 'react';

import { flexCenterCenter, flexStartCenter, theme } from '@cellxpert/theme';
import styled from '@emotion/styled';

export interface CardProps {
  title?: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  smallCard?: boolean;
  mediumCard?: boolean;
  largeCard?: boolean;
  isList?: boolean;
  fillHeight?: boolean;
  withoutPadding?: boolean;
}
const CardWrapper = styled('div')<{} & Pick<CardProps, 'fillHeight'>>(({ fillHeight }) => ({
  ...(fillHeight && {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  }),
}));

const TitleAndIconWrapper = styled('div')(() => ({
  ...flexStartCenter,
  marginBottom: theme.gutters.base,
}));

const CardTitle = styled('div')(() => ({
  ...theme.typography.meta.subtitle1,
  color: theme.palette.text.main,
}));

const CardIcon = styled('span')(() => ({
  fill: theme.palette.text.main,
  marginRight: theme.gutters.base,
}));

const CardContent = styled('div')<
  Pick<CardProps, 'smallCard' | 'mediumCard' | 'largeCard' | 'isList' | 'fillHeight' | 'withoutPadding'>
>(({ theme, mediumCard, largeCard, isList, fillHeight, withoutPadding }) => ({
  boxShadow: `0 1px 3px 0 rgba(0, 0, 0, 0.2), 0 2px 1px -1px rgba(0, 0, 0, 0.12), 0 1px 1px 0 rgba(0, 0, 0, 0.14)`,

  backgroundColor: theme.palette.blacks.white,
  flexDirection: 'column',

  ...(!withoutPadding && {
    padding: `${theme.gutters.base * 2}px ${theme.gutters.base * 3}px ${theme.gutters.base * 4}px ${
      theme.gutters.base * 3
    }px`,
  }),
  ...(mediumCard && {
    ...flexCenterCenter,
    ...theme.typography.meta.h4,
  }),
  ...(largeCard && {
    ...flexCenterCenter,
  }),
  ...(isList && {
    display: 'flex',
    flexDirection: 'column',
  }),
  ...(fillHeight && {
    flex: 1,
  }),
}));

export const Card: React.FunctionComponent<CardProps> = ({
  title,
  icon,
  children,
  mediumCard,
  largeCard,
  isList,
  fillHeight,
  withoutPadding,
}) => {
  // console.log(fillHeight);

  return (
    <CardWrapper {...{ fillHeight }}>
      {isList ? null : (
        <TitleAndIconWrapper {...{ isList, mediumCard, largeCard }}>
          <CardIcon {...{ height: 20, width: 20 }}>{icon}</CardIcon>
          <CardTitle>{title}</CardTitle>
        </TitleAndIconWrapper>
      )}
      <CardContent {...{ isList, fillHeight, mediumCard, largeCard, withoutPadding }}>{children}</CardContent>
    </CardWrapper>
  );
};

export const CardList: React.FunctionComponent<CardProps> = ({ icon, title, isList, children }) => {
  return (
    <>
      <TitleAndIconWrapper {...{ isList }}>
        <CardIcon {...{ height: 20, width: 20 }}>{icon}</CardIcon>
        <CardTitle {...{ variant: 'subtitle1', fontFamilyIndex: 0 }}>{title}</CardTitle>
      </TitleAndIconWrapper>
      {children}
    </>
  );
};
