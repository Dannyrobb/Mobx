import * as React from 'react';

import { Input } from '../Input/Input';
export interface TextInputProps {
  /**
   * What size should it be?
   * @default small
   */
  howBig?: 'small' | 'medium' | 'large';

  placeholder?: string;

  validationRegex?: string;

  label?: string;
  /**
   * Text TextInput Error
   * @default ''
   */
  error?: string;

  helper?: string;

  required?: boolean;

  disabled?: boolean;

  loading?: boolean;

  onChange: React.ChangeEventHandler<HTMLInputElement>;

  value: HTMLInputElement['value'];

  readOnly?: boolean;
}

export const TextInput: React.FunctionComponent<TextInputProps> = ({
  howBig,
  error,
  disabled,
  label,
  helper,
  loading,
  placeholder,
  onChange,
  value,
  readOnly,
}) => {
  return (
    <div>
      <Input
        type="text"
        {...{ readOnly, label, error, disabled, loading, placeholder, helper, howBig, onChange, value }}
      />
    </div>
  );
};

export default TextInput;
