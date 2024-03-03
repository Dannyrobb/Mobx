export type TypographyVariant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'subtitle1'
  | 'subtitle2'
  | 'body1'
  | 'body2'
  // | 'body3'
  | 'button'
  | 'buttonRegular'
  | 'caption'
  | 'overline';

interface TypoMeta
  extends Pick<
    React.CSSProperties,
    | 'fontSize'
    | 'fontWeight'
    | 'lineHeight'
    | 'letterSpacing'
    | 'textTransform'
    | 'textDecoration'
    | 'textAlign'
    | 'color'
    | 'fontFamily'
  > {}

export interface Typography {
  imports: string[];
  fontFamily: string[];
  meta: Record<TypographyVariant, TypoMeta>;
}

export const typography = (): Typography => ({
  imports: [
    'https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap',
    'https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&display=swap',
  ],
  fontFamily: ["'Montserrat', sans-serif", "'Lato', sans-serif"],
  meta: {
    h1: {
      fontSize: 97,
      fontWeight: 300,
      lineHeight: 1.155,
      letterSpacing: -1.5,
    },
    h2: {
      fontSize: 61,
      fontWeight: 400,
      lineHeight: 1.18,
      letterSpacing: -0.508333,
    },
    h3: {
      fontSize: 48,
      fontWeight: 400,
      lineHeight: 1.167,
      letterSpacing: 0,
    },
    h4: {
      fontSize: 34,
      lineHeight: 1.176,
      fontWeight: 500,
      letterSpacing: 0.25,
    },
    h5: {
      fontSize: 24,
      lineHeight: 1.333,
      fontWeight: 600,
      letterSpacing: 0,
    },
    h6: {
      fontSize: 20,
      lineHeight: 1.2,
      fontWeight: 600,
      letterSpacing: 0.15,
    },
    subtitle1: {
      fontSize: 16,
      lineHeight: 1.5,
      fontWeight: 500,
      letterSpacing: 0.15,
    },
    subtitle2: {
      fontSize: 14,
      lineHeight: 1.714,
      fontWeight: 500,
      letterSpacing: 0.1,
    },
    body1: {
      fontFamily: "'Lato', sans-serif",
      fontSize: 17,
      lineHeight: 1.412,
      fontWeight: 400,
      letterSpacing: 0.5,
    },
    body2: {
      fontFamily: "'Lato', sans-serif",
      fontSize: 14,
      lineHeight: '16px',
      fontWeight: 400,
      letterSpacing: 0.23,
    },
    // body3: {
    //   fontSize: 13,
    //   lineHeight: '22px',
    //   color: '#fc2b64',
    // },
    button: {
      fontFamily: "'Lato', sans-serif",
      fontSize: 14,
      lineHeight: '16px',
      fontWeight: 700,
      letterSpacing: 0.5,
    },
    buttonRegular: {
      fontFamily: "'Lato', sans-serif",
      fontSize: 14,
      lineHeight: '16px',
      fontWeight: 500,
      letterSpacing: 0.5,
    },
    caption: {
      fontFamily: "'Lato', sans-serif",
      fontSize: 12,
      lineHeight: 1.333,
      fontWeight: 400,
      letterSpacing: 0.37,
    },
    overline: {
      fontFamily: "'Lato', sans-serif",
      fontSize: 10,
      lineHeight: 1.231,
      fontWeight: 700,
      letterSpacing: 1.5,
    },
  },
});
