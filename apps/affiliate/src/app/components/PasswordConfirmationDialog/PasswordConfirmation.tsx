import React from 'react';

import { theme, Theme } from '@cellxpert/theme';
import { Typography, PasswordInput, Dialog, DialogProps } from '@cellxpert/ui-lib';
import styled from '@emotion/styled';

export interface PasswordConfirmationProps extends Omit<DialogProps, 'onConfirm' | 'onClose'> {
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

export const PasswordConfirmation: React.FunctionComponent<PasswordConfirmationProps> = ({
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
        variant: 'transactional',
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
          You are about to change your personal info, to continue enter your password.
        </Typography>
        <PasswordWrap>
          <PasswordInput {...{ onChange: handleChange, value: password, label: 'Password', error: error }} />
        </PasswordWrap>
      </Content>
    </Dialog>
  );
};

export default PasswordConfirmation;
