import * as React from 'react';
import { SvgIcon, SVGIconProps } from '../SvgIcon/SvgIcon';

export interface CommissionPlanIcon extends SVGIconProps {}

export const CommissionPlanIcon: React.FunctionComponent<SVGIconProps> = (props) => {
  return (
    <SvgIcon {...{ width: 16, height: 16, viewBox: '0 0 32 32', ...props }}>
      <rect id="commissionPlanIcon" fill="none" width="32" height="32" />
      <rect x="21" y="16" width="2" height="2" />
      <rect x="9" y="16" width="8" height="2" />
      <rect x="21" y="12" width="2" height="2" />
      <rect x="9" y="12" width="8" height="2" />
      <rect x="9" y="8" width="14" height="2" />
      <path d="M25,2H7A2.002,2.002,0,0,0,5,4V29a1,1,0,0,0,1,1H7a.9987.9987,0,0,0,.8-.4L10,26.667,12.2,29.6a1.0353,1.0353,0,0,0,1.6,0L16,26.667,18.2,29.6a1.0353,1.0353,0,0,0,1.6,0L22,26.667,24.2,29.6a.9993.9993,0,0,0,.8.4h1a1,1,0,0,0,1-1V4A2.0023,2.0023,0,0,0,25,2Zm0,25.333L22.8,24.4a1.0353,1.0353,0,0,0-1.6,0L19,27.333,16.8,24.4a1.0353,1.0353,0,0,0-1.6,0L13,27.333,10.8,24.4a1.0353,1.0353,0,0,0-1.6,0L7,27.333V4H25Z" />
    </SvgIcon>
  );
};
