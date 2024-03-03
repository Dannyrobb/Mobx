import { ChangeEvent } from 'react';

import { action, computed, makeObservable, observable } from 'mobx';

import { updatePersonalInfo } from '../../api/api';
import { GetAccountDetailsResponse, UpdatePersonalInfoPayload } from '@cellxpert/api-types';
import AccountDetailsStore from '../AccountDetailsStore';

export interface PersonalInfoFormFields {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  skype: string;
  telegram: string;
  country: string;
  city: string;
  address: string;
  state: string;
  postcode: string;
}

class PersonalInfoForm {
  store: AccountDetailsStore;
  isEditMode: boolean = true;
  formFields: PersonalInfoFormFields = {
    firstName: 'La la las',
    lastName: 'asdfd',
    email: 'alex@thesashka.com',
    skype: '',
    phone: '',
    telegram: '',
    country: '',
    city: '',
    address: '',
    state: '',
    postcode: '',
  };

  constructor(store: AccountDetailsStore) {
    makeObservable(this, {
      // Observables
      isEditMode: observable,
      formFields: observable,

      // Computeds
      personalInfoData: computed,
      // Actions
      toggleEditMode: action,
      handleTextFieldChange: action,

      // XHR Actions
      handleSubmit: action,
    });
    this.store = store;
  }

  toggleEditMode = (): void => {
    this.isEditMode = !this.isEditMode;
  };

  updateFormFields = (data: PersonalInfoFormFields): void => {
    this.formFields = data;
  };

  get payload(): UpdatePersonalInfoPayload {
    return mapPersonalInfoFieldsClientToServer(this.formFields);
  }

  handleTextFieldChange =
    (fieldKey: keyof PersonalInfoFormFields): ((e: ChangeEvent<HTMLInputElement>) => void) =>
    (e: ChangeEvent<HTMLInputElement>) => {
      this.formFields[fieldKey] = e.target.value;
    };

  get personalInfoData(): PersonalInfoFormFields | null {
    const accountDetails = this.store.accountDetailsResponse?.AccountDetails[0];
    console.log({ accountDetails });
    if (!accountDetails) {
      return null;
    }
    return mapPersonalInfoFieldsServerToClient(accountDetails);
  }

  handleSubmit = async (): Promise<void> => {
    this.store.rootStore.main.setLoading(true);
    const payload = this.payload;
    console.log({ payload });
    this.store.rootStore.popups.openPopup('passwordConfirmation', {
      onConfirm: async (password: string) => {
        window.alert('please make it work' + password);
        try {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-ignore
          await updatePersonalInfo({ ...payload, password });
          this.store.rootStore.main.setLoading(false);
        } catch (error) {
          window.alert('caught');
          // this.store.rootStore.snackbar.open('shits broken')
          this.store.rootStore.popups.setPopupProps({
            error: 'alex',
          });
          this.store.rootStore.main.setLoading(false);
        }
      },
      onClose: () => {
        this.store.rootStore.popups.closePopup();
      },
    });
  };
}

export default PersonalInfoForm;

function mapPersonalInfoFieldsClientToServer({
  firstName,
  lastName,
  email,
  skype,
  phone,
  telegram,
  country,
  city,
  address,
  state,
  postcode,
}: PersonalInfoFormFields): UpdatePersonalInfoPayload {
  return {
    firstname: firstName,
    lastname: lastName,
    email: email ?? '',
    skype: skype ?? '',
    phone: phone ?? '',
    Telegram: telegram ?? '',
    country: country ?? '',
    city: city ?? '',
    address: address ?? '',
    state: state ?? '',
    postcode: postcode ?? '',
  };
}

function mapPersonalInfoFieldsServerToClient({
  firstname,
  lastname,
  email,
  skype,
  phone,
  Telegram,
  country,
  city,
  address,
  state,
  postcode,
}: GetAccountDetailsResponse['AccountDetails'][0]): PersonalInfoFormFields {
  return {
    firstName: firstname,
    lastName: lastname,
    email: email ?? '',
    skype: skype ?? '',
    phone: phone ?? '',
    telegram: Telegram ?? '',
    country: country ?? '',
    city: city ?? '',
    address: address ?? '',
    state: state ?? '',
    postcode: postcode ?? '',
  };
}
