import * as React from 'react';
import { SvgIcon, SVGIconProps } from '../SvgIcon/SvgIcon';

export interface CheckMarkFilledIconProps extends SVGIconProps {}

export const CheckMarkFilledIcon: React.FunctionComponent<CheckMarkFilledIconProps> = (props) => {
  return (
    <SvgIcon {...{ width: 32, height: 32, viewBox: `0 0 32 32`, ...props }}>
      <rect fill="none" width="32" height="32" />
      <polygon id="inner-path" points="14 21.591 9 16.591 10.591 15 14 18.409 21.41 11 23.005 12.585 14 21.591" />
      <path d="M16,2A14,14,0,1,0,30,16,14,14,0,0,0,16,2ZM14,21.5908l-5-5L10.5906,15,14,18.4092,21.41,11l1.5957,1.5859Z" />
    </SvgIcon>
  );
};
