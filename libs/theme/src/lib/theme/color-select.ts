import {
  AdditionalPaletteKey,
  BlacksPaletteKey,
  IndicatorsPaletteKey,
  MainPaletteKey,
  Palette,
  PaletteShades,
  TextColor,
  theme,
} from './theme';

export type ColorKey =
  | keyof Palette['main']
  | keyof Palette['text']
  | keyof Palette['indicators']
  | keyof Palette['additional']
  | keyof Palette['blacks']
  | 'inherit';

const x: ColorKey = 'green';
export const colorSelect = (color: ColorKey, colorShade: PaletteShades = 500): string => {
  if (!color) {
    return theme.palette.text.main;
  }

  if (color === 'inherit') {
    return 'inherit';
  }

  if (color in theme.palette.main) {
    return theme.palette.main[color as MainPaletteKey].base;
  } else if (color in theme.palette.text) {
    return theme.palette.text[color as TextColor];
  } else if (color in theme.palette.indicators) {
    return theme.palette.indicators[color as IndicatorsPaletteKey];
  } else if (color in theme.palette.additional) {
    return theme.palette.additional[color as AdditionalPaletteKey][colorShade];
  } else if (color in theme.palette.blacks) {
    return theme.palette.blacks[color as BlacksPaletteKey];
  }

  return theme.palette.text.main;
};
