import React from 'react';

import { flexStartCenter, theme, Theme } from '@cellxpert/theme';
import { Button, TextInput, Option, Select } from '@cellxpert/ui-lib';
import styled from '@emotion/styled';
import { observer } from 'mobx-react';

import PaymentDetailsForm, {
  PaymentDetailsFormFields,
  PaymentMethod,
} from '../../../../stores/models/PaymentDetailsForm';
import { useStore } from '../../../../stores/setupContext';
// eslint-disable-next-line import/no-unresolved
import { Messages } from '../../../../strings';
import PageContainer from '../../components/PageContainer/PageContainer';
import Section from '../../components/Section/Section';

export interface PaymentDetailsProps {
  paymentDetailsData: PaymentDetailsFormFields;
  formFields: PaymentDetailsFormFields;
  // handleTextFieldChange: PaymentDetailsForm[''];
  handleSubmit: PaymentDetailsForm['handleSubmit'];
  availablePaymentMethods: Option[];
  availablePaymentCurrencies: Option[];

  messages: Messages;
  // toggleEditMode: () => void;
  isEditMode: boolean;
  paymentMethodFields: FormField<keyof PaymentDetailsFormFields>[];
  selectedPaymentMethod: string;
  onPaymentMethodSelected: (key: PaymentMethod) => void;
  updateFormField: (fieldKey: keyof PaymentDetailsFormFields) => (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface FormField<T extends string = string> {
  key: T;
  label: string;
  placeholder: string;
  type: 'text';
}

const FormStyleFieldsWrapper = styled('div')(() => ({
  marginBottom: theme.gutters.base * 2,
}));

const ButtonWrapper = styled('div')(() => ({
  ...flexStartCenter,
}));

const AdditionalFormLabels = styled('div')(() => ({
  ...theme.typography.meta.caption,
  color: theme.palette.text.main,
  marginBottom: theme.gutters.base * 1,
}));

const paymentDetailsGeneralInformation: Array<{
  key: Extract<keyof PaymentDetailsFormFields, 'paymentCurrency' | 'accountType' | 'vatIdNumber'>;
  label: string;
  placeholder: string;
  type: 'text';
}> = [
  {
    key: 'paymentCurrency',
    label: 'Payment currency',
    placeholder: 'Please select currency',
    type: 'text',
  },
  {
    key: 'accountType',
    label: 'Account Type',
    placeholder: 'Please select your account type',
    type: 'text',
  },
  {
    key: 'vatIdNumber',
    label: 'VAT identification number',
    placeholder: 'Please insert the VAT identification number',
    type: 'text',
  },
];

export const PaymentDetails: React.FunctionComponent<PaymentDetailsProps> = ({
  onPaymentMethodSelected,
  availablePaymentMethods,
  formFields,
  paymentMethodFields,
  // paymentDetailsData,
  updateFormField,
  availablePaymentCurrencies,
  selectedPaymentMethod,
  // isEditMode,
  handleSubmit,
}) => {
  console.log({ selectedPaymentMethod });
  return (
    <>
      <PageContainer>
        <form
          {...{
            onSubmit: () => {
              handleSubmit();
            },
          }}
        >
          <Section
            {...{
              title: 'General Information',
              marginTop: `${theme.gutters.base * 5}px`,
              marginBottom: `${theme.gutters.base * 2}px`,
            }}
          >
            <Select
              {...{
                options: availablePaymentCurrencies,
                label: 'Payment currency',
                searchPlaceholder: 'Search...',
                // onClick: (e) => e.stopPropagation(),
                variant: 'regular',
                size: 'small',
                onChange: () => {
                  // onPaymentMethodSelected((option as Option).key as PaymentMethod);
                },
              }}
            />
            <Select
              {...{
                options: availablePaymentMethods,
                label: 'Account type',
                searchPlaceholder: 'Search...',
                variant: 'regular',
                size: 'small',
                helper: 'Are you a private affiliate? or a company?',
                // onClick: (e) => e.stopPropagation(),
                onChange: () => {
                  // onPaymentMethodSelected(option.key as PaymentMethod);
                },
              }}
            />
            {paymentDetailsGeneralInformation
              .filter((field) => field.key === 'vatIdNumber')
              .map((field) => {
                return (
                  <FormStyleFieldsWrapper key={field.key}>
                    <TextInput
                      {...{
                        key: field.key,
                        label: field.label,
                        placeholder: field.placeholder,
                        value: formFields[field.key],
                        onChange: updateFormField(field.key),
                      }}
                    />
                  </FormStyleFieldsWrapper>
                );
              })}
          </Section>
          <Section
            {...{
              title: 'Payment Method',
              marginTop: `${theme.gutters.base * 5}px`,
              marginBottom: `${theme.gutters.base * 2}px`,
            }}
          >
            <Select
              {...{
                options: availablePaymentMethods,
                label: 'Payment Method',
                searchPlaceholder: 'Search...',
                // onClick: (e) => e.stopPropagation(),
                selected: { key: selectedPaymentMethod, value: selectedPaymentMethod, label: selectedPaymentMethod },
                variant: 'regular',
                size: 'small',

                onChange: (option) => {
                  console.log({ option });
                  onPaymentMethodSelected((option as Option).key as PaymentMethod);
                },
              }}
            />
            {paymentMethodFields.map((field) => {
              return (
                <FormStyleFieldsWrapper key={field.key}>
                  {field.key === 'firstName' ? (
                    <AdditionalFormLabels {...{ variant: 'caption', color: 'main' }}>
                      Account Beneficiary
                    </AdditionalFormLabels>
                  ) : field.key === 'accountNumber' ? (
                    <AdditionalFormLabels>Account details</AdditionalFormLabels>
                  ) : field.key === 'bankName' ? (
                    <AdditionalFormLabels>Bank details</AdditionalFormLabels>
                  ) : null}
                  <TextInput
                    {...{
                      key: field.key,
                      label: field.label,
                      placeholder: field.placeholder,
                      value: String(formFields[field.key]),
                      onChange: updateFormField(field.key),
                      helper: field.key === 'ABANumber' ? 'For U.S only' : undefined,
                    }}
                  />
                </FormStyleFieldsWrapper>
              );
            })}
          </Section>
          <ButtonWrapper>
            <Button
              {...{
                type: 'submit',
                onClick: (e) => {
                  e.preventDefault();
                  return handleSubmit();
                },
                label: 'Save',
              }}
            >
              Save
            </Button>
            <Button
              {...{
                type: 'button',
                variant: 'ghostBlue',
                label: 'Cancel',
              }}
            >
              Cancel
            </Button>
          </ButtonWrapper>
        </form>
      </PageContainer>
    </>
  );
};

const Observed = observer(PaymentDetails);

const WithStoreConnection = () => {
  const { accountDetails, i18n } = useStore();

  const { paymentDetails } = accountDetails;

  const {
    isEditMode,
    // toggleEditMode,
    paymentDetailsData,
    formFields,
    paymentMethodFields,
    onPaymentMethodSelected,
    // handleTextFieldChange,
    handleSubmit, //sends to the store and tries to send the updated data
    updateFormField,
    selectedPaymentMethod,
    availablePaymentMethods,
    availablePaymentCurrencies,
  } = paymentDetails;
  const { messages } = i18n;

  if (!formFields) {
    return null;
  }

  return (
    <Observed
      {...{
        isEditMode,
        // toggleEditMode,
        paymentDetailsData: paymentDetailsData as PaymentDetailsFormFields,
        messages,
        formFields,
        paymentMethodFields,
        onPaymentMethodSelected,
        availablePaymentMethods,
        updateFormField,
        selectedPaymentMethod,
        availablePaymentCurrencies,
        // handleTextFieldChange,
        handleSubmit,
      }}
    />
  );
};

export default observer(WithStoreConnection);
