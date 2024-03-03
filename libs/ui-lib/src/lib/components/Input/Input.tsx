import * as React from 'react';

import { WarningFilledIcon } from '@cellxpert/icons';
import { theme } from '@cellxpert/theme';
import styled from '@emotion/styled';

export interface InputProps {
  /**
   * What size should it be?
   * @default small
   */
  howBig?: 'small' | 'medium' | 'large';

  label?: string;

  placeholder?: string;

  helper?: string;

  error?: string;

  password?: boolean;

  disabled?: boolean;

  loading?: boolean;

  type: 'text' | 'password' | 'number';

  icon?: React.ReactNode;

  autoComplete?: 'username' | 'current-password' | 'new-password';

  tabindex?: number;

  value: HTMLInputElement['value'];

  onChange: React.ChangeEventHandler<HTMLInputElement>;

  /**
   * Doesn't allow edit and display is a bit different
   */
  readOnly?: boolean;
}

export const LabelWrap = styled('label')<Pick<InputProps, 'label' | 'disabled' | 'loading'>>(
  ({ label, disabled, loading }) => ({
    ...theme.typography.meta.caption,
    display: 'none',
    marginBottom: theme.gutters.base * 1,
    color: theme.palette.text.label,
    ...(label && {
      display: 'inline-block',
    }),
    ...(disabled && {
      color: theme.palette.text.disabled,
    }),
    ...(loading && {
      backgroundColor: theme.palette.additional.grey[300],
      color: theme.palette.additional.grey[300],
    }),
  })
);

const InputWrap = styled('div')<Pick<InputProps, 'disabled'>>(() => ({
  position: 'relative',
}));

const StyledInput = styled('input')<Pick<InputProps, 'error' | 'howBig' | 'disabled' | 'loading' | 'readOnly'>>(
  ({ howBig = 'small', error, disabled, loading, readOnly }) => ({
    ...theme.typography.meta.buttonRegular,
    width: '100%',
    border: 'none',
    boxShadow: `
  -1px 0px 0px 0px ${theme.palette.blacks.border},
  1px 0px 0px 0px ${theme.palette.blacks.border},
  0px -1px 0px 0px ${theme.palette.blacks.border},
  0px 1px 0px 0px ${theme.palette.additional.grey[600]}
  `,
    color: theme.palette.text.main,
    boxSizing: 'border-box',
    height: theme.gutters.base * 4,
    padding: `0 ${theme.gutters.base * 2}px`,
    '::placeholder': {
      color: theme.palette.text.placeholder,
    },
    '&:focus': {
      padding: `0 ${theme.gutters.base * 2 - 1}px`,
      boxShadow: `0px 0px 0px 2px ${theme.palette.main.primary1.base}`,
    },
    ...(disabled && {
      color: theme.palette.text.disabled,
      boxShadow: `
      -1px 0px 0px 0px ${theme.palette.additional.grey[100]},
      1px 0px 0px 0px ${theme.palette.additional.grey[100]},
      0px -1px 0px 0px ${theme.palette.additional.grey[100]},
      0px 1px 0px 0px ${theme.palette.additional.grey[400]}
    `,
      '::placeholder': {
        color: theme.palette.text.disabled,
      },
    }),
    ...(error && {
      boxShadow: `0px 0px 0px 2px ${theme.palette.indicators.error}`,
    }),
    ...(loading && {
      backgroundColor: `${theme.palette.additional.grey[300]}`,
      boxShadow: `0px 0px 0px 1px ${theme.palette.additional.grey[300]}`,
      pointerEvents: 'none',
      '::placeholder': {
        color: theme.palette.additional.grey[300],
      },
    }),
    ...(howBig === 'medium' && {
      height: theme.gutters.base * 5,
    }),
    ...(howBig === 'large' && {
      height: theme.gutters.base * 6,
    }),
    ...(readOnly && {
      border: 'none',
      boxShadow: `
      -1px 0px 0px 0px ${theme.palette.blacks.white},
      1px 0px 0px 0px ${theme.palette.blacks.white},
      0px -1px 0px 0px ${theme.palette.blacks.white},
      0px 1px 0px 0px ${theme.palette.additional.grey[600]}
    `,

      cursor: 'default',
      '&:focus': {
        outline: 'none',
      },
    }),
    // to custom the arrows in the number input
    '::-webkit-inner-spin-button': {
      WebkitAppearance: 'none',
      MozAppearance: 'none',
      appearance: 'none',
      margin: '0',
      cursor: 'pointer',
      display: 'block',
      height: '26px',
      width: '16px',
      backgroundImage: `url("data:image/svg+xml,
      <svg id='Layer_1' data-name='Layer 1' xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 -2 32 37' preserveAspectRatio='xMinYMid'>
      <polygon fill='black' points='24,24 16,32 8,24'/>
      <polygon fill='black' points='8,8 16,0 24,8'/>
      <rect id='_Transparent_Rectangle_' fill='none' data-name='&lt;Transparent Rectangle&gt;' class='cls-1' width='32' height='32'/>
      </svg>")`,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      opacity: 1,
      ...(disabled && {
        opacity: 0.5,
      }),
      ...(loading && {
        pointerEvents: 'none',
        cursor: 'default',
      }),
      ...(error && {
        margin: `0 ${theme.gutters.base * 3.9}px 0 ${theme.gutters.base * 2 - 1}px`,
      }),
    },
  })
);

