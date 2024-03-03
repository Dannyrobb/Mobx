import React from 'react';

import { flexStartCenter, theme } from '@cellxpert/theme';
import styled from '@emotion/styled';

export interface ToggleProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /**
   * @default large
   */
  variant?: 'small' | 'large';

  label?: string;

  onClick?: React.MouseEventHandler<HTMLInputElement>;
}

export const ToggleElement = styled('label')<Pick<ToggleProps, 'variant' | 'disabled'>>(({ variant, disabled }) => ({
  display: 'inline-block',
  width: 48,
  height: 24,
  borderRadius: 24,
  position: 'relative',
  cursor: 'pointer',
  backgroundColor: theme.palette.additional.grey[500],
  transition: 'border-color 300ms',
  ...(variant === 'small' && {
    width: 32,
    height: 16,
  }),
  ...(disabled && {
    backgroundColor: theme.palette.additional.grey[100],
  }),
}));

export const Checkbox = styled('input')<Pick<ToggleProps, 'variant' | 'disabled' | 'checked'>>(
  ({ variant, disabled, checked }) => ({
    position: 'absolute',
    clip: 'rect(0,0,0,0)',
    '& + .toggle-button': {
      height: 'inherit',
      borderRadius: 24,
      '::before': {
        content: '""',
        cursor: 'pointer',
        display: 'inline-block',
        margin: 3,
        width: 18,
        height: 18,
        borderRadius: 18,
        backgroundColor: theme.palette.text.contrast,
        transition: 'all 300ms ease-in-out',
        ...(variant === 'small' && {
          width: 10,
          height: 10,
        }),
        ...(disabled && {
          backgroundColor: theme.palette.additional.grey[400],
        }),
      },
    },
    '&:checked + .toggle-button': {
      backgroundColor: theme.palette.additional.green[400],
      '::before': {
        marginLeft: 27,
        ...(variant === 'small' && {
          marginLeft: 19,
          ...(checked && {
            background: `url('data:image/svg+xml;charset=UTF-8, <svg fill="green" xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" width="10" height="10" viewBox="0 0 10 10">  <polygon points="4.24026838 5.22985917 6.9245029 2.5 8 3.61170839 4.23836036 7.5 2 5.18627549 3.06115382 4.01104459"/>  <rect width="10" height="10" fill="none"/></svg>')`,
            backgroundColor: theme.palette.text.contrast,
          }),
        }),
        ...(disabled && {
          backgroundColor: theme.palette.additional.grey[400],
          background: theme.palette.additional.grey[400],
        }),
      },
      ...(disabled && {
        backgroundColor: theme.palette.additional.grey[100],
      }),
    },
  })
);

export const VisualCheckbox = styled('div')(() => ({}));

export const ToggleLabel = styled('div')<Pick<ToggleProps, 'disabled'>>(({ disabled }) => ({
  ...(disabled && {
    color: theme.palette.text.disabled,
  }),
}));

export const ToggleWrapper = styled('div')(() => ({
  ...flexStartCenter,
  ...theme.typography.meta.body2,
  gap: theme.gutters.base,
}));

export const Toggle: React.FunctionComponent<ToggleProps> = ({
  variant = 'large',
  checked,
  disabled,
  label,
  onClick,
}) => {
  return (
    <ToggleWrapper>
      <ToggleElement {...{ variant, disabled }}>
        <Checkbox {...{ type: 'checkbox', variant, disabled, checked, onClick }} />
        <VisualCheckbox {...{ className: 'toggle-button' }} />
      </ToggleElement>
      <ToggleLabel {...{ disabled }}>{label} </ToggleLabel>
    </ToggleWrapper>
  );
};
