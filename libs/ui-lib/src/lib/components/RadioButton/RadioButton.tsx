import * as React from 'react';
import { flexCenterCenter, flexStartCenter, theme } from '@cellxpert/theme';
import styled from '@emotion/styled';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import SkeletonBox from '../SkeletonBox/SkeletonBox';

export interface RadioButtonProps {
  label: string;
  value: string;
  disabled?: boolean;
  loading?: boolean;
  orientation?: 'horizontal' | 'vertical';
}

const RadioButtonWrapper = styled('div')<Pick<RadioButtonProps, 'loading' | 'orientation'>>({
  ...flexStartCenter,
  gap: theme.gutters.base,
});

const StyledRadio = styled(RadioGroupPrimitive.Item)<Pick<RadioButtonProps, 'disabled' | 'loading'>>(
  ({ disabled, loading }) => ({
    all: 'unset',
    backgroundColor: 'white',
    width: 14,
    height: 14,
    borderRadius: '100%',
    boxShadow: `0 0 0 2px ${theme.palette.text.main}`,
    '&:hover': { cursor: 'pointer' },
    '&:focus': {
      boxShadow: `
        0 0 0 2px ${theme.palette.text.main},
        0 0 0 4px ${theme.palette.main.primary1.base}
      `,
    },
    ...(disabled && {
      boxShadow: `0 0 0 2px ${theme.palette.text.disabled}`,
    }),
    ...(loading && {
      pointerEvents: 'none',
    }),
  })
);

const StyledIndicator = styled(RadioGroupPrimitive.Indicator)<Pick<RadioButtonProps, 'disabled'>>(({ disabled }) => ({
  ...flexCenterCenter,
  width: '100%',
  height: '100%',
  position: 'relative',
  '&::after': {
    content: '""',
    display: 'block',
    width: 6,
    height: 6,
    borderRadius: '50%',
    backgroundColor: theme.palette.text.main,
    ...(disabled && {
      backgroundColor: theme.palette.text.disabled,
    }),
  },
}));

const ButtonLabel = styled('label')<Pick<RadioButtonProps, 'disabled'>>(({ disabled }) => ({
  ...theme.typography.meta.body2,
  color: theme.palette.text.main,
  ...(disabled && {
    color: theme.palette.text.disabled,
  }),
}));

export const RadioButton: React.FunctionComponent<RadioButtonProps> = ({
  disabled,
  label,
  loading,
  value,
  orientation,
}) => {
  return (
    <RadioButtonWrapper>
      <StyledRadio {...{ disabled, loading, value: value }}>
        <StyledIndicator {...{ disabled }} />
      </StyledRadio>
      {loading ? (
        <SkeletonBox width={orientation === 'horizontal' && loading ? 100 : '100%'} height={16} />
      ) : (
        <ButtonLabel {...{ disabled }}>{label}</ButtonLabel>
      )}
    </RadioButtonWrapper>
  );
};

export default RadioButton;
