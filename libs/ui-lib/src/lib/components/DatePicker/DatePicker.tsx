import * as React from 'react';

import { flexBetweenCenter, theme, Theme } from '@cellxpert/theme';
import styled from '@emotion/styled';
import ReactDatePicker from 'react-datepicker';

import { format, getMonth, getYear } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';

import { Select } from '../Select/Select';

import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from '@cellxpert/icons';

export interface DatePickerProps {
  onChange: (date: string | null) => void;
  customInput?: React.ReactElement;
  variant?: 'inform' | 'left' | 'right' | 'regular';
  size?: 'small' | 'medium' | 'large';
  startDate?: Date | string | null;
}
const IconWrapper = styled('div')<Pick<DatePickerProps, 'size'>>(({ size }) => ({
  position: 'absolute',
  top: 8,
  right: 16,
  zIndex: 1,
  ...(size === 'medium' && {
    top: 12,
  }),
  ...(size === 'large' && {
    top: 16,
  }),
}));

const MonthButton = styled('button')(() => ({
  cursor: 'pointer',
  borderWidth: 0,
  boxSizing: 'border-box',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
  fill: theme.palette.additional.grey[900],
  backgroundColor: theme.palette.blacks.white,
  padding: theme.gutters.base,
  '&:hover': {
    backgroundColor: theme.palette.additional.grey[300],
  },
}));

const DatePickerHeader = styled('div')(() => ({
  ...flexBetweenCenter,
  margin: `${theme.gutters.base * 0.5}px `,
}));

const DatePickerWraper = styled('div')<Pick<DatePickerProps, 'variant' | 'size'>>(({ variant, size }) => ({
  backgroundColor: 'inherit',
  position: 'relative',
  '.react-datepicker': {
    ...theme.typography.meta.body2,
    borderRadius: 0,
    border: 0,
    boxShadow: '0 2px 4px -1px rgba(0, 0, 0, 0.1), 0 1px 10px 0 rgba(0, 0, 0, 0.1), 0 4px 5px 0 rgba(0, 0, 0, 0.1)',
    padding: `${theme.gutters.base * 0.5}px 0px `,
  },
  '.react-datepicker-wrapper': {
    input: {
      ...theme.typography.meta.body2,
      backgroundColor: 'inherit',
      padding: `${theme.gutters.base - 1}px ${theme.gutters.base * 5 - 1}px ${theme.gutters.base - 1}px ${
        theme.gutters.base * 2 - 1
      }px`,
      width: '100%',
      border: `1px solid ${theme.palette.additional.grey[400]}`,
      borderRadius: theme.gutters.base * 4,
      '&:hover': {
        backgroundColor: theme.palette.blacks.border,
      },
      '&:disabled': {
        backgroundColor: theme.palette.additional.grey[100],
        color: theme.palette.additional.grey[400],
      },
      ...(size === 'medium' && {
        padding: `${theme.gutters.base * 1.5 - 1}px ${theme.gutters.base * 5 - 1}px ${theme.gutters.base * 1.5 - 1}px ${
          theme.gutters.base * 2 - 1
        }px`,
      }),
      ...(size === 'large' && {
        padding: `${theme.gutters.base * 2 - 1}px ${theme.gutters.base * 5 - 1}px ${theme.gutters.base * 2 - 1}px ${
          theme.gutters.base * 2 - 1
        }px`,
      }),
      '&:focus': {
        borderColor: theme.palette.main.primary1.base,
        borderWidth: 2,
        padding: `${theme.gutters.base - 2}px ${theme.gutters.base * 5 - 2}px ${theme.gutters.base - 2}px ${
          theme.gutters.base * 2 - 2
        }px`,
        ...(size === 'medium' && {
          padding: `${theme.gutters.base * 1.5 - 2}px ${theme.gutters.base * 5 - 2}px ${
            theme.gutters.base * 1.5 - 2
          }px ${theme.gutters.base * 2 - 2}px`,
        }),
        ...(size === 'large' && {
          padding: `${theme.gutters.base * 2 - 2}px ${theme.gutters.base * 5 - 2}px ${theme.gutters.base * 2 - 2}px ${
            theme.gutters.base * 2 - 2
          }px`,
        }),
      },

      ...(variant === 'left' && {
        borderRadius: `${theme.gutters.base * 2}px 0 0 ${theme.gutters.base * 2}px`,
      }),
      ...(variant === 'right' && {
        borderRadius: `0 ${theme.gutters.base * 2}px ${theme.gutters.base * 2}px 0`,
      }),
      ...(variant === 'inform' && {
        borderRadius: 0,
        borderColor: theme.palette.blacks.border,
        borderBottomColor: theme.palette.additional.grey[600],
      }),
    },
  },
  '.react-datepicker__header': {
    margin: `0px ${theme.gutters.base * 0.5}px`,
    borderRadius: 0,
    backgroundColor: theme.palette.blacks.white,
    padding: 0,
  },
  '.react-datepicker__day-names': {
    marginBottom: 0,
  },
  '.react-datepicker__day-name': {
    margin: 0,
    width: theme.gutters.base * 5,
    lineHeight: `${theme.gutters.base * 5}px`,
  },

  '.react-datepicker__day': {
    position: 'relative',
    margin: 0,
    width: theme.gutters.base * 5,
    lineHeight: `${theme.gutters.base * 5}px`,
    borderRadius: '50%',
    '&:hover': {
      backgroundColor: theme.palette.main.primary1[200],
      color: theme.palette.main.primary1.base,
    },
    '&.react-datepicker__day--today': {
      fontWeight: 'normal',
      color: theme.palette.main.primary1.base,
    },

    '&.react-datepicker__day--selected': {
      backgroundColor: theme.palette.main.primary1.base,
      color: theme.palette.text.contrast,
    },
    '&.react-datepicker__day--keyboard-selected': {
      backgroundColor: theme.palette.main.primary1[200],
      color: theme.palette.main.primary1.base,
      border: 0,
      outline: 0,
    },
    '&.react-datepicker__day--today::before': {
      transform: 'translateX(-50%)',
      borderRadius: 2,
      position: 'absolute',
      background: theme.palette.main.primary1.base,
      bottom: 4,
      height: 4,
      content: '""',
      width: 4,
      left: '50%',
    },
  },
  '.react-datepicker__month': {
    margin: 0,
    paddingTop: theme.gutters.base * 0.5,
  },
  '.react-datepicker-popper': {
    zIndex: theme.zIndex.tooltip,
    paddingTop: 0,
    '.react-datepicker__triangle': {
      display: 'none',
    },
  },
}));

