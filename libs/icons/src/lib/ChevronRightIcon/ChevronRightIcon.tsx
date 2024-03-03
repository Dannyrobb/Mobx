import * as React from 'react';
import { SvgIcon, SVGIconProps } from '../SvgIcon/SvgIcon';

export interface ChevronRightIconProps extends SVGIconProps {}

export const ChevronRightIcon: React.FunctionComponent<ChevronRightIconProps> = (props) => {
  return (
    <SvgIcon {...{ width: 16, height: 16, viewBox: '0 0 32 32', ...props }}>
      <rect id="ChevronRightIcon" fill="none" width="32" height="32" />
      <polygon points="22,16 12,26 10.6,24.6 19.2,16 10.6,7.4 12,6 " />
    </SvgIcon>
  );
};
