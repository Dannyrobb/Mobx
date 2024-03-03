import * as React from 'react';

import { flexEndCenter, Theme, theme } from '@cellxpert/theme';
import { Button, PasswordInput } from '@cellxpert/ui-lib';
import styled from '@emotion/styled';
import { observer } from 'mobx-react';

import ResetPasswordForm, { ResetPasswordFormFields } from '../../../../stores/models/ResetPasswordForm';
import { useStore } from '../../../../stores/setupContext';
import PageContainer from '../../components/PageContainer/PageContainer';

export interface ResetPasswordProps {
  formFields: ResetPasswordFormFields;
  handleTextFieldChange: ResetPasswordForm['handleTextFieldChange'];
  handleSubmit: ResetPasswordForm['handleSubmit'];
}

const resetPassword: Array<{
  key: Extract<keyof ResetPasswordFormFields, 'currentPassword' | 'newPassword' | 'confirmNewPassword'>;
  label: string;
  placeholder: string;
  type: string;
}> = [
  {
    key: 'currentPassword',
    label: 'Current password',
    placeholder: 'Please input the current password',
    type: 'text',
  },
  {
    key: 'newPassword',
    label: 'New password',
    placeholder: 'Please type the new password',
    type: 'text',
  },
  {
    key: 'confirmNewPassword',
    label: 'Confirm new password',
    placeholder: 'Please type your new password',
    type: 'text',
  },
];

const FormStyleFieldsWrapper = styled('div')(() => ({
  marginBottom: theme.gutters.base * 2,
}));

const ButtonWrapper = styled('div')(() => ({
  ...flexEndCenter,
  marginTop: theme.gutters.base * 3,
}));

export const ResetPassword: React.FunctionComponent<ResetPasswordProps> = ({
  formFields,
  handleTextFieldChange,
  handleSubmit,
}) => {
  return (
    <>
      <PageContainer>
        <form {...{ onSubmit: handleSubmit }}>
          <div>
            {resetPassword.map((field) => {
              return (
                <FormStyleFieldsWrapper key={field.key}>
                  <PasswordInput
                    {...{
                      key: field.key,
                      label: field.label,

                      value: formFields[field.key],
                      onChange: handleTextFieldChange(field.key),
                    }}
                  />
                </FormStyleFieldsWrapper>
              );
            })}
          </div>
          <ButtonWrapper>
            <Button
              {...{
                type: 'submit',
                label: 'Save changes',
                variant: 'primary',
                size: 'small',
                disabled: true,
              }}
            >
              Button
            </Button>
          </ButtonWrapper>
        </form>
      </PageContainer>
    </>
  );
};

const Observed = observer(ResetPassword);

const WithStoreConnection = () => {
  const { accountDetails } = useStore();

  const { resetPasswordForm } = accountDetails;

  const { formFields, handleTextFieldChange, handleSubmit } = resetPasswordForm;

  return <Observed {...{ formFields, handleTextFieldChange, handleSubmit }} />;
};

export default observer(WithStoreConnection);
