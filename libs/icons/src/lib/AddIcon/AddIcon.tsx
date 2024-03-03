import * as React from 'react';
import { SvgIcon, SVGIconProps } from '../SvgIcon/SvgIcon';

export interface AddIconProps extends SVGIconProps {}

export const AddIcon: React.FunctionComponent<AddIconProps> = (props) => {
  return (
    <SvgIcon {...{ width: 32, height: 32, viewBox: '0 0 32 32', ...props }}>
      <polygon points="17,15 17,8 15,8 15,15 8,15 8,17 15,17 15,24 17,24 17,17 24,17 24,15 " />
    </SvgIcon>
  );
};
