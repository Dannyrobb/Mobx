import * as React from 'react';

import { flex, theme, Theme } from '@cellxpert/theme';
import styled from '@emotion/styled';

import { CloseIcon } from '@cellxpert/icons';

export interface ModalProps {
  /**
   * What size should it be?
   * @default default
   */
  size?: 'xs' | 'small' | 'default' | 'large';

  width?: number;

  onClose?: (e: React.MouseEvent) => void;
  // onSave?
  // padding left defined by menu
  //
}

const ModalBackdrop = styled('div')(() => ({
  position: 'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  // backgroundColor: 'rgba(0, 0, 0, 0.5)',
  zIndex: theme.zIndex.modal,
}));

const ModalWrapper = styled('div')<Pick<ModalProps, 'size' | 'width'>>(({ size, width }) => ({
  ...flex,
  position: 'relative',
  flexDirection: 'column',
  margin: 'auto',
  padding: theme.gutters.base * 2,
  backgroundColor: theme.palette.blacks.white,
  marginTop: theme.gutters.base * 12,
  color: theme.palette.additional.grey[900],
  boxShadow: `
    0 8px 10px -5px rgba(0, 0, 0, 0.2),
    0 6px 30px 5px rgba(0, 0, 0, 0.12),
    0 16px 24px 2px rgba(0, 0, 0, 0.14)
    `,
  ...(size === 'xs' && {
    width: 320,
  }),
  ...(size === 'small' && {
    width: 480,
  }),
  ...(size === 'default' && {
    width: 640,
  }),
  ...(size === 'large' && {
    width: 960,
  }),
  ...(width && {
    width: width,
  }),
}));
const CloseIconWrapper = styled('div')(() => ({
  position: 'absolute',
  right: 16,
  cursor: 'pointer',
}));

export const Modal: React.FunctionComponent<ModalProps> = ({ children, size, width, onClose }) => {
  return (
    <ModalBackdrop {...{ onClick: onClose }}>
      <ModalWrapper {...{ size, width, onClick: (e) => e.stopPropagation() }}>
        <CloseIconWrapper {...{ onClick: onClose }}>
          <CloseIcon {...{ width: 20, height: 20, color: 'main' }} />
        </CloseIconWrapper>
        {children}
      </ModalWrapper>
    </ModalBackdrop>
  );
};

export default Modal;
