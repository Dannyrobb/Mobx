import type { PartialDeep } from 'type-fest';
import { Typography, typography } from './typography';

export type MainPaletteKey = 'primary1' | 'primary2' | 'secondary1' | 'secondary2';
export type PaletteShades = 900 | 800 | 700 | 600 | 500 | 400 | 300 | 200 | 100 | 50;
export type MainPalette = Record<PaletteShades, string> & {
  base: string;
};

export type AdditionalPaletteKey = 'green' | 'teal' | 'magenta' | 'red' | 'brown' | 'grey';
export type AdditionalPalette = Record<PaletteShades, string>;

export type IndicatorsPaletteKey = 'success' | 'alert' | 'error' | 'information';
export type TextColor =
  | 'main'
  | 'contrast'
  | 'light'
  | 'dark'
  | 'success'
  | 'error'
  | 'helper'
  | 'placeholder'
  | 'label'
  | 'disabled';

export type BlacksPaletteKey = 'disabled' | 'background' | 'border' | 'grey' | 'transparent' | 'white';

type Breakpoints = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface Palette {
  main: Record<MainPaletteKey, MainPalette>;
  additional: Record<AdditionalPaletteKey, AdditionalPalette>;

  indicators: Record<IndicatorsPaletteKey, string>;
  text: Record<TextColor, string>;

  // background: Record<BackgroundPalette, string>;
  blacks: Record<BlacksPaletteKey, string>;
}

type ZIndexKeys = 'appBar' | 'drawer' | 'modal' | 'snackbar' | 'tooltip';

type Radius = 'button' | 'tag' | 'card' | 'circle' | 'tooltip' | 'modal' | 'input';

type Border = 'checkbox' | 'dashed';

type Opacity = 'hidden' | 'half' | 'visible';

/**
 * Basic theme we will use to build components from.
 */
export interface Theme {
  palette: Palette;
  zIndex: Record<ZIndexKeys, number>;
  gutters: Gutters;
  radius: Record<Radius, number>;
  border: Record<Border, string>;
  opacity: Record<Opacity, number>;
  typography: Typography;
  breakpoints: Record<Breakpoints, number>;
}

interface Gutters {
  base: number;
}

/**
 * Components Theme which has specific overrides for specific components.
 */
interface ComponentsTheme {}

type CreateThemeOptions = { theme?: PartialDeep<Theme> };

export const createTheme: (createThemeOptions?: CreateThemeOptions) => Theme = ({ theme } = {}) => ({
  palette: {
    main: {
      primary1: {
        get base(): string {
          return this[800];
        },
        900: '#1E47CD',
        800: '#126AEC',
        700: '#007BFF',
        600: '#008EFF',
        500: '#009EFF',
        400: '#4589FF',
        300: '#78A9FF',
        200: '#A6C8FF',
        100: '#D0E2FF',
        50: '#EDF5FF',
      },
      primary2: {
        get base(): string {
          return this[800];
        },
        900: '#16244C',
        800: '#1F3464',
        700: '#263D71',
        600: '#2E467C',
        500: '#344D84',
        400: '#526694',
        300: '#7081A5',
        200: '#97A4BF',
        100: '#C0C7D9',
        50: '#E6E9EF',
      },
      secondary1: {
        get base(): string {
          return this[500];
        },
        900: '#4B00C8',
        800: '#561FD7',
        700: '#7020DD',
        600: '#8B22E5',
        500: '#9E21EB',
        400: '#AD47F0',
        300: '#BD6BF3',
        200: '#D096F6',
        100: '#E3C0F9',
        50: '#F4E6FC',
      },
      secondary2: {
        get base(): string {
          return this[400];
        },
        900: '#FA7723',
        800: '#FB952A',
        700: '#FCA52C',
        600: '#FEB730',
        500: '#FFC435',
        400: '#FFCE42',
        300: '#FFD75F',
        200: '#FFE18B',
        100: '#FFEDB8',
        50: '#FFF8E3',
      },
    },
    additional: {
      green: {
        900: '#071908',
        800: '#022D0D',
        700: '#044317',
        600: '#0E6027',
        500: '#198038',
        400: '#24A148',
        300: '#42BE65',
        200: '#6FDC8C',
        100: '#A7F0BA',
        50: '#DEFBE6',
      },
      teal: {
        900: '#081A1C',
        800: '#022B30',
        700: '#004144',
        600: '#005D5D',
        500: '#007D79',
        400: '#009D9A',
        300: '#08BDBA',
        200: '#3DDBD9',
        100: '#9EF0F0',
        50: '#D9FBFB',
      },
      magenta: {
        900: '#2A0A18',
        800: '#510224',
        700: '#740937',
        600: '#9F1853',
        500: '#D12771',
        400: '#EE5396',
        300: '#FF7EB6',
        200: '#FFAFD2',
        100: '#FFD6E8',
        50: '#FFF0F7',
      },
      red: {
        900: '#2d0709',
        800: '#520408',
        700: '#750e13',
        600: '#a2191f',
        500: '#da1e28',
        400: '#fa4d56',
        300: '#ff8389',
        200: '#ffb3b8',
        100: '#ffd7d9',
        50: '#fff1f1',
      },
      brown: {
        900: '#3E2723',
        800: '#4E342E',
        700: '#5D4037',
        600: '#6D4C41',
        500: '#795548',
        400: '#8D6E63',
        300: '#A1887F',
        200: '#BCAAA4',
        100: '#D7CCC8',
        50: '#EFEBE9',
      },
      grey: {
        900: '#1D1D1B',
        800: '#424242',
        700: '#616161',
        600: '#757575',
        500: '#9E9E9E',
        400: '#BDBDBD',
        300: '#E0E0E0',
        200: '#EEEEEE',
        100: '#F5F5F5',
        50: '#FAFAFA',
      },
    },
    text: {
      main: '#1D1D1B',
      contrast: '#FFFFFF',
      light: '#BDBDBD',
      dark: '#616161',
      success: '#42BE65',
      error: '#DA1E28',
      helper: '#9E9E9E',
      placeholder: '#757575',
      label: '#616161',
      disabled: '#BDBDBD',
      information: '#126AEC',
    },
    indicators: {
      error: '#e22934',
      success: '#2bb954',
      alert: '#ff832b',
      information: '#126AEC',
    },
    blacks: {
      disabled: '#A9A9A9',
      background: '#F9FAFC',
      white: '#FFFFFF',
      border: '#E6E7E8',
      grey: '#161616',
      transparent: 'transparent',
    },
  },
  zIndex: {
    appBar: 600,
    modal: 700,
    drawer: 800,
    snackbar: 900,
    tooltip: 1000,
    ...theme?.zIndex,
  },
  border: {
    checkbox: '1px solid #ccc',
    dashed: '1px dashed #ccc',
    ...theme?.border,
  },
  opacity: {
    hidden: 0,
    half: 0.5,
    visible: 1,
    ...theme?.opacity,
  },
  gutters: { base: 8, ...theme?.gutters },
  radius: {
    button: 8,
    tag: 4,
    card: 12,
    circle: 50,
    tooltip: 0,
    input: 32,
    modal: 8,
    ...theme?.radius,
  },
  // typography: { ...typography(), ...(theme?.typography && {...theme.typography }) },
  typography: { ...typography() },
  breakpoints: { xs: 0, sm: 600, md: 960, lg: 1280, xl: 1920 },
});

export const theme = createTheme();
