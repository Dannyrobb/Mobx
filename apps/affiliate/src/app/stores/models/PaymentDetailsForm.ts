import { ChangeEvent, FormEvent } from 'react';

import type { Option } from '@cellxpert/ui-lib';
import { action, computed, makeObservable, observable } from 'mobx';

import { updatePaymentDetails } from '../../api/api';
import { UpdatePaymentDetailsPayload } from '@cellxpert/api-types';
import { FormField } from '../../pages/account-details/sections/PaymentDetails/PaymentDetails';
import { extractDataType } from '../../utils/convert-permission-type';
import AccountDetailsStore from '../AccountDetailsStore';

export interface PaymentDetailsFormFields {
  paymentCurrency: string;
  accountType: string;
  vatIdNumber: string;
  paymentMethod: PaymentMethod;
  vatNumber: string;
  paymentAddress: string;
  isCompany: boolean;
  firstName: string;
  lastName: string;
  accNumber: string;
  bankName: string;
  bankBranch: string;
  bankCountry: string;
  bankCity: string;
  swiftCode: string;
  ibanNumber: string;
  abaRoutingNumber: string;
  accountBeneficiary: string;
  accountNumber: string;
  IBANNumber: string;
  ABANumber: string;
  bankCorrespondent: string;
  payPalEmail: string;
  moneyBookersEmail: string;
  ecoCardAccountNumber: string;
  skrillEmail: string;
  QIWIEWalletNumber: string;
  yandexEWalletNumber: string;
  webMoneyEWalletNumber: string;
  tradingAccountId: string;
  bitcoinWalletAddress: string;
  mybitwalletEmail: string;
  netTellerEmail: string;
  netTellerAccountNumber: string;
  payoneerId: string;
  payoneerUsername: string;
  ecopayzAccountName: string;
  ecopayzAccountNumber: string;
}

export type PaymentMethod =
  | 'WireTransfer'
  | 'PayPal'
  | 'Skrill'
  | 'NetTeller'
  | 'WebMoney'
  | 'QIWI'
  | 'Yandex'
  | 'TradingAccount'
  | 'Payoneer'
  | 'mybitwallet'
  | 'ecoPayz'
  | 'MoneyBookers'
  | 'Bitcoin';

const paymentFieldsByMethod: Record<PaymentMethod, (keyof PaymentDetailsFormFields)[]> = {
  WireTransfer: [
    'firstName',
    'lastName',
    'accountNumber',
    'bankName',
    'bankBranch',
    'bankCountry',
    'bankCity',
    'swiftCode',
    'IBANNumber',
    'ABANumber',
    'bankCorrespondent',
  ],
  Payoneer: ['payoneerId', 'payoneerUsername'],
  PayPal: ['payPalEmail'],
  Bitcoin: ['bitcoinWalletAddress'],
  ecoPayz: ['ecopayzAccountName', 'ecopayzAccountNumber'],
  MoneyBookers: ['moneyBookersEmail'],
  mybitwallet: ['mybitwalletEmail'],
  NetTeller: ['netTellerAccountNumber', 'netTellerEmail'],
  QIWI: ['QIWIEWalletNumber'],
  Skrill: ['skrillEmail'],
  TradingAccount: ['tradingAccountId'],
  WebMoney: ['webMoneyEWalletNumber'],
  Yandex: ['yandexEWalletNumber'],
};

class PaymentDetailsGIForm {
  store: AccountDetailsStore;
  isEditMode: boolean = false;
  formFields: PaymentDetailsFormFields = {
    paymentCurrency: '',
    accountType: '',
    vatIdNumber: '',
    paymentMethod: 'WireTransfer',
    vatNumber: '',
    paymentAddress: '',
    isCompany: false,
    firstName: '',
    lastName: '',
    accNumber: '',
    bankName: '',
    bankBranch: '',
    bankCountry: '',
    bankCity: '',
    swiftCode: '',
    ibanNumber: '',
    abaRoutingNumber: '',
    accountBeneficiary: '',
    accountNumber: '',
    IBANNumber: '',
    ABANumber: '',
    bankCorrespondent: '',
    payPalEmail: '',
    moneyBookersEmail: '',
    ecoCardAccountNumber: '',
    skrillEmail: '',
    QIWIEWalletNumber: '',
    yandexEWalletNumber: '',
    webMoneyEWalletNumber: '',
    tradingAccountId: '',
    bitcoinWalletAddress: '',
    mybitwalletEmail: '',
    netTellerEmail: '',
    netTellerAccountNumber: '',
    payoneerId: '',
    payoneerUsername: '',
    ecopayzAccountName: '',
    ecopayzAccountNumber: '',
  };

