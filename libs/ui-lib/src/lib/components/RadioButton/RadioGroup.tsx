import * as React from 'react';
import { theme } from '@cellxpert/theme';
import styled from '@emotion/styled';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { RadioButton, Typography } from '@cellxpert/ui-lib';

export interface RadioGroupProps {
  radioButtons: Array<{ label: string; value: string }>;
  heading?: string;
  disabled?: boolean;
  loading?: boolean;
  orientation?: 'horizontal' | 'vertical';
}

const RadioWrapper = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.gutters.base,
});

const RadioGroupWithoutHeader = styled(RadioGroupPrimitive.Root)<
  Pick<React.ComponentProps<typeof RadioGroupPrimitive.Root>, 'orientation'>
>(({ orientation }) => ({
  display: 'inline-flex',
  flexDirection: orientation === 'vertical' ? 'column' : 'row',
  gap: orientation === 'vertical' ? theme.gutters.base : theme.gutters.base * 2,
}));

export const RadioGroup: React.FC<RadioGroupProps> = ({
  disabled,
  orientation = 'vertical',
  loading,
  radioButtons,
  heading,
}) => {
  return (
    <RadioWrapper>
      {heading ? (
        <Typography {...{ component: 'span', variant: 'caption', color: 'dark' }}>{heading}</Typography>
      ) : null}
      <RadioGroupWithoutHeader orientation={orientation}>
        {radioButtons.map((radio, index) => {
          return (
            <RadioButton
              {...{ value: radio.value, label: radio.label, disabled, loading, key: index, orientation: orientation }}
            />
          );
        })}
      </RadioGroupWithoutHeader>
    </RadioWrapper>
  );
};

export default RadioGroup;