const IconsWrap = styled('span')<Pick<InputProps, 'error' | 'howBig' | 'disabled' | 'loading' | 'icon'>>(
  ({ error, howBig, disabled, loading, icon }) => ({
    display: 'block',
    position: 'absolute',
    right: theme.gutters.base * 2,
    top: theme.gutters.base,
    border: 'none',
    ...(howBig === 'medium' && {
      top: theme.gutters.base * 1.5,
    }),
    ...(howBig === 'large' && {
      top: theme.gutters.base * 2,
    }),
    ...(disabled && {
      pointerEvents: 'none',
      opacity: 0.5,
    }),
    ...(loading && {
      display: 'none',
      pointerEvents: 'none',
    }),
    ...(icon && {
      cursor: 'pointer',
    }),
    ...(error &&
      icon && {
        width: theme.gutters.base * 5,
        cursor: 'default',
      }),
  })
);

export const MessageWrap = styled('div')<Pick<InputProps, 'error' | 'helper' | 'disabled' | 'loading'>>(
  ({ error, helper, disabled, loading }) => ({
    ...theme.typography.meta.caption,
    marginTop: theme.gutters.base * 0.5,
    color: theme.palette.text.helper,
    display: 'inline-block',
    visibility: 'hidden',
    ...((error || helper) && {
      visibility: 'visible',
      ...(loading && {
        backgroundColor: theme.palette.additional.grey[300],
        color: theme.palette.additional.grey[300],
      }),
    }),
    ...(error && {
      color: theme.palette.indicators.error,
    }),
    ...(disabled && {
      color: theme.palette.text.disabled,
    }),
  })
);

export const Input: React.FunctionComponent<InputProps> = ({
  type,
  howBig,
  error,
  disabled,
  loading,
  placeholder,
  helper,
  label,
  icon,
  autoComplete,
  tabindex,
  value,
  onChange,
  readOnly,
}) => {
  return (
    <div>
      <LabelWrap {...{ label, disabled, loading }}>{label}</LabelWrap>
      <InputWrap {...{ disabled }}>
        <StyledInput
          {...{
            howBig,
            readOnly,
            error,
            disabled,
            loading,
            placeholder: placeholder ?? '',
            type,
            autoComplete,
            tabIndex: tabindex,
            value,
            onChange,
          }}
        />
        {error && (
          <IconsWrap {...{ howBig, error, icon, loading }}>
            <WarningFilledIcon {...{ color: 'error' }} />
          </IconsWrap>
        )}
        {icon && <IconsWrap {...{ howBig, icon, disabled, loading }}>{icon}</IconsWrap>}
      </InputWrap>
      {error || helper ? (
        <MessageWrap {...{ error, helper, disabled, loading }}>{error ? error : helper ? helper : ''}</MessageWrap>
      ) : (
        ''
      )}
    </div>
  );
};

export default Input;
