import * as React from 'react';
import { SvgIcon, SVGIconProps } from '../SvgIcon/SvgIcon';

export interface CopyTextIconProps extends SVGIconProps {}

export const CopyTextIcon: React.FC<CopyTextIconProps> = (props) => {
  return (
    <SvgIcon {...{ width: 32, height: 32, viewBox: '0 0 32 32', ...props }}>
      <rect width="32" height="32" fill="none" />
      <path
        d="M28,10V28H10V10H28m0-2H10a2,2,0,0,0-2,2V28a2,2,0,0,0,2,2H28a2,2,0,0,0,2-2V10a2,2,0,0,0-2-2Z"
        transform="translate(0)"
      />
      <path d="M4,18H2V4A2,2,0,0,1,4,2H18V4H4Z" transform="translate(0)" />
    </SvgIcon>
  );
};
