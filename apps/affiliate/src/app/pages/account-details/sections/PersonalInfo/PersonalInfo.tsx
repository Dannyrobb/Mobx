import * as React from 'react';

import { EditIcon } from '@cellxpert/icons';
import { flexEndCenter, Theme, theme } from '@cellxpert/theme';
import { TextInput, Button, PhonePicker } from '@cellxpert/ui-lib';
import styled from '@emotion/styled';
import { observer } from 'mobx-react';
import { IntlShape, useIntl } from 'react-intl';

import PersonalInfoForm, { PersonalInfoFormFields } from '../../../../stores/models/PersonalInfoForm';
import { useStore } from '../../../../stores/setupContext';
// eslint-disable-next-line import/no-unresolved
import { Messages } from '../../../../strings';
import PageContainer from '../../components/PageContainer/PageContainer';
import Section from '../../components/Section/Section';

export interface PersonalInfoProps {
  personalInfoData: PersonalInfoFormFields;
  formFields: PersonalInfoFormFields;
  handleTextFieldChange: PersonalInfoForm['handleTextFieldChange'];
  handleSubmit: PersonalInfoForm['handleSubmit'];
  messages: Messages;
  toggleEditMode: () => void;
  isEditMode: boolean;
}

const userNameFields: Array<{
  // key: "firstName" | "lastName";
  // key: Pick<FormFields, "firstName" | "lastName">;
  key: Extract<keyof PersonalInfoFormFields, 'firstName' | 'lastName'>;
  label: string;
  placeholder: string;
  type: 'text';
}> = [
  {
    key: 'firstName',
    placeholder: 'Enter your first name',
    label: 'First name',
    type: 'text',
  },
  {
    key: 'lastName',
    placeholder: 'Enter your last name',
    label: 'Last name',
    type: 'text',
  },
];

const contactInfoFields: Array<{
  key: Extract<keyof PersonalInfoFormFields, 'email' | 'phone' | 'skype' | 'telegram'>;
  label: string;
  placeholder: string;
  type: 'text';
}> = [
  {
    key: 'email',
    placeholder: 'Add an email',
    label: 'Email',
    type: 'text',
  },
  {
    key: 'phone',
    placeholder: 'Add a phone number',
    label: 'Phone',
    type: 'text',
  },
  {
    key: 'skype',
    placeholder: 'Add a Skype user name',
    label: 'Skype',
    type: 'text',
  },
  {
    key: 'telegram',
    placeholder: 'Add a telegram number',
    label: 'Telegram',
    type: 'text',
  },
];

const addressInfoFields: (
  intl: IntlShape,
  messages: Messages
) => Array<{
  key: Extract<keyof PersonalInfoFormFields, 'country' | 'city' | 'address' | 'state' | 'postcode'>;
  label: string;
  placeholder: string;
  type: 'text';
}> = (intl) => [
  {
    key: 'country',
    placeholder: 'Add a country',
    label: intl.formatMessage({ id: 'account_details.personal_fields.country' }),
    type: 'text',
  },
  {
    key: 'city',
    placeholder: 'Add a city',
    label: 'City',
    type: 'text',
  },
  {
    key: 'address',
    placeholder: 'Add an address',
    label: 'Address',
    type: 'text',
  },
  {
    key: 'state',
    placeholder: 'Add a state',
    label: 'State',
    type: 'text',
  },
  {
    key: 'postcode',
    placeholder: 'Add a postcode',
    label: 'Postcode / ZIP code',
    type: 'text',
  },
];

const ButtonWrapper = styled('div')(() => ({
  ...flexEndCenter,
}));

const FormStyleFieldsWrapper = styled('div')(() => ({
  marginBottom: theme.gutters.base * 4,
}));

