import * as React from 'react';

import { SvgIcon, SVGIconProps } from '../SvgIcon/SvgIcon';

export interface MigrateIconProps extends SVGIconProps {}

export const MigrateIcon: React.FunctionComponent<MigrateIconProps> = (props) => {
  return (
    <SvgIcon {...{ width: 16, height: 16, viewBox: '0 0 32 32', ...props }}>
      <path d="M26,2H6A2,2,0,0,0,4,4V8a2,2,0,0,0,2,2h9v6.17l-2.59-2.58L11,15l5,5,5-5-1.41-1.41L17,16.17V10h9a2,2,0,0,0,2-2V4A2,2,0,0,0,26,2ZM6,4h4V8H6ZM26,8H12V4H26Z" />
      <path d="M26,22H6a2,2,0,0,0-2,2v4a2,2,0,0,0,2,2H26a2,2,0,0,0,2-2V24A2,2,0,0,0,26,22ZM6,24H20v4H6Zm20,4H22V24h4Z" />
    </SvgIcon>
  );
};
