import * as React from 'react';
import { SvgIcon, SVGIconProps } from '../../SvgIcon/SvgIcon';

export interface InfoWhiteFilledProps extends SVGIconProps {}

export const InfoWhiteFilledIcon: React.FunctionComponent<InfoWhiteFilledProps> = (props) => {
  return (
    <SvgIcon {...{ width: 32, height: 32, viewBox: '0 0 32 32', ...props }}>
      <path
        fill="#FFFFFF"
        d="M16,8a1.5,1.5,0,1,1-1.5,1.5A1.5,1.5,0,0,1,16,8Zm4,13.875H17.125v-8H13v2.25h1.875v5.75H12v2.25h8Z"
        transform="translate(0 0)"
      />
      <path
        d="M16,2A14,14,0,1,0,30,16,14,14,0,0,0,16,2Zm0,6a1.5,1.5,0,1,1-1.5,1.5A1.5,1.5,0,0,1,16,8Zm4,16.125H12v-2.25h2.875v-5.75H13v-2.25h4.125v8H20Z"
        transform="translate(0 0)"
      />
    </SvgIcon>
  );
};
