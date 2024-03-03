import * as React from 'react';
import { SvgIcon, SVGIconProps } from '../SvgIcon/SvgIcon';

export interface HelpIconProps extends SVGIconProps {}

export const HelpIcon: React.FunctionComponent<HelpIconProps> = (props) => {
  return (
    <SvgIcon {...{ width: 16, height: 16, viewBox: '0 0 32 32', ...props }}>
      <rect fill="none" />
      <path d="M16,2A14,14,0,1,0,30,16,14,14,0,0,0,16,2Zm0,26A12,12,0,1,1,28,16,12,12,0,0,1,16,28Z" />
      <circle cx="16" cy="23.5" r="1.5" />
      <path d="M17,8H15.5A4.49,4.49,0,0,0,11,12.5V13h2v-.5A2.5,2.5,0,0,1,15.5,10H17a2.5,2.5,0,0,1,0,5H15v4.5h2V17a4.5,4.5,0,0,0,0-9Z" />
    </SvgIcon>
  );
};
