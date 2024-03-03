import * as React from 'react';

import { TrashIcon } from '@cellxpert/icons';
import { flexCenterCenter, flexStartCenter, Theme } from '@cellxpert/theme';
import { Button, Checkbox, Link, Typography } from '@cellxpert/ui-lib';
import styled from '@emotion/styled';
import { observer } from 'mobx-react';

import PrivacySettingsForm, { PrivacySettingsFormFields } from '../../../../stores/models/PrivacySettingsForm';
import { useStore } from '../../../../stores/setupContext';
import PageContainer from '../../components/PageContainer/PageContainer';

export interface PrivacySettingsProps {
  handleOptInOrOutMarketingMaterial: () => void;
  deleteAccount: () => void;
  privacySettingsData: PrivacySettingsFormFields | undefined;
  handleTermsAndConditionsOrPrivacyUncheck: PrivacySettingsForm['handleTermsAndConditionsOrPrivacyUncheck'];
  handleCheckboxChange: PrivacySettingsForm['handleCheckboxChange'];
}

const Container = styled('div')(() => ({
  ...flexCenterCenter,
  flexDirection: 'column',
}));

const Disclaimer = styled('span')(({ theme }) => ({
  ...theme.typography.meta.body2,
  lineHeight: 1.43,
  color: theme.palette.text.main,
  width: theme.gutters.base * 72,
  padding: `${theme.gutters.base * 4.125}px ${theme.gutters.base * 2}px ${theme.gutters.base * 3.5}px ${
    theme.gutters.base * 2
  }px`,
}));

const TermsWrapper = styled('div')(({ theme }) => ({
  height: theme.gutters.base * 13.5,
  width: theme.gutters.base * 72,
  padding: `${theme.gutters.base * 3}px ${theme.gutters.base * 2}px ${theme.gutters.base * 3.25}px ${
    theme.gutters.base * 2
  }px`,
}));

const TermHeaderAndAgreement = styled(Typography)(({ theme }) => ({
  marginBottom: theme.gutters.base * 2.25,
}));

const UserAgreement = styled('div')(() => ({
  ...flexStartCenter,
}));

const Hr = styled('hr')(({ theme }) => ({
  width: theme.gutters.base * 72,
  opacity: 0.4,
  margin: 0,
}));

const DeleteMyAccount = styled('div')(({ theme }) => ({
  ...flexStartCenter,
  height: theme.gutters.base * 8.625,
  width: theme.gutters.base * 72,
}));

export const PrivacySettings: React.FunctionComponent<PrivacySettingsProps> = ({
  deleteAccount,
  handleOptInOrOutMarketingMaterial,
  handleTermsAndConditionsOrPrivacyUncheck,
  privacySettingsData,
  handleCheckboxChange: handleCheckboxChange,
}) => {
  return (
    <>
      {JSON.stringify(privacySettingsData)}

      <PageContainer>
        <form
          {...{
            onSubmit: (e) => {
              e.preventDefault();
            },
          }}
        >
          <Container>
            <Disclaimer>
              Please note that your consent to the following terms and conditions and privacy policy is mandatory in
              order to be GDPR compliant. You may withdraw your consent at any time however, you will be automatically
              logged out from the system.
            </Disclaimer>
            <TermsWrapper>
              <TermHeaderAndAgreement {...{ variant: 'h6', color: 'main' }}>
                Terms and conditions
              </TermHeaderAndAgreement>
              <UserAgreement>
                <Checkbox
                  {...{
                    key: 'AgreedToTermsAndConditions',
                    label: 'I have accepted the following',
                    checked: privacySettingsData?.AgreedToTermsAndConditions || true,
                    onChange: (e) => {
                      console.log('triggered', e.target.checked);
                      // handleCheckboxChange('AgreedToTermsAndConditions')(e); //handleCheckboxChange('AgreedToMarketingMaterial', false/true)
                      handleTermsAndConditionsOrPrivacyUncheck('AgreedToTermsAndConditions', e); //handleTermsAndConditionsUncheck(value)
                    },
                  }}
                />
                <Link {...{ href: 'https://www.example.com/', target: '_blank' }}>Terms And Conditions</Link>
              </UserAgreement>
            </TermsWrapper>
            <TermsWrapper>
              <TermHeaderAndAgreement {...{ variant: 'h6', color: 'main' }}>Privacy policy</TermHeaderAndAgreement>
              <UserAgreement>
                <Checkbox
                  {...{
                    key: 'AgreedToPrivacyPolicy',
                    label: 'I have accepted the following',
                    checked: privacySettingsData?.AgreedToPrivacyPolicy || true,
                    onChange: (e) => {
                      console.log('triggered', e.target.checked);
                      handleCheckboxChange('AgreedToTermsAndConditions')(e); //handleCheckboxChange('AgreedToMarketingMaterial', false/true)
                      handleTermsAndConditionsOrPrivacyUncheck('AgreedToPrivacyPolicy', e); //handleTermsAndConditionsUncheck(value)
                    },
                  }}
                />
                <Link {...{ href: 'https://www.example.com/', target: '_blank' }}>Privacy Policy</Link>
              </UserAgreement>
            </TermsWrapper>
            <TermsWrapper>
              <TermHeaderAndAgreement {...{ variant: 'h6', color: 'main' }}>Marketing material</TermHeaderAndAgreement>
              <UserAgreement>
                <Checkbox
                  {...{
                    key: 'AgreedToMarketingMaterial',
                    label: 'I have agreed to receive marketing material',
                    checked: privacySettingsData?.AgreedToMarketingMaterial || false,
                    onChange: (e) => {
                      console.log('triggered', e.target.checked);
                      handleCheckboxChange('AgreedToMarketingMaterial'); //handleCheckboxChange('AgreedToMarketingMaterial', false/true)
                      return handleOptInOrOutMarketingMaterial(); //handleTermsAndConditionsUncheck(value)
                    },
                  }}
                />
              </UserAgreement>
            </TermsWrapper>
            <Hr />
            <DeleteMyAccount>
              <Button
                {...{
                  label: 'Delete my account',
                  variant: 'ghostRed',
                  size: 'small',
                  type: 'submit',
                  icon: <TrashIcon {...{ color: 'error', hoverColor: 'inherit', width: 17, height: 16 }} />,
                  onClick: () => {
                    return deleteAccount();
                  },
                }}
              />
            </DeleteMyAccount>
            <Hr />
          </Container>
        </form>
      </PageContainer>
    </>
  );
};

const Observed = observer(PrivacySettings);

const WithStoreConnection = () => {
  const { accountDetails } = useStore();

  const { privacySettingsForm } = accountDetails;
  const {
    handleOptInOrOutMarketingMaterial,
    deleteAccount,
    handleTermsAndConditionsOrPrivacyUncheck,
    handleCheckboxChange,
    privacySettingsData,
  } = privacySettingsForm;

  return (
    <Observed
      {...{
        handleOptInOrOutMarketingMaterial,
        deleteAccount,
        handleTermsAndConditionsOrPrivacyUncheck,
        handleCheckboxChange,
        privacySettingsData,
      }}
    />
  );
};
export default observer(WithStoreConnection);
