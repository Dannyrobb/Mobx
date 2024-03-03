import React from 'react';

import { Theme } from '@cellxpert/theme';
import styled from '@emotion/styled';

export interface PageContainerProps {}

const Container = styled('section')(({ theme }) => ({
  width: theme.gutters.base * 60,
  margin: '0 auto',
  paddingTop: theme.gutters.base * 4,
  paddingBottom: theme.gutters.base * 4,
}));

export const PageContainer: React.FunctionComponent<PageContainerProps> = ({ children }) => {
  return <Container>{children}</Container>;
};

export default PageContainer;
