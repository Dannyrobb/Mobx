import * as React from 'react';
import { SvgIcon, SVGIconProps } from '../SvgIcon/SvgIcon';

export interface ReportIconProps extends SVGIconProps {}

export const ReportIcon: React.FunctionComponent<ReportIconProps> = (props) => {
  return (
    <SvgIcon {...{ width: 16, height: 16, viewBox: '0 0 32 32', ...props }}>
      <rect id="reportIcon" fill="none" width="32" height="32" />
      <rect x="15" y="20" width="2" height="4" />
      <rect x="20" y="18" width="2" height="6" />
      <rect x="10" y="14" width="2" height="10" />
      <path d="M25,5H22V4a2,2,0,0,0-2-2H12a2,2,0,0,0-2,2V5H7A2,2,0,0,0,5,7V28a2,2,0,0,0,2,2H25a2,2,0,0,0,2-2V7A2,2,0,0,0,25,5ZM12,4h8V8H12ZM25,28H7V7h3v3H22V7h3Z" />
    </SvgIcon>
  );
};
