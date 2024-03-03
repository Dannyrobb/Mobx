import * as React from 'react';

import { ViewClosePasswordIcon, ViewOpenPasswordIcon } from '@cellxpert/icons';

import { Input } from '../Input/Input';

export interface PasswordInputprops {
  /**
   * What size should it be?
   * @default small
   */
  howBig?: 'small' | 'medium' | 'large';

  placeholder?: string;

  label?: string;

  error?: string;

  helper?: string;

  loading?: boolean;

  required?: boolean;

  disabled?: boolean;

  onClick?: (event: React.MouseEvent) => void;

  onChange: React.ChangeEventHandler<HTMLInputElement>;

  value: HTMLInputElement['value'];
}

export const PasswordInput: React.FunctionComponent<PasswordInputprops> = ({
  howBig = 'small',
  error,
  disabled,
  label,
  helper,
  loading,
  placeholder,
  onChange,
  value,
}) => {
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const togglePasswordVisiblity = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div>
      <Input
        type={showPassword ? 'text' : 'password'}
        {...{
          howBig,
          error,
          disabled,
          label,
          helper,
          placeholder,
          onChange,
          value,
          loading,
          autoComplete: 'current-password',

          icon: showPassword ? (
            <ViewClosePasswordIcon {...{ onClick: togglePasswordVisiblity, color: 'main' }} />
          ) : (
            <ViewOpenPasswordIcon {...{ onClick: togglePasswordVisiblity, color: 'main' }} />
          ),
        }}
      />
    </div>
  );
};
export default PasswordInput;
