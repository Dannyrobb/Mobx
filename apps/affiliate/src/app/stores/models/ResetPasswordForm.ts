import { ChangeEvent } from 'react';

import { action, makeObservable, observable } from 'mobx';

import { submitResetPassword } from '../../api/api';
import AccountDetailsStore from '../AccountDetailsStore';

export interface ResetPasswordFormFields {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

class ResetPasswordForm {
  store: AccountDetailsStore;
  isEditMode: boolean = false;
  formFields: ResetPasswordFormFields = {
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  };

  constructor(store: AccountDetailsStore) {
    makeObservable(this, {
      // Observables
      isEditMode: observable,
      formFields: observable,
      // Computeds

      // Actions
      handleTextFieldChange: action,
      toggleEditMode: action,

      // XHR Actions
      handleSubmit: action,
    });
    this.store = store;
  }

  handleSubmit = async (): Promise<void> => {
    this.store.rootStore.main.setLoading(true);
    try {
      await submitResetPassword();
      this.store.rootStore.main.setLoading(false);
    } catch (error) {
      // this.store.rootStore.snackbar('Well guess what... yep is not working.')
      this.store.rootStore.main.setLoading(false);
    }
  };

  toggleEditMode = (): void => {
    this.isEditMode = !this.isEditMode;
  };

  handleTextFieldChange =
    (fieldKey: keyof ResetPasswordFormFields): ((e: ChangeEvent<HTMLInputElement>) => void) =>
    (e) => {
      this.formFields[fieldKey] = e.target.value;
    };
}

export default ResetPasswordForm;
