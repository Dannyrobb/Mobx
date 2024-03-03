import * as React from 'react';
import { SvgIcon, SVGIconProps } from '../SvgIcon/SvgIcon';

export interface ChevronUpIconProps extends SVGIconProps {}

export const ChevronUpIcon: React.FunctionComponent<ChevronUpIconProps> = (props) => {
  return (
    <SvgIcon {...{ height: 16, width: 16, viewBox: '0 0 32 32', ...props }}>
      <rect id="ChevronUpIcon" fill="none" width="32" height="32" />
      <polygon points="16,10 26,20 24.6,21.4 16,12.8 7.4,21.4 6,20 " />
    </SvgIcon>
  );
};
