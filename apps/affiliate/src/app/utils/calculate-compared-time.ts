import { format, startOfMonth, sub } from 'date-fns';

const timeKeys = {
  today: {
    units: 'day',
    amount: 1,
  },
  yesterday: {
    units: 'day',
    amount: 1,
  },
  last7Days: {
    units: 'week',
    amount: 1,
  },
  last30days: {
    units: 'month',
    amount: 1,
  },
  thisWeek: {
    units: 'week',
    amount: 1,
  },
  thisMonth: {
    units: 'month',
    amount: 1,
  },
  thisQuarter: {
    units: 'month',
    amount: 3,
  },
  thisYear: {
    units: 'year',
    amount: 1,
  },
  previousWeek: {
    units: 'week',
    amount: 1,
  },
  previousMonth: {
    units: 'month',
    amount: 1,
  },
  previousQuarter: {
    units: 'month',
    amount: 3,
  },
};

export function calculateComparedTimeByKey(startDate: string, endDate: string, key: string) {}
