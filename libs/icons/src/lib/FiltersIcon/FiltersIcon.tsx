import * as React from 'react';
import { SvgIcon, SVGIconProps } from '../SvgIcon/SvgIcon';

export interface FiltersIconProps extends SVGIconProps {}

export const FiltersIcon: React.FunctionComponent<FiltersIconProps> = (props) => {
  return (
    <SvgIcon {...{ width: 32, height: 32, viewBox: '0 0 32 32', ...props }}>
      <path
        d="M30,8h-4.1c-0.5-2.3-2.5-4-4.9-4s-4.4,1.7-4.9,4H2v2h14.1c0.5,2.3,2.5,4,4.9,4s4.4-1.7,4.9-4H30V8z M21,12c-1.7,0-3-1.3-3-3
	s1.3-3,3-3s3,1.3,3,3S22.7,12,21,12z"
      />
      <path
        d="M2,24h4.1c0.5,2.3,2.5,4,4.9,4s4.4-1.7,4.9-4H30v-2H15.9c-0.5-2.3-2.5-4-4.9-4s-4.4,1.7-4.9,4H2V24z M11,20c1.7,0,3,1.3,3,3
	s-1.3,3-3,3s-3-1.3-3-3S9.3,20,11,20z"
      />
    </SvgIcon>
  );
};
