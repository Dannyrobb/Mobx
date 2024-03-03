import * as React from 'react';

import { flexCenterCenter, theme, Theme } from '@cellxpert/theme';
import styled from '@emotion/styled';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Button Variant
   * @default primary
   */
  variant?: 'primary' | 'secondary' | 'ghostBlack' | 'ghostBlue' | 'ghostRed' | 'link' | 'ghostBlueText' | 'danger';

  /**
   * What size should it be?
   * @default small
   */
  size?: 'small' | 'medium' | 'large' | 'smallTrial';
  /**
   * Optional click handler
   */
  onClick?: (e: React.MouseEvent) => void;

  gridArea?: string;
  disabled?: boolean;
  loading?: boolean;

  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;

  icon?: React.ReactNode;
  label?: string;
  comboClick?: (e: React.MouseEvent) => void;
}

type CssFunc = (theme: Theme) => React.CSSProperties;

type CssIconFunc = (theme: Theme, onlyIcon: boolean) => React.CSSProperties;

const baseStyle: CssFunc = () => ({
  whiteSpace: 'nowrap',
  cursor: 'pointer',
  borderWidth: 0,
  borderRadius: theme.radius.button * 3,
  boxSizing: 'border-box',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
  ...theme.typography.meta.button,
});

const primaryStyle: CssFunc = () => ({
  backgroundColor: theme.palette.main.primary1.base,
  color: theme.palette.text.contrast,
  '&:hover': {
    backgroundColor: theme.palette.main.primary1[900],
  },
  '&:active': {
    backgroundColor: theme.palette.main.primary2.base,
  },
  '&:disabled': {
    backgroundColor: theme.palette.main.primary1[100],
    svg: { fill: theme.palette.main.primary1[100] },
  },
});

const secondaryStyle: CssFunc = () => ({
  backgroundColor: theme.palette.text.contrast,
  color: theme.palette.main.primary1.base,
  border: `1px solid ${theme.palette.main.primary1.base}`,
  '&:hover': {
    backgroundColor: theme.palette.main.primary1[100],
  },
  '&:active': {
    backgroundColor: theme.palette.main.primary1[200],
  },
  '&:disabled': {
    color: theme.palette.main.primary1[200],
    svg: { fill: theme.palette.main.primary1[200] },
    border: `1px solid ${theme.palette.main.primary1[200]}`,
  },
});

const dangerStyle: CssFunc = (theme) => ({
  backgroundColor: theme.palette.additional.red[500],
  color: theme.palette.text.contrast,
  '&:hover': {
    backgroundColor: theme.palette.additional.red[600],
  },
  '&:active': {
    backgroundColor: theme.palette.additional.red[700],
  },
  '&:disabled': {
    backgroundColor: theme.palette.additional.red[100],
  },
});

const ghostBlackStyle: CssIconFunc = (theme, onlyIcon) => ({
  backgroundColor: theme.palette.blacks.transparent,
  color: theme.palette.text.main,
  svg: { fill: theme.palette.text.main },
  '&:hover': {
    color: theme.palette.main.primary2.base,
    backgroundColor: onlyIcon ? theme.palette.main.primary1[100] : theme.palette.blacks.transparent,
  },
  '&:hover svg': {
    fill: theme.palette.main.primary2.base,
    backgroundColor: onlyIcon ? theme.palette.main.primary1[100] : theme.palette.blacks.transparent,
  },
  '&:active': {
    color: theme.palette.main.primary1.base,
    backgroundColor: onlyIcon ? theme.palette.main.primary1[200] : theme.palette.blacks.transparent,
  },
  '&:disabled': {
    color: theme.palette.blacks.disabled,
    svg: { fill: theme.palette.blacks.disabled },
  },
});

const ghostBlueStyle: CssIconFunc = (onlyIcon) => ({
  backgroundColor: theme.palette.blacks.transparent,
  color: theme.palette.main.primary1.base,
  '&:hover': {
    color: theme.palette.main.primary1[900],
    backgroundColor: onlyIcon ? theme.palette.main.primary1[100] : theme.palette.blacks.transparent,
  },
  '&:hover svg': {
    fill: theme.palette.main.primary1[900],
    backgroundColor: onlyIcon ? theme.palette.main.primary1[100] : theme.palette.blacks.transparent,
  },
  '&:active': {
    color: theme.palette.main.primary2.base,
    backgroundColor: onlyIcon ? theme.palette.main.primary1[200] : theme.palette.blacks.transparent,
  },
  '&:disabled': {
    color: theme.palette.main.primary1[200],
    svg: { fill: theme.palette.main.primary1[200] },
  },
});

const ghostBlueSecondStyle: CssIconFunc = (onlyIcon) => ({
  background: theme.palette.blacks.transparent,
  color: theme.palette.main.primary1.base,
  '&:hover': {
    color: theme.palette.main.primary1[900],
  },
  '&:hover svg': {
    color: theme.palette.main.primary1[900],
    backgroundColor: onlyIcon ? theme.palette.main.primary1[100] : theme.palette.blacks.transparent,
  },
  '&:active': {
    color: theme.palette.main.primary2.base,
    backgroundColor: onlyIcon ? theme.palette.main.primary1[200] : theme.palette.blacks.transparent,
  },
  '&:disabled': {
    color: theme.palette.main.primary1[200],
  },
});

