import React from 'react';
import { Link } from 'react-router-dom';

import { CellProps, HeaderProps, UseFiltersInstanceProps } from 'react-table';
import { format } from 'date-fns';

interface D {}

export function customerIdRedirect(props: CellProps<D>) {
  const href = `/customer-profile/${props.cell.value}`;
  return <Link to={href}>{props.cell.value}</Link>;
}
export function dateTime(props: CellProps<D>) {
  // props.cell.value && console.log();
  return props.cell.value ? format(new Date(props.cell.value), 'M/dd/yyyy h:mm:ss a') : props.cell.value;
}

export function sumTotal(info: UseFiltersInstanceProps<D> & HeaderProps<D>) {
  const total = React.useMemo(
    () =>
      info?.rows.reduce((sum: number, row) => {
        return parseFloat(row.values[info?.column?.id]) + sum;
      }, 0),
    [info.rows.length]
  );
  return <>{isNaN(total) ? 0 : total.toFixed(2)}</>;
}

export function makeRatioByFormat(numerator: string, denominator: string, format: string) {
  return function ratioByFormat(info: UseFiltersInstanceProps<D> & HeaderProps<D>) {
    const total = React.useMemo(
      () =>
        info?.rows.reduce(
          (sum: { numerator: 0; denominator: 0 }, row) => {
            return {
              numerator: row.values[numerator] + sum.numerator,
              denominator: row.values[denominator] + sum.denominator,
            };
          },
          { numerator: 0, denominator: 0 }
        ),
      [info.rows.length]
    );
    const ratio = total.numerator / total.denominator;

    return (
      <>
        {!isNaN(ratio) && isFinite(ratio)
          ? format === 'ratio'
            ? ratio.toFixed(2)
            : (ratio * 100).toFixed(2) + '%'
          : 0}
      </>
    );
  };
}
