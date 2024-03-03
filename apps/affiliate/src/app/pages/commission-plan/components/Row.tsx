import React from 'react';

import { Theme } from '@cellxpert/theme';
import styled from '@emotion/styled';

export interface RowProps {
  isSubRow?: boolean;
}

const Container = styled('div')<{  subColumnCount?: number; isSubRow: boolean }>(
  ({ theme, subColumnCount = 4, isSubRow }) => ({
    display: 'grid',
    gridTemplateColumns: `repeat(${subColumnCount}, 1fr)`,
    padding: `${theme.gutters.base}px ${theme.gutters.base * 3}px`,
    borderTop: `1px solid ${!isSubRow ? theme.palette.blacks.border : theme.palette.blacks.background}`,
  })
);

export const Row: React.FunctionComponent<RowProps> = ({ isSubRow, children }) => {
  return <Container {...{ isSubRow: isSubRow ? isSubRow : false }}>{children}</Container>;
};

export default Row;
