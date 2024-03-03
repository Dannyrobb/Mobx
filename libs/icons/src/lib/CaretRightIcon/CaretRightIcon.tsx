import * as React from 'react';
import { SvgIcon, SVGIconProps } from '../SvgIcon/SvgIcon';

export interface CaretRightIconProps extends SVGIconProps {}

export const CaretRightIcon: React.FunctionComponent<CaretRightIconProps> = (props) => {
  return (
    <SvgIcon {...{ width: 32, height: 32, viewBox: '0 0 32 32', ...props }}>
      <polygon points="12,8 22,16 12,24 " />
      <rect fill="none" width="32" height="32" />
    </SvgIcon>
  );
};
