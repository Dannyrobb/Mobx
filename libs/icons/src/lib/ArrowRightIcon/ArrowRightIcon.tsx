import * as React from 'react';
import { SvgIcon, SVGIconProps } from '../SvgIcon/SvgIcon';

export interface ArrowRightIconProps extends SVGIconProps {}

export const ArrowRightIcon: React.FunctionComponent<ArrowRightIconProps> = (props) => {
  return (
    <SvgIcon {...{ width: 16, height: 16, viewBox: '0 0 32 32', ...props }}>
      <rect fill="none" width="32" height="32" />
      <polygon points="18 6 16.57 7.393 24.15 15 4 15 4 17 24.15 17 16.57 24.573 18 26 28 16 18 6" />
    </SvgIcon>
  );
};
