import * as React from 'react';

import { colorSelect, PaletteShades, theme, Theme, TypographyVariant } from '@cellxpert/theme';
import styled from '@emotion/styled';

export interface TypographyProps {
  /**
   * How would you like it to render? Please note, that the default is `p` unless stated otherwise.
   * If you need h1, passing only the variant is not enough.
   * @default 'p'
   */
  component?: React.ElementType;
  /**
   * @default body1
   */
  variant?: TypographyVariant;

  /**
   * sets font-weight 500
  //  * @default false
   */
  regular?: boolean;

  /**
   * sets font-weight 600
  //  * @default false
   */
  bold?: boolean;

  /**
   * sets font-weight 700
  //  * @default false
   */
  bolder?: boolean;

  /**
   * If true, no margins will be applied
   * @default false
   */
  noMargin?: boolean;

  /**
   * In case you'd like to add marginBottom
   */
  marginBottom?: number | string;

  /**
   * In case you'd like to add marginTp[
   */
  marginTop?: number | string;

  /**
   * Align text to center
   */
  center?: boolean;

  /**
   * Imagine you'd like to add some opacity to the text.
   * @default undefined
   */
  textOpacity?: number;

  /**
   * In case you would like to override the color of the text.
   * @default main
   */
  color?:
    | keyof Theme['palette']['text']
    | keyof Theme['palette']['main']
    | keyof Theme['palette']['additional']
    | keyof Theme['palette']['indicators']
    | keyof Theme['palette']['blacks']
    | 'inherit';

  /**
   * Which font family to use from the array
   * @default 0
   */
  fontFamilyIndex?: number;

  /**
   * Which color shade
   * @default 500
   */
  colorShade?: PaletteShades;
}

// function isTextColor(color: TypographyProps['color']): color is keyof Theme['palette']['text'] {
//   return color === 'main' || color === 'contrast';
// }

const Typo = styled('p')<TypographyProps>(
  ({
    variant = 'body1',
    bold = false,
    bolder = false,
    noMargin = false,
    center = false,
    textOpacity,
    marginTop,
    marginBottom,
    color = 'text',
    fontFamilyIndex = 0,
    regular = false,
    colorShade = 500,
  }) => {
    return {
      fontFamily: theme.typography.fontFamily[fontFamilyIndex],
      ...(theme.typography?.meta[variant] ?? {}),
      margin: noMargin ? 0 : 'initial',
      textAlign: center ? 'center' : 'initial',
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      color: colorSelect(color, colorShade),
      ...(textOpacity && { opacity: textOpacity }),
      ...(bold && { fontWeight: 600 }),
      ...(bolder && { fontWeight: 700 }),
      ...(marginTop && { marginTop }),
      ...(marginBottom && { marginBottom }),
      ...(regular && { fontWeight: 500 }),
    };
  }
);

export const Typography: React.FunctionComponent<TypographyProps> = ({
  component = 'p',
  variant = 'body1',
  // bold,
  textOpacity,
  children,

  ...rest
}) => {
  return <Typo {...{ as: component, variant, textOpacity, ...rest }}>{children}</Typo>;
};

export default Typography;

// export const colorSelect = (color: TypographyProps['color']): string => {
//   if (!color) {
//     return theme.palette.text.main;
//   }
//
//   if (color === 'inherit') {
//     return 'inherit';
//   }
//
//   if (color in theme.palette.text) {
//     return theme.palette.text[color as TextColor];
//   } else if (color in theme.palette.main) {
//     return theme.palette.main[color as MainPalette].base;
//   } else if (color in theme.palette.blacks) {
//     return theme.palette.blacks[color as BlacksPalette];
//   } else {
//     return theme.palette.text.main;
//   }
// };
