import * as React from 'react';
import { SvgIcon, SVGIconProps } from '../SvgIcon/SvgIcon';

export interface CheckMarkIconProps extends SVGIconProps {}

export const CheckMarkIcon: React.FunctionComponent<CheckMarkIconProps> = (props) => {
  return (
    <SvgIcon {...{ width: 32, height: 32, viewBox: '0 0 32 32', ...props }}>
      <polygon {...{ strokeWidth: 0 }} points="13 24 4 15 5.414 13.586 13 21.171 26.586 7.586 28 9 13 24" />
    </SvgIcon>
  );
};
