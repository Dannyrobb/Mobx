import * as React from 'react';
import { SvgIcon, SVGIconProps } from '../SvgIcon/SvgIcon';

export interface IdentificationIconProps extends SVGIconProps {}

export const IdentificationIcon: React.FunctionComponent<IdentificationIconProps> = (props) => {
  return (
    <SvgIcon {...{ width: 16, height: 16, viewBox: '0 0 32 32', ...props }}>
      <path d="M28,6V26H4V6H28m0-2H4A2,2,0,0,0,2,6V26a2,2,0,0,0,2,2H28a2,2,0,0,0,2-2V6a2,2,0,0,0-2-2Z" />
      <rect x="6" y="10" width="7" height="2" />
      <rect x="6" y="14" width="4" height="2" />
      <path d="M23,18H17a3,3,0,0,0-3,3v2h2V21a1,1,0,0,1,1-1h6a1,1,0,0,1,1,1v2h2V21A3,3,0,0,0,23,18Z" />
      <path d="M20,17a4,4,0,1,0-4-4A4,4,0,0,0,20,17Zm0-6a2,2,0,1,1-2,2A2,2,0,0,1,20,11Z" />
    </SvgIcon>
  );
};
