import React from 'react';

import { WarningFilledIcon } from '@cellxpert/icons';
import { flexCenterCenter, flexStartCenter, theme } from '@cellxpert/theme';
import { Typography, Dialog, Checkbox, Toast, Link, DialogProps } from '@cellxpert/ui-lib';
import styled from '@emotion/styled';
import { observer } from 'mobx-react';

import { updatedPrivacyEnforced } from '../../api/api';
import { useStore } from '../../stores/setupContext';
import PopupStore from '../../stores/PopupStore';
import AuthStore from '../../stores/AuthStore';

export interface TermsAndConditionsPrivacyPolicyEnforcerProps
  extends Omit<DialogProps, 'onConfirm' | 'variant' | 'title'> {
  onConfirm?: (payload: unknown) => void;
  onClose?: (e: React.MouseEvent) => void;
  checked?: boolean;
  multipleErrors?: boolean;
  notChecked?: boolean;
  accountDetailsResponse?: any;
  popups: PopupStore;
  auth: AuthStore;
}

const Content = styled('div')(() => ({
  backgroundColor: theme.palette.text.contrast,
  border: 'none',
}));

const ContentText = styled('div')(() => ({
  maxWidth: theme.gutters.base * 58,
  marginBottom: theme.gutters.base * 3,
}));

const MandatoryCheckboxWraper = styled('div')<Pick<TermsAndConditionsPrivacyPolicyEnforcerProps, 'notChecked'>>(
  ({ notChecked }) => ({
    ...flexStartCenter,
    marginTop: theme.gutters.base * 1,
    width: 'min-content',
    ...(notChecked && {
      boxShadow: `0px 0px 0px 2px ${theme.palette.text.error}`,
    }),
  })
);

const OptionalCheckboxWraper = styled('div')(() => ({
  ...flexStartCenter,
  marginTop: theme.gutters.base * 1,
  marginBottom: theme.gutters.base * 2,
}));

const WarningIconWrapper = styled('span')(() => ({
  marginRight: theme.gutters.base * 0.5,
  ...flexCenterCenter,
}));

export const TermsAndConditionsPrivacyPolicyEnforcer: React.FunctionComponent<
  TermsAndConditionsPrivacyPolicyEnforcerProps
> = ({ accountDetailsResponse, popups, auth }) => {
  const { AgreedToTermsAndConditions, AgreedToPrivacyPolicy, AgreedToMarketingMaterial } =
    accountDetailsResponse.AccountDetails[0] ?? 'yoyoyyoyoyyoyo';
  const [payload, setPayload] = React.useState({
    AgreedToTermsAndConditions: AgreedToTermsAndConditions,
    AgreedToPrivacyPolicy: AgreedToPrivacyPolicy,
    AgreedToMarketingMaterial: AgreedToMarketingMaterial,
  });
  const toggleSelected = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    const value = target.checked;
    const name = target.name;
    setPayload({
      ...payload,
      [name]: value,
    });
  };
  console.log('this is state payloadddd', payload);
  return (
    <>
      <Dialog
        {...{
          variant: 'acknowledgment',
          title: 'Privacy Policy',
          size: 'default',
          confirmationButtonText: 'OK',
          onClose: () => {
            popups.closePopup();
            auth.logout();
          },
          onConfirm: () => {
            async (): Promise<void> => {
              try {
                console.log('payload from async', payload);
                await updatedPrivacyEnforced({
                  AgreedToMarketingMaterial,
                  AgreedToPrivacyPolicy,
                  AgreedToTermsAndConditions,
                });
              } catch (err) {
                console.log(err);
              }
            };
            payload;
            console.log('payload from onConfirm', payload);
          },
        }}
      >
        <Content>
          <ContentText>
            <Typography {...{ variant: 'body2' }}>
              Please note that due to data protection regulation changing within European Union, we have had to make
              some changes to our terms and conditions. Please review the changes and confirm your acceptance of the
              update terms. You may withdraw your acceptance at any time, however this may result in your use of the
              system being withdrawn or restricted.
            </Typography>
          </ContentText>

          <MandatoryCheckboxWraper {...{ notChecked: payload.AgreedToTermsAndConditions ? false : true }}>
            <Checkbox
              {...{
                name: 'AgreedToTermsAndConditions',
                label: 'I agree to the',
                checked: payload.AgreedToTermsAndConditions,
                onChange: toggleSelected,
              }}
            />
            <Link {...{ href: 'https://www.example.com', target: '_blank' }}>Terms And Conditions</Link>
            {!payload.AgreedToTermsAndConditions ? (
              <WarningIconWrapper>
                <WarningFilledIcon {...{ color: 'error', width: 16, height: 18 }} />{' '}
              </WarningIconWrapper>
            ) : null}
          </MandatoryCheckboxWraper>
          <MandatoryCheckboxWraper {...{ notChecked: payload.AgreedToPrivacyPolicy ? false : true }}>
            <Checkbox
              {...{
                name: 'AgreedToPrivacyPolicy',
                label: 'I have read and accepted the',
                checked: payload.AgreedToPrivacyPolicy,
                onChange: toggleSelected,
              }}
            />
            <Link {...{ href: 'https://www.example.com', target: '_blank' }}>Privacy Policy</Link>
            {!payload.AgreedToPrivacyPolicy ? (
              <WarningIconWrapper>
                <WarningFilledIcon {...{ color: 'error', width: 16, height: 18 }} />{' '}
              </WarningIconWrapper>
            ) : null}
          </MandatoryCheckboxWraper>
          <OptionalCheckboxWraper>
            <Checkbox
              {...{
                name: 'AgreedToMarketingMaterial',
                label: 'I agree to receive promotional material',
                checked: payload.AgreedToMarketingMaterial,
                onChange: toggleSelected,
              }}
            />
            <Typography {...{ variant: 'caption', color: 'dark' }}>(optional)</Typography>
          </OptionalCheckboxWraper>
          <Toast
            {...{
              error: true,
              title: 'Terms and Conditions',
              message: 'Terms and Conditions and Privacy Policy consent is required',
              position: 'noAnimation',
            }}
          />
        </Content>
      </Dialog>
    </>
  );
};

const Observed = observer(TermsAndConditionsPrivacyPolicyEnforcer);

const WithStoreConnection = () => {
  const { accountDetails, popups, auth } = useStore();
  const { accountDetailsResponse } = accountDetails;

  return <Observed {...{ accountDetailsResponse, popups, auth }} />;
};
export default observer(WithStoreConnection);
