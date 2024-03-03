import * as React from 'react';
import styled from '@emotion/styled';
import { Tooltip, Typography } from '@cellxpert/ui-lib';
import { theme } from '@cellxpert/theme';
import { HelpIcon } from '@cellxpert/icons';

export interface HelpPopperComponentProps {
  titles?: string;
  body: string;
  warning?: string;
}

const HelperTooltipWrapper = styled('div')(() => ({
  ':hover': {
    cursor: 'pointer',
  },
}));

const TooltipDropdownWrapper = styled('div')(() => ({
  padding: `${theme.gutters.base * 1.75}px ${theme.gutters.base * 12.25}px ${theme.gutters.base * 3}px ${
    theme.gutters.base * 2
  }px`,
  backgroundColor: theme.palette.blacks.white,
  boxShadow: `0 2px 4px -1px rgba(0, 0, 0, 0.1), 0 1px 10px 0 rgba(0, 0, 0, 0.1), 0 4px 5px 0 rgba(0, 0, 0, 0.1)`,
}));

const HelpPopperWrapper = styled('div')(() => ({
  display: 'flex',
  padding: `0px 16px`,
}));

export const HelpPopperComponent: React.FC<HelpPopperComponentProps> = ({ titles, body }) => {
  return (
    <>
      <HelpPopperWrapper>
        <div>testing</div>
        <Tooltip
          {...{
            placement: 'left',
            isOpen: false,
            overflow: true,
            button: (
              <HelperTooltipWrapper>
                <HelpIcon
                  {...{
                    height: 16,
                    width: 16,
                    color: 'placeholder',
                  }}
                />
              </HelperTooltipWrapper>
            ),
          }}
        >
          <TooltipDropdownWrapper>
            <Typography {...{ component: 'span', variant: 'body2', color: 'main' }}>{titles}</Typography>
            <div>{body}</div>
          </TooltipDropdownWrapper>
        </Tooltip>
      </HelpPopperWrapper>
    </>
  );
};

export default HelpPopperComponent;