  constructor(store: AccountDetailsStore) {
    makeObservable(this, {
      // Observables
      isEditMode: observable,
      formFields: observable,
      // Computeds
      availablePaymentMethods: computed,
      availablePaymentCurrencies: computed,
      paymentDetailsData: computed,
      paymentMethodFields: computed,
      // Actions
      onPaymentMethodSelected: action,
      // XHR Actions
      handleSubmit: action,
    });
    this.store = store;
  }

  handleSubmit = async (): Promise<void> => {
    this.store.rootStore.main.setLoading(true);
    const payload = this.payload;
    this.store.rootStore.popups.openPopup('passwordConfirmation', {
      onConfirm: async (passwordVerify: string) => {
        try {
          const { data } = await updatePaymentDetails({ ...payload, passwordVerify });
          console.log(data);

          if (data.error) {
            throw new Error(data.reason);
          } else {
            this.store.rootStore.popups.closePopup();
          }
          this.store.rootStore.main.setLoading(false);
        } catch (err) {
          let error = 'unknown error';
          if (err instanceof Error) {
            error = err.message;
          }
          this.store.rootStore.popups.updatePopupProps({
            error,
          });
          this.store.rootStore.main.setLoading(false);
        }
      },
      onClose: () => {
        this.store.rootStore.popups.closePopup();
      },
    });
  };

  get availablePaymentCurrencies(): Option[] {
    if (!this.store.rootStore.main.uiConfigByName) {
      return [];
    }

    const paymentCurrenciesFromConfig = extractDataType(this.store.rootStore.main.uiConfigByName.PaymentCurrencies)?.[
      'PaymentCurrencies'
    ] as Array<string>;

    if (!paymentCurrenciesFromConfig) {
      return [];
    }

    return paymentCurrenciesFromConfig.map((currency: string) => ({
      key: currency,
      label: currency,
      value: currency,
    }));
    // return paymentCurrenciesFromConfig;
  }

  get availablePaymentMethods(): Option[] {
    if (!this.store.rootStore.main.uiConfigByName) {
      return [];
    }

    const paymentMethodsFromConfig = extractDataType(this.store.rootStore.main.uiConfigByName.AllowedPaymentMethods)?.[
      'AllowedPaymentMethods'
    ] as Array<string>;

    if (!paymentMethodsFromConfig) {
      return [];
    }

    return paymentMethodsFromConfig.map((paymentMethod) => {
      return {
        key: paymentMethod,
        value: paymentMethod,
        label: paymentMethod,
      };
    });
  }

  get payload(): UpdatePaymentDetailsPayload {
    return mapPaymentDetailsFieldsClientToServer(this.formFields);
  }

  get selectedPaymentMethod(): PaymentMethod {
    return this.formFields.paymentMethod;
  }

  get paymentMethodFields(): FormField<keyof PaymentDetailsFormFields>[] {
    const strings = this.store.rootStore.i18n.messages;
    console.log({ strings });
    return paymentFieldsByMethod[this.selectedPaymentMethod].map((field) => {
      return {
        key: field,
        label: field,
        type: 'text',
        placeholder: field,
      };
    });
  }

  get paymentDetailsData(): PaymentDetailsFormFields | null {
    const accountDetails = this.store.accountDetailsResponse?.AccountDetails[0];
    if (!accountDetails) {
      return null;
    }
    return mapPaymentDetailsFieldsServerToClient(accountDetails);
  }

  onPaymentMethodSelected = (key: PaymentMethod): void => {
    this.formFields.paymentMethod = key;
  };

  updateFormField =
    (fieldKey: keyof PaymentDetailsFormFields) =>
    (e: ChangeEvent<HTMLInputElement>): void => {
      this.formFields = {
        ...this.formFields,
        [fieldKey]: e.target.value,
      };
    };
}

export default PaymentDetailsGIForm;

