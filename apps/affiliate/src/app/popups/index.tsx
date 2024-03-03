import React from 'react';
import MyPopUpComponent from '../components/Popup/Popup';
import DeleteAccountConfirmation, {
  DeleteAccountConfirmationProps,
} from '../components/DeleteAccountConfirmationDialog/DeleteAccountConfirmation';
import PasswordConfirmation, {
  PasswordConfirmationProps,
} from '../components/PasswordConfirmationDialog/PasswordConfirmation';
import TermsAndConditionsPrivacyConfirmation, {
  TermsAndConditionsPrivacyConfirmationProps,
} from '../components/TermsAndConditionPrivacyConfirmationDialog/TermsAndConditionsPrivacyConfirmation';
import TermsAndConditionPrivacyPolicyEnforcer, {
  TermsAndConditionsPrivacyPolicyEnforcerProps,
} from '../components/TermsAndConditionPrivacyPolicyEnforcerDialog/TermsAndConditionPrivacyPolicyEnforcer';

export type PopupId =
  | 'passwordConfirmation'
  | 'deleteAccount'
  | 'termsAndConditionsPrivacy'
  | 'termsAndConditionsPrivacyEnforcer'
  | 'myPopup';

export interface PopupItem {
  /**
   * Unique id of modal
   */
  id: PopupId;
  /**
   * Content to display in modal
   */
  content: <T extends Record<string, unknown>>(props?: T) => React.ReactNode;
  /**
   * Whether the modal will close itself when user clicks on overlay
   * @deafult true
   */
  isSelfClosing?: boolean;
  /**
   * Whether to show a close button
   * @deafult true
   */
  shouldShowCloseButton?: boolean;
}

export const popups: Record<PopupId, PopupItem> = {
  passwordConfirmation: {
    id: 'passwordConfirmation',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    content: (props: PasswordConfirmationProps) => <PasswordConfirmation {...props} />,
  },
  deleteAccount: {
    id: 'deleteAccount',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    content: (props: DeleteAccountConfirmationProps) => <DeleteAccountConfirmation {...props} />,
  },
  termsAndConditionsPrivacy: {
    id: 'termsAndConditionsPrivacy',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    content: (props: TermsAndConditionsPrivacyConfirmationProps) => (
      <TermsAndConditionsPrivacyConfirmation {...props} />
    ),
  },
  termsAndConditionsPrivacyEnforcer: {
    id: 'termsAndConditionsPrivacyEnforcer',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    content: (props: TermsAndConditionsPrivacyPolicyEnforcerProps) => <TermsAndConditionPrivacyPolicyEnforcer />, //TODO: Check if removing the {...props} makes sense.
  },
  myPopup: {
    id: 'myPopup',
    content: () => <MyPopUpComponent />,
  },
};
