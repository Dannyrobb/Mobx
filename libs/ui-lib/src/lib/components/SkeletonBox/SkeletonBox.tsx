import { keyframes } from '@emotion/core';
import styled from '@emotion/styled';
import * as React from 'react';

export interface SkeletonBoxProps {
  width: number | '100%';
  height: number;
}

const movingBG = (width: number | '100%') => {
  if (width === '100%') {
    return keyframes({
      '0%': { backgroundPosition: '-500px' },
      '100%': { backgroundPosition: '500px' },
    });
  }

  return keyframes({
    '0%': {
      backgroundPosition: `-${width}px`,
    },
    '100%': { backgroundPosition: `${width}px` },
  });
};

export const Box = styled('div')<{ width: number | '100%'; height: number }>(({ width, height }) => ({
  height,
  width,
  backgroundImage: 'linear-gradient(90deg, lightgray, rgb(245, 245, 245), lightgray)',
  animation: `1.2s ease-in-out 0s infinite normal none running ${movingBG(width)}`,
}));

export const SkeletonBox: React.FunctionComponent<SkeletonBoxProps> = ({ width, height }) => {
  return <Box {...{ width, height }} />;
};

export default SkeletonBox;
