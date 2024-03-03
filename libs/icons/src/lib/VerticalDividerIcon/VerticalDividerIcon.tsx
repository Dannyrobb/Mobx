import * as React from 'react';
import { SVGIconProps, SvgIcon } from '../SvgIcon/SvgIcon';

export interface VerticalDividerProps extends SVGIconProps {}

export const VerticalDividerIcon: React.FunctionComponent<VerticalDividerProps> = (props) => {
  return (
    <SvgIcon {...{ width: 16, height: 16, viewBox: '0 0 32 32', ...props }}>
      <rect id="verticalDivider" fill="none" width="32" height="32" />
      <rect x="8" y="15" width="2" height="16" transform="rotate('90')" />
    </SvgIcon>
  );
};
