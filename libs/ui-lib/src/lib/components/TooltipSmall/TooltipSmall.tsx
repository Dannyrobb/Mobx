import * as React from 'react';

import { theme } from '@cellxpert/theme';
import styled from '@emotion/styled';

export interface TooltipProps {
  title: string;
  children: React.ReactNode;
}

export const TooltipElem = styled('span')(() => ({
  position: 'relative',
  display: 'inline-block',
  paddingRight: '7px',
  '&:hover:after': {
    display: 'block',
  },
  '&:hover:before': {
    display: 'block',
  },
  '&:before': {
    content: 'attr(data-text)',
    position: 'absolute',
    whiteSpace: 'nowrap',
    top: '50%',
    transform: 'translateY(-50%)',
    left: '100%',
    padding: `${theme.gutters.base / 2}px ${theme.gutters.base / 2}px ${theme.gutters.base / 2}px ${
      theme.gutters.base * 1.5
    }px`,
    borderRadius: '2px',
    background: `${theme.palette.text.main}`,
    color: '#fff',
    textAlign: 'center',
    display: 'none',
    ...theme.typography.meta.subtitle2,
    lineHeight: 1,
  },
  '&:after': {
    content: 'attr(data-textt)',
    position: 'absolute',
    right: '0',
    top: '50%',
    transform: 'translateY(-50%)',
    border: `5px solid ${theme.palette.text.main}`,
    borderColor: 'transparent black transparent transparent',
    display: 'none',
  },
}));

export const TooltipSmall: React.FunctionComponent<TooltipProps> = ({ children, title }) => {
  return (
    <TooltipElem data-text={title} data-textt={' '}>
      {children}
    </TooltipElem>
  );
};

export default TooltipSmall;
