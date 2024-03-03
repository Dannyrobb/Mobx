import * as React from 'react';
import styled from '@emotion/styled';
import Typography from '../Typography/Typography';
import { theme } from '@cellxpert/theme';

const FooterWrapper = styled('footer')(() => ({
  height: theme.gutters.base * 7,
  backgroundColor: theme.palette.text.contrast,
  padding: `${theme.gutters.base * 2}px ${theme.gutters.base * 60.25}px ${theme.gutters.base * 3}px ${
    theme.gutters.base * 4.5
  }px `,
  display: 'flex',
  marginLeft: '2px',
  margintop: '2px',
  boxShadow: `0 1px 10px 0 rgba(0, 0, 0, 0.1), 0 4px 5px 0 rgba(0, 0, 0, 0.1)`,
}));

const CopyRightIcon = styled(Typography)(() => ({
  height: theme.gutters.base * 1.25,
  width: theme.gutters.base * 1.25,
  opacity: 0.5,
}));

const AllRightsSpan = styled(Typography)(() => ({
  opacity: 0.5,
  margin: `0 0 0 ${theme.gutters.base * 0.5}px`,
}));

export const Footer: React.FunctionComponent = () => {
  return (
    <FooterWrapper>
      <CopyRightIcon {...{ variant: 'caption', component: 'div', color: 'main' }}>©</CopyRightIcon>
      <AllRightsSpan {...{ variant: 'caption', component: 'span', color: 'main' }}>
        {new Date(Date.now()).getFullYear()} Cellxpert. All rights reserved
      </AllRightsSpan>
    </FooterWrapper>
  );
};

export default Footer;
