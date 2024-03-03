import * as React from 'react';
import { SvgIcon, SVGIconProps } from '../SvgIcon/SvgIcon';

export interface EditIconProps extends SVGIconProps {}

export const EditIcon: React.FunctionComponent<EditIconProps> = (props) => {
  return (
    <SvgIcon {...{ width: 32, height: 32, viewBox: '0 0 32 32', ...props }}>
      <g fillRule="evenodd" opacity={0.87}>
        <path
          d="M1 13h14v1H1v-1zm11.7-8.5c.4-.4.4-1 0-1.4l-1.8-1.8c-.4-.4-1-.4-1.4 0L2 8.8V12h3.2l7.5-7.5zM10.2 2L12 3.8l-1.5 1.5-1.8-1.8L10.2 2zM3 11V9.2l5-5L9.8 6l-5 5H3z"
          transform="translate(-935.000000, -292.000000) translate(256.000000, 180.000000) translate(0.000000, 48.000000) translate(1.000000, 64.000000) translate(678.000000, 0.000000) translate(8.000000, 8.000000)"
        />
      </g>
    </SvgIcon>
  );
};
