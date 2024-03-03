import * as React from 'react';
import { SvgIcon, SVGIconProps } from '../SvgIcon/SvgIcon';

export interface StoreIconProps extends SVGIconProps {}

export const StoreIcon: React.FunctionComponent<StoreIconProps> = (props) => {
  return (
    <SvgIcon {...{ width: 16, height: 16, viewBox: '0 0 32 32', ...props }}>
      <rect id="storeIcon" fill="none" width="32" height="32" />
      <path
        d="M30,10.68l-2-6A1,1,0,0,0,27,4H5a1,1,0,0,0-1,.68l-2,6A1.19,1.19,0,0,0,2,11v6a1,1,0,0,0,1,1H4V28H6V18h6V28H28V18h1a1,1,0,0,0,1-1V11A1.19,1.19,0,0,0,30,10.68ZM26,26H14V18H26Zm2-10H24V12H22v4H17V12H15v4H10V12H8v4H4V11.16L5.72,6H26.28L28,11.16Z"
        transform="translate(0)"
      />
    </SvgIcon>
  );
};
