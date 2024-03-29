import * as React from 'react';
import { SvgIcon, SVGIconProps } from '../SvgIcon/SvgIcon';

export interface CustomerIdentityIconProps extends SVGIconProps {}

export const CustomerIdentityIcon: React.FunctionComponent<CustomerIdentityIconProps> = (props) => {
  return (
    <SvgIcon {...{ width: 16, height: 16, viewBox: '0 0 32 32', ...props }}>
      <rect id="CustomerIdentityIcon" fill="none" width="32" height="32" />
      <path d="M22,11h4a1,1,0,0,1,1,1v2a0,0,0,0,1,0,0H21a0,0,0,0,1,0,0V12A1,1,0,0,1,22,11Z" />
      <circle cx="24" cy="8" r="2" />
      <path
        d="M30,18H18a2.0023,2.0023,0,0,1-2-2V4a2.002,2.002,0,0,1,2-2H30a2.0023,2.0023,0,0,1,2,2V16A2.0027,2.0027,0,0,1,30,18ZM18,4V16H30.001L30,4Z"
        transform="translate(0 0)"
      />
      <path
        d="M15,30H13V26a2.9465,2.9465,0,0,0-3-3H6a2.9465,2.9465,0,0,0-3,3v4H1V26a4.9514,4.9514,0,0,1,5-5h4a4.9514,4.9514,0,0,1,5,5Z"
        transform="translate(0 0)"
      />
      <path d="M8,11a3,3,0,0,1,0,6,3,3,0,0,1,0-6M8,9A5,5,0,0,0,8,19,5,5,0,0,0,8,9Z" transform="translate(0 0)" />
    </SvgIcon>
  );
};
