import * as React from 'react';
import { SvgIcon, SVGIconProps } from '../SvgIcon/SvgIcon';

export interface ChevronDownIconProps extends SVGIconProps {}

export const ChevronDownIcon: React.FunctionComponent<ChevronDownIconProps> = (props) => {
  return (
    <SvgIcon {...{ width: 16, height: 16, viewBox: '0 0 32 32', ...props }}>
      <polygon points="16,22 6,12 7.4,10.6 16,19.2 24.6,10.6 26,12 " />
      <rect id="_x3C_Transparent_Rectangle_x3E_" fill="none" width="32" height="32" />
    </SvgIcon>
  );
};
