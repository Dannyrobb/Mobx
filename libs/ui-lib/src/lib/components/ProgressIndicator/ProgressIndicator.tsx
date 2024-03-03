import * as React from 'react';

import { CheckedOutlineIcon, WarningOutlineIcon } from '@cellxpert/icons';
import { flexCenterStart, flex, theme } from '@cellxpert/theme';
import styled from '@emotion/styled';

export interface ProgressIndicatorProps {
  /**
   *  @default 'vertical'
   */
  type?: 'vertical' | 'horizontal';
  steps: ProgressStep[];
}

export interface ProgressStep {
  key: string;
  title: string;
  label?: string;
  isCurrent: boolean;
  hasError: boolean;
  /**
   *  @default false
   */
  disabled?: boolean;
}

const Container = styled('div')<{ isVertical: boolean }>(({ isVertical }) => ({
  ...flexCenterStart,
  ...(isVertical && {
    flexDirection: 'column',
  }),
}));

const IconWrapper = styled('div')<
  {
    isComplete: boolean;
    isVertical: boolean;
  } & Pick<ProgressStep, 'hasError' | 'isCurrent' | 'disabled'>
>(({ isComplete, isVertical, hasError, isCurrent, disabled }) => ({
  fill: theme.palette.main.primary1.base,
  marginLeft: 9,
  ...(!isComplete &&
    !hasError && {
      borderRadius: 8,
      width: 14,
      height: 14,
      margin: 1,
      ...(isVertical && {
        margin: '1px 1px 1px 10px',
      }),
    }),
  ...(isCurrent && {
    backgroundColor: theme.palette.main.primary1.base,
  }),
  ...(!isCurrent &&
    !isComplete &&
    !hasError && {
      border: `1px solid ${theme.palette.additional.grey[800]}`,
      ...(disabled && {
        border: `1px solid ${theme.palette.additional.grey[400]}`,
      }),
    }),
  ...(hasError && {
    fill: theme.palette.text.error,
  }),
}));
const TitleWrapper = styled('div')<{
  hasLabel: boolean;
}>(({ hasLabel }) => ({
  ...(!hasLabel && {
    paddingBottom: 16,
  }),
}));

const LabelWrapper = styled('div')(() => ({
  ...theme.typography.meta.caption,
}));

const Step = styled('div')<
  {
    isCurrent: boolean;
    isComplete: boolean;
  } & Pick<ProgressIndicatorProps, 'type'> &
    Pick<ProgressStep, 'disabled'>
>(({ isCurrent, isComplete, type, disabled }) => ({
  ...theme.typography.meta.body2,
  ...flex,
  lineHeight: '16px',
  borderWidth: 0,
  borderColor: theme.palette.blacks.border,
  borderStyle: 'solid',
  gap: 9,
  ...(type === 'vertical' && {
    borderLeftWidth: 2,
    paddingBottom: theme.gutters.base * 3,
  }),
  ...(type === 'horizontal' && {
    flex: '1 1 0px',
    paddingTop: 9,
    paddingRight: theme.gutters.base * 2,
    borderTopWidth: 2,
  }),
  ...((isCurrent || isComplete) && {
    borderColor: theme.palette.main.primary1.base,
  }),
  ...(disabled && {
    color: theme.palette.additional.grey[400],
  }),
}));

export const ProgressIndicator: React.FunctionComponent<ProgressIndicatorProps> = ({ type, steps }) => {
  const currentIndex = steps.findIndex((step) => step.isCurrent);
  const isVertical = Boolean(type === 'vertical');
  return (
    <Container {...{ isVertical }}>
      {steps.map((step, ind) => {
        return (
          <Step
            {...{
              type,
              key: step.key,
              isCurrent: step.isCurrent,
              isComplete: ind < currentIndex,
              disabled: step.disabled,
            }}
          >
            <IconWrapper
              {...{
                isCurrent: step.isCurrent,
                isComplete: ind < currentIndex,
                isVertical,
                hasError: step.hasError,
                disabled: step.disabled,
              }}
            >
              {ind < currentIndex && !step.hasError && <CheckedOutlineIcon {...{ width: 16, height: 16 }} />}
              {step.hasError && <WarningOutlineIcon {...{ width: 16, height: 16 }} />}
            </IconWrapper>
            <div>
              <TitleWrapper {...{ hasLabel: !!step.label }}>{step.title}</TitleWrapper>
              <LabelWrapper>{step.label}</LabelWrapper>
            </div>
          </Step>
        );
      })}
    </Container>
  );
};

export default ProgressIndicator;
