import * as React from 'react';

import { theme } from '@cellxpert/theme';
import styled from '@emotion/styled';

type Variant = 'small' | 'big';

export interface LabelProps {
  label: string;
  /**
   * In case other flavors are needed.
   * @default small
   */
  variant?: Variant;
}

const StyledLabel = styled('label')(() => ({
  fontFamily: theme.typography.fontFamily[0],
  fontSize: 14,
  color: theme.palette.text.main,
  lineHeight: '20px',
  fontWeight: 600,
}));

export const Label: React.FunctionComponent<LabelProps> = ({ label, variant = 'small', ...rest }) => {
  return <StyledLabel {...{ ...rest, variant }}>{label}</StyledLabel>;
};

export default Label;