function mapPaymentDetailsFieldsClientToServer({
  paymentCurrency,
  // accountType,
  // vatIdNumber,
  paymentMethod,
  vatNumber,
  paymentAddress,
  isCompany,
  // firstName,
  // lastName,
  // accNumber,
  bankName,
  bankBranch,
  bankCountry,
  bankCity,
  swiftCode,
  // ibanNumber,
  // abaRoutingNumber,
  accountBeneficiary,
  accountNumber,
  IBANNumber,
  ABANumber,
  bankCorrespondent,
  payPalEmail,
  moneyBookersEmail,
  ecoCardAccountNumber,
  skrillEmail,
  QIWIEWalletNumber,
  yandexEWalletNumber,
  webMoneyEWalletNumber,
  tradingAccountId,
  bitcoinWalletAddress,
  mybitwalletEmail,
  netTellerEmail,
  // netTellerAccountNumber,
  payoneerId,
  payoneerUsername,
  ecopayzAccountName,
  ecopayzAccountNumber,
}: PaymentDetailsFormFields): UpdatePaymentDetailsPayload {
  return {
    PaymentMethod: paymentMethod,
    PaymentCurrency: paymentCurrency,
    PaymentAddress: paymentAddress,
    IsCompany: isCompany,
    VATNumber: vatNumber,
    AccountBeneficiary: accountBeneficiary,
    AccountNumber: accountNumber,
    BankName: bankName,
    BankBranch: bankBranch,
    BankCountry: bankCountry,
    BankCity: bankCity,
    SwiftCode: swiftCode,
    IBANNumber,
    ABANumber,
    BankCorrespondent: bankCorrespondent,
    PayPalEmail: payPalEmail,
    MoneyBookersEmail: moneyBookersEmail,
    EcoCardAccountNumber: ecoCardAccountNumber,
    SkrillEmail: skrillEmail,
    QIWIEWalletNumber,
    YandexEWalletNumber: yandexEWalletNumber,
    WebMoneyEWalletNumber: webMoneyEWalletNumber,
    TradingAccountId: tradingAccountId,
    BitcoinWalletAddress: bitcoinWalletAddress,
    mybitwalletEmail,
    NetTellerEmail: netTellerEmail,
    NetTellerAccountNumber: netTellerEmail,
    PayoneerId: payoneerId,
    PayoneerUsername: payoneerUsername,
    ecopayzAccountName,
    ecopayzAccountNumber,
  };
}

function mapPaymentDetailsFieldsServerToClient({
  // PaymentMethod,
  // PaymentCurrency,
  // PaymentAddress,
  // IsCompany,
  // VATNumber,
  // AccountBeneficiary,
  // AccountNumber,
  // BankName,
  // BankBranch,
  // BankCountry,
  // BankCity,
  // SwiftCode,
  // IBANNumber,
  // ABANumber,
  // BankCorrespondent,
  // PayPalEmail,
  // MoneyBookersEmail,
  // EcoCardAccountNumber,
  // SkrillEmail,
  // QIWIEWalletNumber,
  // YandexEWalletNumber,
  // WebMoneyEWalletNumber,
  // TradingAccountId,
  // BitcoinWalletAddress,
  // mybitwalletEmail,
  // NetTellerEmail,
  // NetTellerAccountNumber,
  // PayoneerId,
  // PayoneerUsername,
  // ecopayzAccountName,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ecopayzAccountNumber,
}: UpdatePaymentDetailsPayload): PaymentDetailsFormFields {
  return {
    paymentCurrency: '',
    accountType: '',
    vatIdNumber: '',
    paymentMethod: 'WireTransfer',
    vatNumber: '',
    paymentAddress: '',
    isCompany: false,
    firstName: '',
    lastName: '',
    accNumber: '',
    bankName: '',
    bankBranch: '',
    bankCountry: '',
    bankCity: '',
    swiftCode: '',
    ibanNumber: '',
    abaRoutingNumber: '',
    accountBeneficiary: '',
    accountNumber: '',
    IBANNumber: '',
    ABANumber: '',
    bankCorrespondent: '',
    payPalEmail: '',
    moneyBookersEmail: '',
    ecoCardAccountNumber: '',
    skrillEmail: '',
    QIWIEWalletNumber: '',
    yandexEWalletNumber: '',
    webMoneyEWalletNumber: '',
    tradingAccountId: '',
    bitcoinWalletAddress: '',
    mybitwalletEmail: '',
    netTellerEmail: '',
    netTellerAccountNumber: '',
    payoneerId: '',
    payoneerUsername: '',
    ecopayzAccountName: '',
    ecopayzAccountNumber: '',
  };
}
