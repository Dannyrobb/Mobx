import * as React from 'react';
import { SvgIcon, SVGIconProps } from '../SvgIcon/SvgIcon';

export interface ErrorFilledProps extends SVGIconProps {}

export const ErrorFilledIcon: React.FunctionComponent<ErrorFilledProps> = (props) => {
  return (
    <SvgIcon {...{ width: 20, height: 20, viewBox: '0 0 20 20', ...props }}>
      <path d="M10,1c-5,0-9,4-9,9s4,9,9,9s9-4,9-9S15,1,10,1z M13.5,14.5l-8-8l1-1l8,8L13.5,14.5z" />
      <path id="inner-path" opacity="0" d="M13.5,14.5l-8-8l1-1l8,8L13.5,14.5z" />
      <rect id="_Transparent_Rectangle_" fill="none" width="20" height="20" />
    </SvgIcon>
  );
};
