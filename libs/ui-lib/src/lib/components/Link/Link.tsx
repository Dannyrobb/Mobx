import { ArrowRightIcon } from '@cellxpert/icons';
import { theme } from '@cellxpert/theme';
import styled from '@emotion/styled';
import * as React from 'react';
import Typography from '../Typography/Typography';

export interface LinkProps {
  href: string;
  target?: '_blank' | '_self' | '_parent' | '_top';
  arrowRight?: boolean;
  disabled?: boolean;
  component?: React.ElementType;
}

const AnchorTag = styled(Typography)<Pick<LinkProps, 'disabled'>>(({ disabled }) => ({
  color: theme.palette.main.primary1.base,
  display: 'flex',
  width: 'max-content',
  margin: `0 ${theme.gutters.base * 1 + 'px'}`,
  letterSpacing: '0.5px',
  fontWeight: 700,
  '&:hover': {
    color: theme.palette.main.primary2.base,
    cursor: 'pointer',
    '-webkit-box-shadow': `
    0px 1px 0px 0px #FFFFFF,
    0px 2px 0px 0px #000000
    `,
    boxShadow: `
    0px 1px 0px 0px #FFFFFF,
    0px 2px 0px 0px #000000
    `,
  },
  '&:hover svg': {
    fill: theme.palette.main.primary2.base,
  },
  ...(disabled && {
    color: theme.palette.main.primary1[200],
    pointerEvents: 'none',
    svg: {
      fill: theme.palette.main.primary1[200],
    },
  }),
}));

const ArrowWrapper = styled('span')(() => ({
  marginLeft: theme.gutters.base * 1.125,
}));

export const Link: React.FunctionComponent<LinkProps> = ({
  disabled,
  arrowRight,
  href,
  target,
  component = 'a',
  children,
}) => {
  return (
    <AnchorTag {...{ variant: 'body2', component, href, target, disabled }}>
      {children}
      {arrowRight && (
        <ArrowWrapper>
          <ArrowRightIcon />
        </ArrowWrapper>
      )}
    </AnchorTag>
  );
};
