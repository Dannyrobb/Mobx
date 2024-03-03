import * as React from 'react';

import { BreakdownsIcon } from '@cellxpert/icons';
import { sortFunc } from '@cellxpert/utils';
import { Select, Option } from '../Select/Select';

export interface TableBreakdownsProps {
  options: string[];
  selected: string[];
  onChange: (option: Option) => void;
  setSelectAll?: (selected: boolean) => void;
  headerChildren?: React.ReactNode;
  noBreakdownsSelected?: boolean;
}

export const TableBreakdowns: React.FunctionComponent<TableBreakdownsProps> = ({
  options,
  selected,
  onChange,
  setSelectAll,
  headerChildren,
  noBreakdownsSelected,
}) => {
  React.useEffect(() => {
    setIsAllSelected(nonSelectedList.length === 0);
  }, [selected]);

  const [isAllSelected, setIsAllSelected] = React.useState<boolean>(false);
  const selectedList: string[] = selected.filter((option) => option !== 'All');
  const nonSelectedList: string[] = options
    .filter((option) => !selectedList.includes(option))
    .filter((option) => option !== 'All');

  const handleChange = (option: Option) => {
    const isSelectAll = option.value === 'All';
    let allSelected = nonSelectedList.length === 0;
    if (isSelectAll) {
      setSelectAll?.(!allSelected);
    } else {
      onChange(option);
    }
  };

  const optionsToSelectFrom = [
    ...((setSelectAll && [{ key: 'All', value: 'All', label: 'All' }]) ?? []),
    ...[...selectedList.sort(sortFunc), ...nonSelectedList.sort(sortFunc)].map((key) => ({
      key: key,
      value: key,
      label: key,
    })),
  ];

  return (
    <>
      <Select
        {...{
          size: 'small',
          placeholder: 'Breakdown',
          selfClosing: false,
          withCheckboxes: true,
          children: headerChildren,
          headerText: 'Breakdown report by',
          leftIconComponent: <BreakdownsIcon {...{ width: 16, height: 16 }} />,
          options: optionsToSelectFrom,
          onChange: handleChange,
          selected: [
            ...(isAllSelected ? [{ key: 'All', value: 'All', label: 'All' }] : []),
            ...selected.map((key) => ({ key: key, value: key, label: key })),
          ],
        }}
      />
      {noBreakdownsSelected && 'Select breakdown'}
    </>
  );
};

export default TableBreakdowns;
