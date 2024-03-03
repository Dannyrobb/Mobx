import * as React from 'react';

import styled from '@emotion/styled';
import { Typography } from '@cellxpert/ui-lib';
import { FormattedNumber } from 'react-intl';

export interface LargeDatasetWithPercentProps {
  value: number;
  change: string;
  isPrimaryColor?: boolean;
  label?: string;
  isCurrency?: boolean;
  maximumFractionDigits?: number;
}

const LineWrapper = styled('div')(() => ({
  display: 'flex',
  gap: 4,
}));

export const LargeDatasetWithPercent: React.FunctionComponent<LargeDatasetWithPercentProps> = ({
  value,
  change,
  isCurrency,
  isPrimaryColor,
  label,
  maximumFractionDigits = 0,
}) => {
  return (
    <>
      <LineWrapper>
        <Typography
          {...{
            color: isPrimaryColor ? 'primary1' : 'main',
            variant: 'h5',
            fontFamilyIndex: 1,
            regular: true,
            style: { lineHeight: 1 },
          }}
        >
          <FormattedNumber
            {...{ value, maximumFractionDigits }}
            {...(isCurrency && { currency: 'USD', style: 'currency' })}
          ></FormattedNumber>
        </Typography>
        <Typography {...{ color: 'success', variant: 'caption' }}>
          <FormattedNumber
            {...{ value, maximumFractionDigits }}
            {...(isCurrency && { currency: 'USD', style: 'currency' })}
          ></FormattedNumber>
        </Typography>
      </LineWrapper>
    </>
  );
};

export default LargeDatasetWithPercent;
