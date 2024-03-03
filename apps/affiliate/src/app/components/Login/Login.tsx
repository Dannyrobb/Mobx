import React from 'react';

import { CellxpertNewLogo } from '@cellxpert/icons';
import { flexCenterCenter, Theme } from '@cellxpert/theme';
import { Button, TextInput, PasswordInput, Link } from '@cellxpert/ui-lib';
import styled from '@emotion/styled';

interface LoginProps {
  login: ({ user, pass }: { user: string; pass: string }) => void;
}
const Container = styled('div')(() => ({
  ...flexCenterCenter,
  flexDirection: 'column',
}));

const AccountLogo = styled('div')(({ theme }) => ({
  width: '352px',
  height: '106px',
  backgroundColor: '#123564',
  marginTop: theme.gutters.base * 4.375,
}));

const Hr = styled('hr')(({ theme }) => ({
  width: '100%',
  opacity: 0.4,
  margin: `${theme.gutters.base * 2} 0`,
}));

const Header = styled('h4')(({ theme }) => ({
  ...theme.typography.meta.h4,
  fontWeight: 300,
  width: '352px',
  textAlign: 'center',
  marginTop: theme.gutters.base * 1,
  marginBottom: theme.gutters.base * 3,
}));

const Form = styled('form')(() => ({
  width: '352px',
  display: 'flex',
  flexDirection: 'column',
}));

const ForgotPassword = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row-reverse',
  marginBottom: theme.gutters.base * 4,
  marginTop: theme.gutters.base * -1,
}));

const CreateAccount = styled('p')(({ theme }) => ({
  ...flexCenterCenter,
  ...theme.typography.meta.body2,
  marginTop: theme.gutters.base * 4,
  marginBottom: 0,
}));

const AdminAccess = styled('p')(({ theme }) => ({
  ...flexCenterCenter,
  ...theme.typography.meta.body2,
  margin: 0,
}));

const PoweredBy = styled('footer')(({ theme }) => ({
  ...flexCenterCenter,
  ...theme.typography.meta.overline,
  lineHeight: 1.6,
  fontWeight: 400,
  letterSpacing: 3,
  marginTop: theme.gutters.base * 9.125,
}));

const CellxpertLogoWrapper = styled(CellxpertNewLogo)(({ theme }) => ({
  marginLeft: theme.gutters.base,
}));

export const Login: React.FunctionComponent<LoginProps> = ({ login }) => {
  const [username, setUsername] = React.useState('markmarkmark');
  const [password, setPassword] = React.useState('asd1234');
  const onFormSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    login({ user: username, pass: password });
  };

  return (
    <Container>
      <AccountLogo />
      <Hr />
      <Header>
        Login to your <strong>Affiliate</strong> account
      </Header>
      <Form {...{ onSubmit: onFormSubmit }}>
        <TextInput
          {...{
            placeholder: 'Username',
            value: username,
            label: 'User name',
            onChange: (e) => setUsername(e.target.value),
          }}
        />
        <PasswordInput
          {...{
            placeholder: 'Password',
            value: password,
            type: 'password',
            label: 'Password',
            onChange: (e) => setPassword(e.target.value),
          }}
        />
        <ForgotPassword>
          <Link {...{ children: 'Forgot your password?', href: 'https://www.google.com', target: '_blank' }} />
        </ForgotPassword>
        <Button {...{ type: 'submit', label: 'Login', size: 'medium' }} />
        <CreateAccount>
          Don't have an account yet?{' '}
          <Link {...{ children: 'Create an account', href: 'https://www.google.com', target: '_blank' }} />
        </CreateAccount>
        <Hr />
        <AdminAccess>
          Are you an admin?{' '}
          <Link {...{ children: 'Login as admin', href: 'https://www.google.com', target: '_blank' }} />
        </AdminAccess>
        <PoweredBy>
          POWERED BY <CellxpertLogoWrapper />
        </PoweredBy>
      </Form>
    </Container>
  );
};

export default Login;
