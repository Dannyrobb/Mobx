import * as React from 'react';
import { SvgIcon, SVGIconProps } from '../SvgIcon/SvgIcon';

export interface WarningFilledProps extends SVGIconProps {}

export const WarningFilledIcon: React.FunctionComponent<WarningFilledProps> = (props) => {
  return (
    <SvgIcon {...{ width: 16, height: 16, viewBox: '0 0 16 16', ...props }}>
      <rect id="Transparent_Rectangle" fill="none" width="16" height="16" />
      <path
        id="Compound_Path"
        d="M8,1C4.2,1,1,4.2,1,8s3.2,7,7,7s7-3.1,7-7S11.9,1,8,1z M7.5,4h1v5h-1C7.5,9,7.5,4,7.5,4z M8,12.2
            c-0.4,0-0.8-0.4-0.8-0.8s0.3-0.8,0.8-0.8c0.4,0,0.8,0.4,0.8,0.8S8.4,12.2,8,12.2z"
      />
      <path
        id="inner-path"
        opacity="0"
        d="M7.5,4h1v5h-1C7.5,9,7.5,4,7.5,4z M8,12.2c-0.4,0-0.8-0.4-0.8-0.8s0.3-0.8,0.8-0.8
            c0.4,0,0.8,0.4,0.8,0.8S8.4,12.2,8,12.2z"
      />
    </SvgIcon>
  );
};
