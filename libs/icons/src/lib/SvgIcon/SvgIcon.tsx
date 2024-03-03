import * as React from 'react';

import { ColorKey, colorSelect } from '@cellxpert/theme';
import styled from '@emotion/styled';

const SvgIconBase = styled('svg')<{ hoverColor?: string }>(({ hoverColor }) => ({
  display: 'inline-flex',
  ...(hoverColor && {
    '&:hover': {
      fill: hoverColor,
    },
  }),
}));

export interface SVGIconProps {
  width?: number;
  height?: number;
  viewBox?: string;
  color?: ColorKey;
  hoverColor?: ColorKey;
  onClick?: (event: React.MouseEvent) => void;
}

export const SvgIcon: React.FunctionComponent<SVGIconProps> = ({
  viewBox,
  height,
  width,
  children,
  color = 'primary1',
  hoverColor,
  ...rest
}) => {
  return (
    <SvgIconBase
      {...{
        height,
        width,
        fill: colorSelect(color),
        hoverColor: hoverColor ? colorSelect(hoverColor) : undefined,
        viewBox: viewBox || `0 0 24 24`,
        xmlns: 'http://www.w3.org/2000/svg',
        xmlnsXlink: 'http://www.w3.org/1999/xlink',
        ...rest,
      }}
    >
      {children}
    </SvgIconBase>
  );
};

export default SvgIcon;
