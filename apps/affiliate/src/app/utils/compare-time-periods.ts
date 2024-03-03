import { MediaReportObj } from '@cellxpert/api-types';

interface ComparedObj {
  [key: string]: number | string;
}

export function compareTimePeriods(currPeriod: any, lastPeriod: any) {
  let periodKeys = Object.keys(currPeriod) as Array<keyof MediaReportObj>;
  if (!periodKeys.length) periodKeys = Object.keys(lastPeriod) as Array<keyof MediaReportObj>;

  const calculated = periodKeys.reduce((acc, currKey) => {
    const cur = currPeriod && currPeriod[currKey] ? parseFloat(currPeriod[currKey] as string) : 0;
    const old = lastPeriod && lastPeriod[currKey] ? parseFloat(lastPeriod[currKey] as string) : 0;
    const diff = ((cur - old) / old) * 100;

    acc[currKey] = isNaN(diff) || diff === Infinity ? 0 : diff.toFixed(1);

    return acc;
  }, {} as ComparedObj);
  console.log('calc: ', calculated);

  return calculated;
}
