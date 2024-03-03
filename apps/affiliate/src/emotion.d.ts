import '@emotion/react';
import { Theme as _Theme } from '@cellxpert/theme';

declare module '@emotion/react' {
  export interface Theme {
    palette: _Theme['palette'];
    gutters: _Theme['gutters'];
    breakpoints: _Theme['breakpoints'];
    zIndex: _Theme['zIndex'];
    radius: _Theme['radius'];
    border: _Theme['border'];
    opacity: _Theme['opacity'];
    typography: _Theme['typography'];
    spacing: _Theme['spacing'];
  }
}