export const PersonalInfo: React.FunctionComponent<PersonalInfoProps> = ({
  formFields,
  personalInfoData,
  handleTextFieldChange,
  handleSubmit,
  messages,
  toggleEditMode,
  isEditMode,
}) => {
  const intl = useIntl();
  return (
    <>
      <PageContainer>
        <form
          {...{
            onSubmit: () => {
              // e.preventDefault();
              handleSubmit();
            },
          }}
        >
          <Section
            {...{
              title: 'User Name',
              color: 'primary',
              marginTop: `${theme.gutters.base * 1}px`,
              marginBottom: `${theme.gutters.base * 3}px`,
            }}
          >
            {userNameFields.map((field) => {
              return (
                <FormStyleFieldsWrapper key={field.key}>
                  <TextInput
                    key={field.key}
                    {...{
                      label: field.label,
                      placeholder: field.placeholder,
                      value: !isEditMode ? formFields[field.key] : personalInfoData[field.key],
                      onChange: handleTextFieldChange(field.key),
                      readOnly: isEditMode,
                    }}
                  />
                </FormStyleFieldsWrapper>
              );
            })}
          </Section>
          <Section
            {...{
              title: 'Contact Info',
              marginTop: `${theme.gutters.base * 1}px`,
              marginBottom: `${theme.gutters.base * 3}px`,
            }}
          >
            {contactInfoFields.map((field) => {
              return (
                <FormStyleFieldsWrapper key={field.key}>
                  {field.key === 'phone' ? (
                    <PhonePicker {...{ label: 'Phone', readOnly: isEditMode }} />
                  ) : (
                    <TextInput
                      key={field.key}
                      {...{
                        label: field.label,
                        placeholder: field.placeholder,
                        value: !isEditMode ? formFields[field.key] : personalInfoData[field.key],
                        onChange: handleTextFieldChange(field.key),
                        readOnly: isEditMode,
                      }}
                    />
                  )}
                </FormStyleFieldsWrapper>
              );
            })}
          </Section>
          <Section
            {...{
              title: 'Addresses',
              marginTop: `${theme.gutters.base * 1}px`,
              marginBottom: `${theme.gutters.base * 3}px`,
            }}
          >
            {addressInfoFields(intl, messages).map((field) => {
              return (
                <FormStyleFieldsWrapper key={field.key}>
                  <TextInput
                    key={field.key}
                    {...{
                      label: field.label,
                      placeholder: field.placeholder,
                      value: !isEditMode ? formFields[field.key] : personalInfoData[field.key],
                      onChange: handleTextFieldChange(field.key),
                      readOnly: isEditMode,
                    }}
                  />
                </FormStyleFieldsWrapper>
              );
            })}
          </Section>
          <ButtonWrapper>
            {!isEditMode ? (
              <>
                <Button
                  {...{
                    type: 'button',
                    variant: 'secondary',
                    onClick: () => {
                      // e.preventDefault();
                      toggleEditMode();
                    },
                    label: 'Cancel',
                  }}
                >
                  Cancel
                </Button>
                <div style={{ width: '15px' }} />
                <Button
                  {...{
                    type: 'submit',
                    onClick: (e) => {
                      e.preventDefault();
                      toggleEditMode();
                      return handleSubmit();
                    },
                    label: 'Save',
                  }}
                >
                  Save
                </Button>
              </>
            ) : (
              <Button
                {...{
                  type: 'button',
                  onClick: () => {
                    // e.preventDefault();
                    toggleEditMode();
                  },
                  variant: 'primary',
                  label: 'Edit info',
                  icon: <EditIcon {...{ color: 'contrast', width: 32, height: 32 }} />,
                }}
              >
                Edit info
              </Button>
            )}
          </ButtonWrapper>
        </form>
      </PageContainer>
    </>
  );
};

const Observed = observer(PersonalInfo);

const WithStoreConnection = () => {
  const { accountDetails, i18n } = useStore();

  const { personalInfoForm } = accountDetails;
  const { isEditMode, toggleEditMode, personalInfoData, formFields, handleTextFieldChange, handleSubmit } =
    personalInfoForm;
  const { messages } = i18n;

  if (!personalInfoData) {
    return null;
  }

  return (
    <Observed
      {...{
        isEditMode,
        toggleEditMode,
        personalInfoData,
        messages,
        formFields,
        handleTextFieldChange,
        handleSubmit,
      }}
    />
  );
};

export default observer(WithStoreConnection);