const ghostRedStyle: CssIconFunc = (onlyIcon) => ({
  backgroundColor: theme.palette.blacks.transparent,
  color: theme.palette.text.error,
  '&:hover': {
    color: theme.palette.additional.red[700],
    backgroundColor: onlyIcon ? theme.palette.additional.red[100] : theme.palette.blacks.transparent,
  },
  '&:hover svg': {
    fill: theme.palette.additional.red[700],
    backgroundColor: onlyIcon ? theme.palette.additional.red[100] : theme.palette.blacks.transparent,
  },
  '&:active': {
    color: theme.palette.additional.red[800],
    backgroundColor: onlyIcon ? theme.palette.additional.red[200] : theme.palette.blacks.transparent,
  },
  '&:disabled': {
    color: theme.palette.additional.red[200],
    svg: { fill: theme.palette.additional.red[200] },
  },
});

export const StyledButton = styled('button')<{
  size: ButtonProps['size'];
  variant?: ButtonProps['variant'];
  onlyIcon: boolean;
  onlyLabel: boolean;
  iconAndLabel: boolean;
  isComboButton: boolean;
}>(({ size, variant = 'primary', onlyIcon, onlyLabel, iconAndLabel, isComboButton }) => ({
  padding: calcPadding({ onlyLabel, onlyIcon, isComboButton, theme, size }),
  ...baseStyle(theme),
  ...(variant === 'primary' && primaryStyle(theme)),
  ...(variant === 'secondary' && secondaryStyle(theme)),
  ...(variant === 'danger' && dangerStyle(theme)),
  ...(variant === 'ghostBlack' && ghostBlackStyle(theme, onlyIcon)),
  ...(variant === 'ghostBlue' && ghostBlueStyle(theme, onlyIcon)),
  ...(variant === 'ghostBlueText' && ghostBlueSecondStyle(theme, onlyIcon)),
  ...(variant === 'ghostRed' && ghostRedStyle(theme, onlyIcon)),
  ...(size === 'small' && {
    height: theme.gutters.base * 4,
    lineHeight: theme.gutters.base * 4 + 'px',
    width: onlyIcon ? theme.gutters.base * 4 : 'initial',
  }),
  ...(size === 'smallTrial' && {
    height: theme.gutters.base * 4,
    lineHeight: theme.gutters.base * 4 + 'px',
    width: '94px',
    padding: '0 24px',
  }),
  ...(size === 'medium' && {
    height: theme.gutters.base * 5,
    lineHeight: theme.gutters.base * 5 + 'px',
    width: onlyIcon ? theme.gutters.base * 5 : 'initial',
  }),
  ...(size === 'large' && {
    height: theme.gutters.base * 6,
    lineHeight: theme.gutters.base * 6 + 'px',
    width: onlyIcon ? theme.gutters.base * 6 : 'initial',
  }),
  ...(iconAndLabel && {
    gap: theme.gutters.base,
    ...(size == 'medium' && {
      gap: theme.gutters.base * 1.5,
    }),
  }),
  ...(isComboButton && {
    '>span': {
      position: 'absolute',
      right: '0',
      height: '100%',
      width: theme.gutters.base * 4.5,
      borderLeft: `1px solid ${theme.palette.text.contrast}`,
      ...(size === 'large' && {
        width: theme.gutters.base * 5.5,
      }),
      ...(variant === 'secondary' && {
        borderLeft: `1px solid ${theme.palette.main.primary1.base}`,
      }),
    },
  }),
}));

export const IconButton: React.FunctionComponent<ButtonProps> = () => {
  return <div>Foo</div>;
};

export const PlusButton: React.FunctionComponent<Pick<ButtonProps, 'size' | 'variant' | 'onClick'>> = ({
  size,
  variant,
  onClick,
}) => {
  return <Button {...{ size, variant, onClick, icon: <div>+</div> }} />;
};

export const LoadingButton: React.FunctionComponent<Pick<ButtonProps, 'label' | 'size' | 'variant' | 'onClick'>> = ({
  label,
  size,
  variant,
  onClick,
}) => {
  return <Button {...{ label, size, variant, onClick, icon: <div>#</div> }} />;
};

const IconInsideButton = styled('div')(() => ({
  ...flexCenterCenter,
}));

export const Button: React.FunctionComponent<ButtonProps> = ({
  comboClick,
  onClick,
  variant,
  icon,
  label,
  size = 'small',
  type,
  disabled,
}) => {
  const onlyIcon = Boolean(icon && !label);
  const onlyLabel = Boolean(!icon && label && !comboClick);
  const iconAndLabel = Boolean(icon && label);
  const isComboButton = Boolean(comboClick);
  return (
    <StyledButton
      {...{
        onClick,
        size,
        variant,
        onlyIcon,
        onlyLabel,
        iconAndLabel,
        type,
        isComboButton,
        disabled,
      }}
    >
      <IconInsideButton>{icon}</IconInsideButton>
      <div>{label}</div>
      {isComboButton && <span {...{ onClick: comboClick }}>+</span>}
    </StyledButton>
  );
};

export default Button;

function calcPadding({
  onlyIcon,
  onlyLabel,
  isComboButton,
  theme,
  size,
}: {
  size: ButtonProps['size'];
  onlyLabel: boolean;
  onlyIcon: boolean;
  isComboButton: boolean;
  theme: Theme;
}) {
  const guttersMultiplier = size === 'small' ? 3 : size === 'medium' ? 4 : 6;

  if (onlyIcon) return 0;
  else if (onlyLabel) {
    return `0 ${theme.gutters.base * guttersMultiplier}px`;
  } else if (isComboButton) {
    const guttersMultiplyerRight = size === 'small' ? 6.75 : size === 'medium' ? 7.75 : 9.625;
    return `0 ${theme.gutters.base * guttersMultiplyerRight}px 0 ${theme.gutters.base * guttersMultiplier}px`;
  } else {
    const guttersMultiplyerLeft = size === 'small' ? 2 : size === 'medium' ? 3 : 5;
    return `0 ${theme.gutters.base * guttersMultiplier}px 0 ${theme.gutters.base * guttersMultiplyerLeft}px`;
  }
}
