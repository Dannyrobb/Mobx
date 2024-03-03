import * as React from 'react';

import { flex, theme, Theme } from '@cellxpert/theme';
import styled from '@emotion/styled';

import Button from '../Button/Button';
import { Modal, ModalProps } from '../Modal/Modal';
import Typography from '../Typography/Typography';

export interface DialogProps extends ModalProps {
  variant: 'passive' | 'transactional' | 'danger' | 'acknowledgment' | 'progress';

  title: string;

  label?: string;

  /**
   * What should the confirmation button say?
   * @default 'save'
   */
  confirmationButtonText?: string;

  /**
   * What should the cancel button say?
   * @default 'Cancel'
   */
  cancelButtonText?: string;

  isConfirmButtonDisabled?: boolean;

  // onSave?: (e: React.MouseEvent) => void;
  onConfirm: (e: React.MouseEvent) => void;
  // TODO: padding left defined by menu?
}

const DialogHeader = styled('div')(() => ({
  ...theme.typography.meta.h6,
  flex: '0 0 auto',
  paddingBottom: theme.gutters.base * 2,
  marginRight: theme.gutters.base * 6,
}));

const DialogHeaderLabel = styled('div')(() => ({
  ...theme.typography.meta.caption,
  color: theme.palette.additional.grey[700],
  marginRight: theme.gutters.base * 6,
  marginBottom: theme.gutters.base * 0.5,
}));

const DialogBody = styled('div')<Pick<DialogProps, 'variant'>>(({ variant }) => ({
  ...theme.typography.meta.body2,
  flex: '1 1 auto',
  paddingBottom: theme.gutters.base * 1.5,
  ...(variant === 'passive' && {
    paddingBottom: 0,
  }),
}));

const DialogFooter = styled('div')(() => ({
  flex: '0 0 auto',
  marginTop: theme.gutters.base * 6,
  ...flex,
  justifyContent: 'flex-end',
  gap: theme.gutters.base * 2,
}));

export const Dialog: React.FunctionComponent<DialogProps> = ({
  variant,
  title,
  children,
  label,
  size,
  width,
  onClose,
  onConfirm,
  confirmationButtonText = 'Save',
  cancelButtonText = 'Cancel',
  isConfirmButtonDisabled,
}) => {
  return (
    <Modal {...{ size, width, onClose }}>
      <DialogHeader {...{ variant }}>
        {label && <DialogHeaderLabel>{label}</DialogHeaderLabel>}
        <Typography {...{ variant: 'h6' }}>{title}</Typography>
      </DialogHeader>
      <DialogBody {...{ variant }}>{children}</DialogBody>
      <DialogFooter>
        {variant === 'transactional' && (
          <Button {...{ size: 'small', label: cancelButtonText, variant: 'ghostBlue', onClick: onClose }} />
        )}
        {(variant === 'transactional' || variant === 'acknowledgment') && (
          <Button
            {...{ size: 'small', label: confirmationButtonText, onClick: onConfirm, disabled: isConfirmButtonDisabled }}
          />
        )}
        {variant === 'danger' && (
          <Button {...{ size: 'small', label: cancelButtonText, variant: 'ghostBlack', onClick: onClose }} />
        )}
        {variant === 'danger' && (
          <Button
            {...{
              size: 'small',
              label: confirmationButtonText,
              onClick: onConfirm,
              variant: 'danger',
              disabled: isConfirmButtonDisabled,
            }}
          />
        )}
      </DialogFooter>
    </Modal>
  );
};

export default Dialog;
