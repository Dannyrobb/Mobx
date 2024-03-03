import * as React from 'react';
import { SvgIcon, SVGIconProps } from '../SvgIcon/SvgIcon';

export interface SortArrowsIconProps extends SVGIconProps {}

export const SortArrowsIcon: React.FunctionComponent<SortArrowsIconProps> = (props) => {
  return (
    <SvgIcon {...{ width: 16, height: 16, viewBox: '0 0 32 32', ...props }}>
      <polygon points="27.6,20.6 24,24.2 24,4 22,4 22,24.2 18.4,20.6 17,22 23,28 29,22 " />
      <polygon points="9,4 3,10 4.4,11.4 8,7.8 8,28 10,28 10,7.8 13.6,11.4 15,10 " />
    </SvgIcon>
  );
};
