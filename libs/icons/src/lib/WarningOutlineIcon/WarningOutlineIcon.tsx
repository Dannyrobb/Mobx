import * as React from 'react';
import { SvgIcon, SVGIconProps } from '../SvgIcon/SvgIcon';

export interface WarningOutlineIconProps extends SVGIconProps {}

export const WarningOutlineIcon: React.FunctionComponent<WarningOutlineIconProps> = (props) => {
  return (
    <SvgIcon {...{ width: 32, height: 32, viewBox: '0 0 32 32', ...props }}>
      <path
        d="M16,2A14,14,0,1,0,30,16,14,14,0,0,0,16,2Zm0,26A12,12,0,1,1,28,16,12,12,0,0,1,16,28Z"
        transform="translate(0 0)"
      />
      <rect x="15" y="8" width="2" height="11" />
      <path d="M16,22a1.5,1.5,0,1,0,1.5,1.5A1.5,1.5,0,0,0,16,22Z" transform="translate(0 0)" />
      <rect fill="none" width="32" height="32" />
    </SvgIcon>
  );
};
