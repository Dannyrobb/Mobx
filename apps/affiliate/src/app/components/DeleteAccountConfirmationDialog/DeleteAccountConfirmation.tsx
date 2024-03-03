import React from 'react';

import { theme, Theme } from '@cellxpert/theme';
import { Typography, PasswordInput, Dialog, DialogProps } from '@cellxpert/ui-lib';
import styled from '@emotion/styled';

export interface DeleteAccountConfirmationProps extends Omit<DialogProps, 'onConfirm' | 'onClose'> {
  onConfirm: (password: string) => void;
  onClose: (e: React.MouseEvent) => void;
  error?: string;
}

const Content = styled('div')(() => ({
  backgroundColor: theme.palette.text.contrast,
  border: 'none',
}));

const PasswordWrap = styled('div')(({ theme }) => ({
  marginTop: theme.gutters.base * 2,
  maxWidth: theme.gutters.base * 36,
}));

export const DeleteAccountConfirmation: React.FunctionComponent<DeleteAccountConfirmationProps> = ({
  error,
  onConfirm,
  onClose,
}) => {
  const [password, setPassword] = React.useState('');
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  return (
    <Dialog
      {...{
        variant: 'danger',
        title: 'Confirmation required',
        confirmationButtonText: 'Continue',
        size: 'default',
        onConfirm: () => {
          onConfirm(password);
        },
        onClose,
        isConfirmButtonDisabled: password.length === 0,
      }}
    >
      <Content>
        <Typography {...{ variant: 'body2' }}>
          The request to delete your account will be sent to your admin and will be answered in up to one month. Once
          the request is approved your account will be permanently deleted. To continue enter your password
        </Typography>
        <PasswordWrap>
          <PasswordInput {...{ onChange: handleChange, value: password, label: 'Password', error: error }} />
        </PasswordWrap>
      </Content>
    </Dialog>
  );
};

export default DeleteAccountConfirmation;
