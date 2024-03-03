import * as React from 'react';
import { SvgIcon, SVGIconProps } from '../SvgIcon/SvgIcon';

export interface TrashIconProps extends SVGIconProps {}

export const TrashIcon: React.FunctionComponent<TrashIconProps> = (props) => {
  return (
    <SvgIcon {...{ width: 32, height: 32, viewBox: `0 0 32 32`, ...props }}>
      <rect fill="none" width="16" height="16" />
      <rect x="12" y="12" width="2" height="12" />
      <rect x="18" y="12" width="2" height="12" />
      <path d="M4,6V8H6V28a2,2,0,0,0,2,2H24a2,2,0,0,0,2-2V8h2V6ZM8,28V8H24V28Z" />
      <rect x="12" y="2" width="8" height="2" />
    </SvgIcon>
  );
};
