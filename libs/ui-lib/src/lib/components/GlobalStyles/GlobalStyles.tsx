import * as React from 'react';

import { theme } from '@cellxpert/theme';
import { Global } from '@emotion/core';

export interface GlobalStylesProps {}

export const GlobalStyles: React.FunctionComponent<GlobalStylesProps> = () => {
  return (
    <Global
      {...{
        styles: {
          'body, html': {
            padding: 0,
            margin: 0,
            fontFamily: theme.typography.fontFamily,
          },
          ul: {
            padding: 0,
            margin: 0,
            listStyle: 'none',
          },
          '*': {
            boxSizing: 'border-box',
          },
          'input, textarea, select': {
            '&:focus': { outline: 0 },
            '&:disabled': { backgroundColor: 'white' },
          },
        },
      }}
    />
  );
};

export default GlobalStyles;
