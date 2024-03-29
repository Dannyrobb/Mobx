import * as React from 'react';
import { SvgIcon, SVGIconProps } from '../SvgIcon/SvgIcon';

export interface TransactionsIconProps extends SVGIconProps {}

export const TransactionsIcon: React.FunctionComponent<TransactionsIconProps> = (props) => {
  return (
    <SvgIcon {...{ width: 16, height: 16, viewBox: '0 0 32 32', ...props }}>
      <rect id="transactionIcon" fill="none" width="32" height="32" transform="translate(32) rotate(90)" />
      <polygon points="11.41 26.59 7.83 23 28 23 28 21 7.83 21 11.41 17.41 10 16 4 22 10 28 11.41 26.59" />
      <polygon points="28 10 22 4 20.59 5.41 24.17 9 4 9 4 11 24.17 11 20.59 14.59 22 16 28 10" />
    </SvgIcon>
  );
};
