import { ChangeEvent } from 'react';

import { action, computed, makeObservable, observable } from 'mobx';

import { updatePrivacySettings, deleteAccount } from '../../api/api';
import { GetAccountDetailsResponse, UpdatePrivacySettingsPayload } from '@cellxpert/api-types';
import AccountDetailsStore from '../AccountDetailsStore';

// TODO 1 - you need to store the current settings. so you could revert to them if the user cancels the form.
// TODO 2 - you should allow the user to check and uncheck all the privacy settings.
// TODO 3 - on save, if terms and conditions or privacy policy have changed, you should show a confirmation dialog. ///UPDATE, new flow
// TODO 4 - on save, if only marketing preferences have changed, you should show its confirmation dialog. // Update new flow

export interface PrivacySettingsFormFields {
  AgreedToTermsAndConditions?: boolean;
  AgreedToPrivacyPolicy?: boolean;
  AgreedToMarketingMaterial: boolean;
}

class PrivacySettingsForm {
  store: AccountDetailsStore;
  formFields: PrivacySettingsFormFields = {
    AgreedToTermsAndConditions: true,
    AgreedToPrivacyPolicy: true,
    AgreedToMarketingMaterial: false,
    // MarketingMaterial: this.store.rootStore.main.uiConfigByName,
  };

  constructor(store: AccountDetailsStore) {
    makeObservable(this, {
      // Observables
      formFields: observable,

      // Computeds
      privacySettingsData: computed,

      // Actions
      handleOptInOrOutMarketingMaterial: action,
      handleTermsAndConditionsOrPrivacyUncheck: action,
      handleCheckboxChange: action,

      // XHR Actions
    });
    this.store = store;
  }

  updateFormFields = (data: PrivacySettingsFormFields): void => {
    this.formFields = data;
  };

  get payload(): UpdatePrivacySettingsPayload {
    return mapPrivacySettingsFieldsClientToServer(this.formFields);
  }

  handleCheckboxChange =
    (fieldKey: keyof PrivacySettingsFormFields): ((e: ChangeEvent<HTMLInputElement>) => void) =>
    (e: ChangeEvent<HTMLInputElement>) => {
      this.formFields[fieldKey] = e.target.checked;
    };

  //STILL NEED IT???
  // get checked(): PrivacySettingsFormFields {
  //   return {
  //     AgreedToTermsAndConditions: this.formFields.AgreedToTermsAndConditions,
  //     AgreedToPrivacyPolicy: this.formFields.AgreedToPrivacyPolicy,
  //     AgreedToMarketingMaterial: this.formFields.AgreedToMarketingMaterial,
  //   };
  // }

  get privacySettingsData(): PrivacySettingsFormFields | undefined {
    const accountDetails = this.store.accountDetailsResponse?.AccountDetails[0];
    // console.log('aAsdASSAdadSADSAdsa', accountDetails?.AgreedToMarketingMaterial);
    if (!accountDetails) {
      return undefined;
    }
    return mapPrivacySettingsFieldsServerToClient(accountDetails);
  }

  handleOptInOrOutMarketingMaterial = async (): Promise<void> => {
    console.log('UPDATING MARKETING!!!!!!');
    const payload = this.payload;
    console.log(payload);
    this.store.rootStore.popups.openPopup('passwordConfirmation', {
      onConfirm: async (passwordVerify: string) => {
        try {
          const { data } = await updatePrivacySettings({ ...payload, passwordVerify });
          console.log(data);

          if (data.error) {
            throw new Error(data.reason);
          } else {
            this.store.rootStore.popups.closePopup();
          }
        } catch (err) {
          let error = 'unknown error';
          if (err instanceof Error) {
            error = err.message;
          }
          this.store.rootStore.popups.updatePopupProps({
            error,
          });
        }
      },
      onClose: () => {
        this.store.rootStore.popups.closePopup();
      },
    });
  };

  handleTermsAndConditionsOrPrivacyUncheck = async (
    key: 'AgreedToPrivacyPolicy' | 'AgreedToTermsAndConditions',
    //WIP Don't know if I can set event as boolean or not. Need further check
    e: { target: { checked: boolean } }
  ): Promise<void> => {
    if (e.target.checked !== true) {
      // const AgreedToPrivacyPolicy = this.store.accountDetailsResponse?.AccountDetails[0].AgreedToPrivacyPolicy;

      const payload = this.formFields;
      // const updatedValue = key + ' ' + e.target.checked;
      console.log(' BBBBBBBBBBBBBBBBBBB ', payload, key);

      // this.handleCheckboxChange(key);

      this.store.rootStore.popups.openPopup('termsAndConditionsPrivacy', {
        onConfirm: async (passwordVerify: string): Promise<void> => {
          try {
            const { data } = await updatePrivacySettings({ ...payload, passwordVerify });
            if (data.error) {
              throw new Error(data.reason);
            } else {
              this.store.rootStore.popups.closePopup();
              this.store.rootStore.auth.logout();
            }
          } catch (err) {
            let error = 'unknown error';
            if (err instanceof Error) {
              error = err.message;
            }
            this.store.rootStore.popups.updatePopupProps({
              error,
            });
          }
        },
        onClose: () => {
          console.log(
            'AujhdiajdakjdaskjdakjasbkjalsbKJDSAB',
            this.store.accountDetailsResponse?.AccountDetails[0].AgreedToTermsAndConditions
          );
          if (!this.store.privacySettingsForm.privacySettingsData) {
            return null;
          }
          console.log('THIS IS A TEST', this.formFields.AgreedToTermsAndConditions);

          this.formFields.AgreedToTermsAndConditions = true;
          this.store.rootStore.popups.closePopup();
          //STILL WIP!!! empty return just to fix error
          return {};
        },
      });
    }
  };

  deleteAccount = async (): Promise<void> => {
    const payload = this.payload;
    this.store.rootStore.popups.openPopup('deleteAccount', {
      onConfirm: async (passwordVerify: string) => {
        try {
          const { data } = await deleteAccount({ ...payload, passwordVerify });
          console.log(data);
          if (data.error) {
            throw new Error(data.reason);
          } else {
            this.store.rootStore.popups.closePopup();
          }
        } catch (err) {
          let error = 'unknown error';
          if (err instanceof Error) {
            error = err.message;
          }
          this.store.rootStore.popups.updatePopupProps({
            error,
          });
        }
      },
      onClose: () => {
        this.store.rootStore.popups.closePopup();
      },
    });
  };
}

export default PrivacySettingsForm;

function mapPrivacySettingsFieldsClientToServer({
  AgreedToTermsAndConditions,
  AgreedToPrivacyPolicy,
  AgreedToMarketingMaterial,
}: PrivacySettingsFormFields): UpdatePrivacySettingsPayload {
  return {
    AgreedToTermsAndConditions: AgreedToTermsAndConditions,
    AgreedToPrivacyPolicy: AgreedToPrivacyPolicy,
    AgreedToMarketingMaterial: AgreedToMarketingMaterial,
  };
}

function mapPrivacySettingsFieldsServerToClient({
  AgreedToMarketingMaterial,
}: GetAccountDetailsResponse['AccountDetails'][0]): PrivacySettingsFormFields {
  return {
    AgreedToMarketingMaterial: AgreedToMarketingMaterial,
  };
}
