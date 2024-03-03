import * as React from 'react';
import { SvgIcon, SVGIconProps } from '../../SvgIcon/SvgIcon';

export interface ErrorWhiteFilledProps extends SVGIconProps {}

export const ErrorWhiteFilledIcon: React.FunctionComponent<ErrorWhiteFilledProps> = (props) => {
  return (
    <SvgIcon {...{ width: 20, height: 20, viewBox: '0 0 20 20', ...props }}>
      <rect fill="none" width="20" height="20" />
      <path id="inner-path" fill="#FFFFFF" d="M13.5,14.5l-8-8l1-1l8,8L13.5,14.5z" />
      <path d="M10,1c-5,0-9,4-9,9s4,9,9,9s9-4,9-9S15,1,10,1z M13.5,14.5l-8-8l1-1l8,8L13.5,14.5z" />
    </SvgIcon>
  );
};
