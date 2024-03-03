import * as React from 'react';

import { CheckboxFilledIcon, CheckboxEmptyIcon, WarningFilledIcon } from '@cellxpert/icons';
import { flexStartCenter, theme, Theme } from '@cellxpert/theme';
import { Typography } from '@cellxpert/ui-lib';
import styled from '@emotion/styled';

export interface CheckboxProps {
  label?: string;

  disabled?: boolean;

  onClick?: (e: React.MouseEvent) => void;

  checked: boolean;

  loading?: boolean;

  tabIndex?: number;

  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;

  singleError?: string | boolean; //if string will show message under the checkbox wrap the checkbox and label with the error, if boolean will wrap the checkbox and label with the error

  multipleErrors?: string;

  dataValue?: string;

  name?: string;
}

//The whole checkbox container (the hidden original and the custom one)
const CheckboxContainer = styled('label')(() => ({
  display: 'flex',
  position: 'relative',
  verticalAlign: 'middle',
  ':hover': {
    cursor: 'pointer',
  },
}));

//Hides the original checkbox and screen readers still recognize it
const HiddenCheckbox = styled('input')<Pick<CheckboxProps, 'disabled' | 'loading'>>(({ disabled, loading }) => ({
  border: 0,
  opacity: 0,
  padding: 0,
  position: 'absolute',
  whiteSpace: 'nowrap',
  top: 0,
  bottom: 0,
  right: 0,
  left: 0,
  ':focus + span': {
    boxShadow: `
    0px 0px 0px 2px #126AEC`,
  },
  ':hover': {
    cursor: 'pointer',
  },
  ...(disabled && {
    fill: theme.palette.additional.grey[400],
  }),
  ...(loading && {
    ':focus + span': {
      boxShadow: `
      0px 0px 0px 1px ${theme.palette.additional.grey[300]}, 
      0px 0px 0px 2px #126AEC`,
    },
  }),
}));

//This is the customized checkbox taking the boolean of checked to shift the backgrounds
const StyledCheckbox = styled('span')<{ checked?: boolean } & Pick<CheckboxProps, 'disabled' | 'loading' | 'label'>>(
  ({ checked, disabled, loading }) => ({
    height: 20,
    ':hover': {
      cursor: 'pointer',
    },
    svg: {
      fill: checked ? theme.palette.blacks.grey : theme.palette.main.primary1.base,
    },
    ...(disabled && {
      pointerEvents: 'none',
      svg: {
        fill: theme.palette.additional.grey[400],
      },
    }),
    ...(loading && {
      backgroundColor: `${theme.palette.additional.grey[300]}`,
      boxShadow: `0px 0px 0px 1px ${theme.palette.additional.grey[300]}`,
    }),
  })
);

const CheckboxLabel = styled('label')<Pick<CheckboxProps, 'loading'>>(({ loading }) => ({
  ...theme.typography.meta.body2,
  // color: theme.palette.main.primary1.base,
  marginLeft: '8px',
  ...(loading && {
    backgroundColor: `${theme.palette.additional.grey[300]}`,
    color: `${theme.palette.additional.grey[300]}`,
  }),
}));

const CheckboxWrapper = styled('div')<Pick<CheckboxProps, 'disabled' | 'loading' | 'singleError'>>(
  ({ loading, disabled, singleError }) => ({
    margin: `0 ${theme.gutters.base * 0.5}px `,
    height: theme.gutters.base * 2.75,
    width: 'max-content',
    ...flexStartCenter,
    ...((loading || disabled) && {
      pointerEvents: 'none',
    }),
    ...(singleError && {
      boxShadow: `0px 0px 0px 2px ${theme.palette.text.error};`,
    }),
  })
);

const WarningIconWrapper = styled('span')<Pick<CheckboxProps, 'multipleErrors'>>(({ multipleErrors }) => ({
  marginLeft: theme.gutters.base * 1,
  marginRight: theme.gutters.base * 0.375,
  display: 'flex',
  ...(multipleErrors && {
    marginLeft: theme.gutters.base * 1,
  }),
}));

const ErrorMessageWrap = styled('div')<
  Pick<CheckboxProps, 'singleError' | 'disabled' | 'loading' | 'singleError' | 'multipleErrors'>
>(({ singleError }) => ({
  ...theme.typography.meta.caption,
  color: theme.palette.indicators.error,
  marginLeft: theme.gutters.base * 0.875,
  ...(singleError && {
    marginTop: theme.gutters.base * 0.5,
  }),
}));

export const Checkbox: React.FunctionComponent<CheckboxProps> = ({
  label,
  tabIndex,
  dataValue,
  checked,
  disabled,
  onChange,
  loading,
  singleError,
  multipleErrors,
  name,
}) => {
  return (
    <div>
      <CheckboxWrapper {...{ loading, disabled, singleError, checked }}>
        <CheckboxContainer>
          <HiddenCheckbox
            {...{
              type: 'checkbox',
              checked,
              dataValue: dataValue,
              tabIndex,
              onChange,
              loading,
              disabled,
              name,
            }}
          />
          <StyledCheckbox onChange={onChange} {...{ loading, checked, disabled }}>
            {checked ? (
              <CheckboxFilledIcon {...{ height: 20, width: 20 }} />
            ) : (
              <CheckboxEmptyIcon {...{ height: 20, width: 20 }} />
            )}
          </StyledCheckbox>
        </CheckboxContainer>
        <CheckboxLabel {...{ loading }}>{label}</CheckboxLabel>
        {singleError && (
          <WarningIconWrapper>
            <WarningFilledIcon
              {...{
                color: 'error',
                width: 14,
                height: 14,
              }}
            />
          </WarningIconWrapper>
        )}
      </CheckboxWrapper>
      {singleError ? (
        <ErrorMessageWrap {...{ singleError }}>{singleError ? singleError : null}</ErrorMessageWrap>
      ) : null}
      {multipleErrors ? (
        <WarningIconWrapper {...{ multipleErrors }}>
          <WarningFilledIcon {...{ color: 'error', width: 14, height: 14 }} />
          <ErrorMessageWrap>{multipleErrors ? multipleErrors : null}</ErrorMessageWrap>
        </WarningIconWrapper>
      ) : null}
    </div>
  );
};

export default Checkbox;
