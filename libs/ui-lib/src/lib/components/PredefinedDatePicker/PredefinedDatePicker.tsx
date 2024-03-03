import * as React from 'react';

import {
  startOfToday,
  startOfYesterday,
  endOfYesterday,
  startOfWeek,
  endOfWeek,
  startOfYear,
  subDays,
  startOfMonth,
  startOfQuarter,
  subWeeks,
  subMonths,
  endOfMonth,
  subQuarters,
  endOfQuarter,
  format,
} from 'date-fns';

import { Select, Option } from '../Select/Select';

export type PredefinedDateStrings =
  | 'today'
  | 'yesterday'
  | 'last7Days'
  | 'last30days'
  | 'thisWeek'
  | 'thisMonth'
  | 'thisQuarter'
  | 'thisYear'
  | 'previousWeek'
  | 'previousMonth'
  | 'previousQuarter'
  | 'lifetime';

export type DateRangeObject = {
  [key in PredefinedDateStrings]: {
    label: string;
    startDate: string;
    endDate: string;
  };
};

export type ReversedSetObject = {
  [key: string]: string;
};

export interface PredefinedDatePickerProps {
  startDate?: string | null;
  endDate?: string | null;
  onChange: (startDate: string, endDate: string, key: string) => void;
}
const defaultRanges: DateRangeObject = {
  today: {
    label: 'Today',
    startDate: format(startOfToday(), 'MM/d/yyyy'),
    endDate: format(new Date(), 'MM/d/yyyy'),
  },
  yesterday: {
    label: 'Yesterday',
    startDate: format(startOfYesterday(), 'MM/d/yyyy'),
    endDate: format(endOfYesterday(), 'MM/d/yyyy'),
  },
  last7Days: {
    label: 'Last 7 Days',
    startDate: format(subDays(new Date(), 7), 'MM/d/yyyy'),
    endDate: format(new Date(), 'MM/d/yyyy'),
  },
  last30days: {
    label: 'Last 30 Days',
    startDate: format(subDays(new Date(), 30), 'MM/d/yyyy'),
    endDate: format(new Date(), 'MM/d/yyyy'),
  },
  thisWeek: {
    label: 'Week to Date',
    startDate: format(startOfWeek(new Date()), 'MM/d/yyyy'),
    endDate: format(endOfWeek(new Date()), 'MM/d/yyyy'),
  },
  thisMonth: {
    label: 'Month to Date',
    startDate: format(startOfMonth(new Date()), 'MM/d/yyyy'),
    endDate: format(new Date(), 'MM/d/yyyy'),
  },
  thisQuarter: {
    label: 'Quarter to Date',
    startDate: format(startOfQuarter(new Date()), 'MM/d/yyyy'),
    endDate: format(new Date(), 'MM/d/yyyy'),
  },
  thisYear: {
    label: 'Year to Date',
    startDate: format(startOfYear(new Date()), 'MM/d/yyyy'),
    endDate: format(new Date(), 'MM/d/yyyy'),
  },
  previousWeek: {
    label: 'Previous Week',
    startDate: format(subWeeks(startOfWeek(new Date()), 1), 'MM/d/yyyy'),
    endDate: format(subWeeks(endOfWeek(new Date()), 1), 'MM/d/yyyy'),
  },
  previousMonth: {
    label: 'Previous Month',
    startDate: format(subMonths(startOfMonth(new Date()), 1), 'MM/d/yyyy'),
    endDate: format(subMonths(endOfMonth(new Date()), 1), 'MM/d/yyyy'),
  },
  previousQuarter: {
    label: 'Previous Quarter',
    startDate: format(subQuarters(startOfQuarter(new Date()), 1), 'MM/d/yyyy'),
    endDate: format(subQuarters(endOfQuarter(new Date()), 1), 'MM/d/yyyy'),
  },
  lifetime: {
    label: 'Lifetime',
    startDate: format(new Date('01/01/2000'), 'MM/d/yyyy'),
    endDate: format(new Date(), 'MM/d/yyyy'),
  },
};

const reversedSet: ReversedSetObject = {};

for (const key in defaultRanges) {
  reversedSet[
    `${defaultRanges[key as PredefinedDateStrings].startDate}-${defaultRanges[key as PredefinedDateStrings].endDate}`
  ] = key;
}
export const PredefinedDatePicker: React.FunctionComponent<PredefinedDatePickerProps> = ({
  startDate,
  endDate,
  onChange,
}) => {
  const selectedOption = reversedSet[`${startDate}-${endDate}`] as PredefinedDateStrings;

  return (
    <>
      <Select
        {...{
          selected: selectedOption
            ? {
                key: selectedOption,
                value: selectedOption,
                label: defaultRanges[selectedOption].label,
              }
            : null,

          placeholder: 'Custom',
          size: 'small',
          options: (Object.keys(defaultRanges) as PredefinedDateStrings[]).map((item) => ({
            key: item,
            value: item,
            label: defaultRanges[item].label,
          })),
          selfClosing: true,
          onChange: (option) => {
            onChange(
              defaultRanges[(option as Option).key as PredefinedDateStrings].startDate,
              defaultRanges[(option as Option).key as PredefinedDateStrings].endDate,
              option.key
            );
          },
        }}
      />
    </>
  );
};

export default PredefinedDatePicker;
