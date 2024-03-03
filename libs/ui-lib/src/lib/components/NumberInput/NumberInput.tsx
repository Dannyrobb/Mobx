import * as React from 'react';

import { Input } from '../Input/Input';

export interface NumberInputProps {
  /**
   * Startig size
   * @default small
   */
  howBig?: 'small' | 'medium' | 'large';

  placeholder?: string;

  value: HTMLInputElement['value'];

  onChange: React.ChangeEventHandler<HTMLInputElement>;

  error?: string;

  disabled?: boolean;

  label?: string;

  helper?: string;

  loading?: boolean;
}

export const NumberInput: React.FunctionComponent<NumberInputProps> = ({
  howBig,
  placeholder,
  value,
  error,
  loading,
  disabled,
  label,
  helper,
  onChange,
}) => {
  return (
    <div>
      <Input type="number" {...{ howBig, placeholder, value, error, loading, disabled, label, helper, onChange }} />
    </div>
  );
};

export default NumberInput;
