import { TabItem, TabsProps } from '@cellxpert/ui-lib';
import { action, computed, makeObservable, observable } from 'mobx';

import DocumentsForm from './models/DocumentsForm';
import PaymentDetails from './models/PaymentDetailsForm';
import PersonalInfoForm from './models/PersonalInfoForm';
import ResetPasswordForm from './models/ResetPasswordForm';
import StoreBase from './StoreBase';

import { getAccountDetails, getAffiliateDocuments } from '../api/api';
import { GetAccountDetailsResponse, GetAffiliateDocumentsResponse } from '@cellxpert/api-types';
import { accountDetailsTabs, TabWithPermissionKey } from '../pages/account-details/sections/account-details-tabs';
import PrivacySettingsForm from './models/PrivacySettingsForm';

class AccountDetailsStore extends StoreBase {
  public accountDetailsResponse: GetAccountDetailsResponse | null = null;
  public affiliateDocoumentsResponse: GetAffiliateDocumentsResponse | null = null;

  personalInfoForm: PersonalInfoForm = new PersonalInfoForm(this);
  documentsForm: DocumentsForm = new DocumentsForm(this);

  paymentDetails: PaymentDetails = new PaymentDetails(this);
  resetPasswordForm: ResetPasswordForm = new ResetPasswordForm(this);
  privacySettingsForm: PrivacySettingsForm = new PrivacySettingsForm(this);

  confirmationPassword: string | null = null;

  public activeTabKey: string | null = null;

  constructor() {
    super();
    makeObservable(this, {
      // Observables -
      activeTabKey: observable,
      accountDetailsResponse: observable,
      personalInfoForm: observable,
      resetPasswordForm: observable,
      confirmationPassword: observable,
      privacySettingsForm: observable,
      // Computeds -
      tabs: computed,
      tabContent: computed,
      accountDetailsTabs: computed,
      // Actions
      setActiveTab: action,
      setConfirmationPassword: action,
      // XHR Actions
      getAccountDetails: action,
      getAffiliateDocuments: action,
    });
  }

  get accountDetailsTabs(): TabWithPermissionKey[] {
    return accountDetailsTabs(this.rootStore.i18n.intl);
  }

  get tabs(): TabsProps['tabs'] {
    return this.accountDetailsTabs
      .filter((tab) => {
        // @ts-ignore
        return tab.permissionKey ? this.rootStore.permissions[tab.permissionKey] : true;
      })
      .map((tab) => ({
        id: tab.id,
        isDisabled: false,
        label: tab.label,
      }));
  }

  get tabContent(): TabItem['content'] {
    console.log('this.activeTabKey', this.activeTabKey);
    return this.accountDetailsTabs.find((tab) => tab.id === this.activeTabKey)?.content;
  }

  get isCompany(): boolean {
    return Boolean(this.accountDetailsResponse?.AccountDetails[0].IsCompany);
  }

  public setActiveTab = (tabKey: string): void => {
    this.activeTabKey = tabKey;
  };

  public setConfirmationPassword = (password: string): void => {
    this.confirmationPassword = password;
  };

  public getAffiliateDocuments = async (): Promise<void> => {
    try {
      const { data } = await getAffiliateDocuments();
      this.affiliateDocoumentsResponse = data;
    } catch (err) {
      console.error('error', err);
    }
  };

  public getAccountDetails = async (): Promise<void> => {
    try {
      this.rootStore.main.setLoading(false);
      const { data } = await getAccountDetails();
      this.accountDetailsResponse = data;
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      this.personalInfoForm.updateFormFields(data);
    } catch (error) {
      console.error('error', error);
      this.rootStore.main.setLoading(false);
    }
  };
}

export default AccountDetailsStore;
