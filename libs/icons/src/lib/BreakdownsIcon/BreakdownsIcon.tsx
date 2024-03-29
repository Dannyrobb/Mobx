import * as React from 'react';
import { SvgIcon, SVGIconProps } from '../SvgIcon/SvgIcon';

export interface BreakdownsIconProps extends SVGIconProps {}

export const BreakdownsIcon: React.FunctionComponent<BreakdownsIconProps> = (props) => {
  return (
    <SvgIcon {...{ width: 32, height: 32, viewBox: '0 0 32 32', ...props }}>
      <rect x="14" y="25" width="14" height="2" />
      <polygon points="7.17 26 4.59 28.58 6 30 10 26 6 22 4.58 23.41 7.17 26" />
      <rect x="14" y="15" width="14" height="2" />
      <polygon points="7.17 16 4.59 18.58 6 20 10 16 6 12 4.58 13.41 7.17 16" />
      <rect x="14" y="5" width="14" height="2" />
      <polygon points="7.17 6 4.59 8.58 6 10 10 6 6 2 4.58 3.41 7.17 6" />
    </SvgIcon>
  );
};
