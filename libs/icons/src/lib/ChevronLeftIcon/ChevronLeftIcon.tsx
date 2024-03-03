import * as React from 'react';
import { SvgIcon, SVGIconProps } from '../SvgIcon/SvgIcon';

export interface ChevronDownIconProps extends SVGIconProps {}

export const ChevronLeftIcon: React.FunctionComponent<ChevronDownIconProps> = (props) => {
  return (
    <SvgIcon {...{ width: 16, height: 16, viewBox: '0 0 32 32', ...props }}>
      <rect id="chevronLeftIcon" fill="none" width="32" height="32" />
      <polygon points="10,16 20,6 21.4,7.4 12.8,16 21.4,24.6 20,26 " />
    </SvgIcon>
  );
};
