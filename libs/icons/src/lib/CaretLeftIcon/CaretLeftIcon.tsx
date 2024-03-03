import * as React from 'react';
import { SvgIcon, SVGIconProps } from '../SvgIcon/SvgIcon';

export interface CaretLeftIconProps extends SVGIconProps {}

export const CaretLeftIcon: React.FunctionComponent<CaretLeftIconProps> = (props) => {
  return (
    <SvgIcon {...{ width: 32, height: 32, viewBox: '0 0 32 32', ...props }}>
      <polygon points="20,24 10,16 20,8 " />
      <rect fill="none" width="32" height="32" />
    </SvgIcon>
  );
};
