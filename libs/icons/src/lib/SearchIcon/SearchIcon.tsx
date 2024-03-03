import * as React from 'react';
import { SvgIcon, SVGIconProps } from '../SvgIcon/SvgIcon';

export interface SearchIconProps extends SVGIconProps {}

export const SearchIcon: React.FunctionComponent<SearchIconProps> = (props) => {
  return (
    <SvgIcon {...{ width: 32, height: 32, viewBox: '0 0 32 32', ...props }}>
      <path
        d="M29,27.5859l-7.5521-7.5521a11.0177,11.0177,0,1,0-1.4141,1.4141L27.5859,29ZM4,13a9,9,0,1,1,9,9A9.01,9.01,0,0,1,4,13Z"
        transform="translate(0 0)"
      />
    </SvgIcon>
  );
};
