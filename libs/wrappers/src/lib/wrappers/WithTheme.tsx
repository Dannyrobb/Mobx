import React from 'react';
import { ThemeProvider } from '@emotion/react';
import { theme as defaultTheme, Theme, createTheme } from '@cellxpert/theme';

interface WithThemeProps {
  theme?: Theme;
}

export const WithTheme: React.FunctionComponent<WithThemeProps> = ({ theme = defaultTheme, children }) => {
  console.log('cha cha cha');
  return <ThemeProvider {...{ theme }}>{React.Children.only(children)}</ThemeProvider>;
};
