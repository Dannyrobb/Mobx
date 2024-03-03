import * as React from 'react';

import { Select } from '../Select/Select';

export interface PredefinedDatePickerProps {
    onChange: (dateOption: 'day' | 'month' | 'year' | 'none') => void;
  }

export type FilterByDateChoices =
  | 'day'
  | 'month'
  | 'year'
  | 'none';

export type DateRangeObject = {
  [key in FilterByDateChoices]: {
    label: string;
  };
};

const defaultRanges: DateRangeObject = {
  day: {
    label: 'day'
  },
  month: {
    label: 'month',
  },
  year: {
    label: 'year',
  },
  none: {
    label: 'none',
  }
};

export const TableBreakdownsByDate: React.FunctionComponent<PredefinedDatePickerProps> = ({
  onChange,
}) => {
  const [option, setOption] = React.useState<FilterByDateChoices>('day');
  return (
    <>
      <Select
        {...{
          selected: {
                key: defaultRanges[option].label,
                value: defaultRanges[option].label,
                label: defaultRanges[option].label,
          },
          placeholder: 'Date',
          size: 'small',
          options: (Object.keys(defaultRanges) as FilterByDateChoices[]).map((item) => ({
            key: defaultRanges[item].label,
            value: defaultRanges[item].label,
            label: defaultRanges[item].label,
          })),
          variant: 'regular',
          selfClosing: true,
          onChange: (dateOption) => {
            setOption(dateOption.key as FilterByDateChoices)
            onChange(
              dateOption.key as FilterByDateChoices
            );
          },
        }}
      />

    </>
  );
};

export default TableBreakdownsByDate;