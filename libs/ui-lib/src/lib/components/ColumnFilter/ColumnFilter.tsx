import React from 'react';

import { ViewOffIcon } from '@cellxpert/icons';
import Select, { Option } from '../Select/Select';

export interface ColumnFilterProps {
  columns: string[];
  onColumnToggle: (option: Option) => void;
  onOrderChange?: (order: string[]) => void;
  columnOrder?: string[];
  hiddenColumns: string[];
}

export const ColumnFilter: React.FunctionComponent<ColumnFilterProps> = ({
  columns,
  onOrderChange,
  columnOrder,
  onColumnToggle,
  hiddenColumns,
}) => {
  return (
    <>
      <Select
        {...{
          headerText: 'Choose columns to display',
          size: 'small',
          withInnerSearch: true,
          placeholder: hiddenColumns.length > 0 ? `Hidden Columns / ${hiddenColumns.length}` : 'Hide Columns',
          variant: 'inline',
          withCheckboxes: true,
          isMultiSelect: true,
          options: columns.map((column) => ({ key: column, value: column, label: column })),
          withSortingDnD: true,
          searchPlaceholder: 'Find Column',
          leftIconComponent: <ViewOffIcon {...{ width: 16, height: 16 }} />,
          onOrderChange,
          columnOrder,
          reversedSelect: true,
          disabled: columns.length ? false : true,
          onChange: (option: Option) => {
            onColumnToggle(option);
          },
          selected: hiddenColumns.map((column) => ({ key: column, value: column, label: column })),
        }}
      />
    </>
  );
};
export default ColumnFilter;