export const DatePicker: React.FunctionComponent<DatePickerProps> = ({
  variant,
  size,
  onChange,
  startDate,
  customInput,
}) => {
  const [selectedDate, setSelectedDate] = React.useState<Date | null | undefined>(
    startDate ? new Date(startDate) : new Date()
  );

  React.useEffect(() => {
    startDate && setSelectedDate(new Date(startDate));
  }, [startDate]);

  const range = (start: number, stop: number, step: number) =>
    Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step);

  const years = range(getYear(new Date()) + 1, getYear(new Date()) - 20, -1);

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  return (
    <>
      <DatePickerWraper {...{ variant, size }}>
        {!customInput && (
          <IconWrapper {...{ size }}>
            <CalendarIcon
              {...{
                width: 16,
                height: 16,
                color: 'main',
              }}
            />
          </IconWrapper>
        )}
        <ReactDatePicker
          {...{
            customInput,
            selectedDate,
            onChange: (date: Date | [Date | null, Date | null] | null) => {
              setSelectedDate(date as Date | null);
              onChange(format(date as Date, 'MM/dd/yyyy'));
            },
            selected: selectedDate,
            formatWeekDay: (nameOfDay) => nameOfDay.substr(0, 1),
            placeholderText: 'mm/dd/yyyy',
            renderCustomHeader: ({
              date,
              changeYear,
              changeMonth,
              decreaseMonth,
              increaseMonth,
              prevMonthButtonDisabled,
              nextMonthButtonDisabled,
            }) => (
              <DatePickerHeader>
                <MonthButton onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
                  <ChevronLeftIcon {...{ fill: 'inherit', width: 16, height: 16 }} />
                </MonthButton>
                <div {...{ style: { marginRight: '-2px' } }}>
                  <Select
                    {...{
                      options: months.map((month) => ({ key: month, value: month, label: month })),
                      onChange: (option) => {
                        if (Array.isArray(option)) {
                          return;
                        }
                        changeMonth(months.indexOf(option.value));
                      },
                      selected: {
                        key: date ? months[getMonth(date)] : months[0],
                        value: date ? months[getMonth(date)] : months[0],
                        label: date ? months[getMonth(date)] : months[0],
                      },
                      selfClosing: true,
                      size: 'small',
                      variant: 'regular',
                    }}
                  />
                </div>
                <Select
                  {...{
                    options: years.map((year) => ({ key: `${year}`, value: `${year}`, label: `${year}` })),
                    onChange: (option) => {
                      if (Array.isArray(option)) {
                        return;
                      }
                      changeYear(parseInt(option.value));
                    },
                    selected: {
                      key: `${date ? getYear(date) : years[0]}`,
                      value: `${date ? getYear(date) : years[0]}`,
                      label: `${date ? getYear(date) : years[0]}`,
                    },
                    selfClosing: true,
                    size: 'small',
                    variant: 'regular',
                  }}
                />
                <MonthButton onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
                  <ChevronRightIcon {...{ fill: 'inherit', width: 16, height: 16 }} />
                </MonthButton>
              </DatePickerHeader>
            ),
          }}
        />
      </DatePickerWraper>
    </>
  );
};

export default DatePicker;
