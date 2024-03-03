import * as React from 'react';

import { Theme } from '@cellxpert/theme';
import styled from '@emotion/styled';

export interface MainLayoutProps {
  menu: React.ReactNode;
  content: React.ReactNode;
}

export const Container = styled('div')(() => ({
  display: 'grid',
  gridTemplateColumns: 'min-content 1fr',
  gridTemplateRows: '1fr',
  height: '100vh',
  width: '100%',
  gridTemplateAreas: `
  'menu content'
  'menu content'
  `,
}));

export const Content = styled('section')(() => ({
  gridArea: 'content',
  width: '100%',
  margin: 0,
  maxWidth: 'unset',
  overflow: 'hidden',
  overflowY: 'scroll',
}));

export const MainLayout: React.FunctionComponent<MainLayoutProps> = ({ menu, content }) => {
  return (
    <Container>
      {menu}
      <Content>{content}</Content>
    </Container>
  );
};

export default MainLayout;
