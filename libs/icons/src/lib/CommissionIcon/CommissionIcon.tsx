import * as React from 'react';
import { SvgIcon, SVGIconProps } from '../SvgIcon/SvgIcon';

export interface CommissionIconProps extends SVGIconProps {}

export const CommissionIcon: React.FunctionComponent<CommissionIconProps> = (props) => {
  return (
    <SvgIcon {...{ width: 16, height: 16, viewBox: '0 0 32 32', ...props }}>
      <rect id="commissionIcon" fill="none" width="32" height="32" />
      <path d="M9,14a5,5,0,1,1,5-5A5.0055,5.0055,0,0,1,9,14ZM9,6a3,3,0,1,0,3,3A3.0033,3.0033,0,0,0,9,6Z" />
      <rect x="0.0293" y="15.0001" width="31.9413" height="1.9998" transform="translate(-6.6274 16) rotate(-45)" />
      <path d="M23,28a5,5,0,1,1,5-5A5.0055,5.0055,0,0,1,23,28Zm0-8a3,3,0,1,0,3,3A3.0033,3.0033,0,0,0,23,20Z" />
    </SvgIcon>
  );
};
