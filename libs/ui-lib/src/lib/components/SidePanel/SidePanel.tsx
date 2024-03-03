import * as React from 'react';

import { flex, theme } from '@cellxpert/theme';
import styled from '@emotion/styled';

import { CloseIcon } from '@cellxpert/icons';

export interface SidePanelProps {
  whichSide?: 'left' | 'right';

  width?: number;

  onClose?: (e: React.MouseEvent) => void;
}

const SidePanelWrapper = styled('div')<SidePanelProps>(({ width, whichSide }) => ({
  position: 'fixed',
  height: '100%',
  top: 0,
  zIndex: theme.zIndex.modal,
  padding: `${theme.gutters.base * 3}px ${theme.gutters.base * 4}px ${theme.gutters.base * 0}px ${
    theme.gutters.base * 4
  }px`,
  boxShadow: `0 2px 4px -1px rgba(0, 0, 0, 0.1), 0 1px 10px 0 rgba(0, 0, 0, 0.1), 0 4px 5px 0 rgba(0, 0, 0, 0.1)`,
  backgroundColor: theme.palette.blacks.white,
  width: 'calc(100vw * 0.3)',
  ...(width && {
    width: width,
  }),
  ...(whichSide === 'left' && {
    left: 0,
  }),
  ...(whichSide === 'right' && {
    right: 0,
  }),
}));

const CloseIconWrapper = styled('div')(() => ({
  position: 'absolute',
  cursor: 'pointer',
}));

export const SidePanel: React.FC<SidePanelProps> = ({ children, onClose, width, whichSide }) => {
  return (
    <>
      <SidePanelWrapper {...{ onClose, width, whichSide }}>
        <CloseIconWrapper {...{ onClick: onClose }}>
          <CloseIcon {...{ width: 20, height: 20, color: 'main' }} />
        </CloseIconWrapper>
        {children}
      </SidePanelWrapper>
    </>
  );
};

export default SidePanel;
