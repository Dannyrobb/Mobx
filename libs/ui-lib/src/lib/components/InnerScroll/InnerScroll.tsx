import * as React from 'react';

import { absoluteBlow, theme } from '@cellxpert/theme';
import styled from '@emotion/styled';

export interface InnerScrollProps {
  small?: boolean;
  medium?: boolean;
}

export const InnerScrollWrap = styled('div')(() => ({
  height: '100%',
  position: 'relative',
}));

export const InnerScrollScroll = styled('div')<Pick<InnerScrollProps, 'small' | 'medium'>>(({ small, medium }) => ({
  overflowY: 'auto',
  ...absoluteBlow,
  ...(small && {
    '::-webkit-scrollbar': {
      WebkitAppearance: 'none',
      MozAppearance: 'none',
      appearance: 'none',
      margin: '0',
      display: 'block',
      height: theme.gutters.base * 1,
      width: theme.gutters.base * 1,
      backgroundColor: theme.palette.blacks.background,
      borderRadius: theme.gutters.base * 0.5,
    },
    '::-moz-scrollbar': { borderRadius: theme.gutters.base * 0.5 },
    '::-webkit-scrollbar-thumb': {
      backgroundColor: theme.palette.additional.grey[400],
      height: theme.gutters.base * 1,
      borderRadius: theme.gutters.base * 0.5,
      ':hover': { backgroundColor: theme.palette.additional.grey[500] },
    },
  }),
  ...(medium && {
    '::-webkit-scrollbar': {
      WebkitAppearance: 'none',
      MozAppearance: 'none',
      appearance: 'none',
      margin: '0',
      display: 'block',
      height: theme.gutters.base * 1,
      width: theme.gutters.base * 1.125,
      backgroundColor: theme.palette.blacks.background,
      borderRadius: theme.gutters.base * 0.5,
    },
    '::-webkit-scrollbar-thumb': {
      backgroundColor: theme.palette.additional.grey[400],
      borderRadius: theme.gutters.base * 0.5,
      ':hover': { backgroundColor: theme.palette.additional.grey[500] },
    },
  }),
  scrollbarColor: `${theme.palette.additional.grey[400]} ${theme.palette.blacks.background}`,
  scrollbarWidth: 'thin',
}));

export const InnerScroll: React.FunctionComponent<InnerScrollProps> = ({ children, small, medium }) => {
  return (
    <InnerScrollWrap>
      <InnerScrollScroll {...{ small, medium }}>{children}</InnerScrollScroll>
    </InnerScrollWrap>
  );
};

export default InnerScroll;
