import * as React from 'react';

import { theme } from '@cellxpert/theme';
import styled from '@emotion/styled';
import { AddIcon, CloseIcon, FiltersIcon } from '@cellxpert/icons';
import { Select, DropdownButton, Option } from '../Select/Select';
import Tooltip from '../Tooltip/Tooltip';
import Typography from '../Typography/Typography';
import TextInput from '../TextInput/TextInput';
import Button from '../Button/Button';

export type SingleFilter = {
  filter: string;
  type: string;
  value: string;
};
export interface TableFiltersProps {
  title: string;
  filterOptions: Option[];
  selectedFilters: SingleFilter[];
  onSave: (selectedFilters: SingleFilter[]) => void;
}

const FiltersButton = styled('button')<{}>(() => ({
  ...theme.typography.meta.body2,
  display: 'flex',
  gap: 8,
  backgroundColor: 'white',
  border: 'none',
  svg: {
    fill: theme.palette.text.main,
  },
}));

const FiltersTooltip = styled('div')(() => ({
  ...theme.typography.meta.body2,
  padding: theme.gutters.base * 2,
  gap: 16,
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: theme.palette.blacks.white,
}));

const SingleFilterWrapper = styled('div')(() => ({
  alignItems: 'center',
  display: 'flex',
  gap: 8,
  svg: {
    cursor: 'pointer',
  },
}));

const ApprovalButtonsWrapper = styled('div')(() => ({
  marginTop: theme.gutters.base,
  display: 'flex',
  alignSelf: 'flex-end',
}));

export const TableFilters: React.FunctionComponent<TableFiltersProps> = ({
  title,
  filterOptions,
  selectedFilters,
  onSave,
}) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [filters, setFilters] = React.useState<SingleFilter[]>(
    selectedFilters.length < 1 ? [{ filter: '', type: '', value: '' }] : selectedFilters
  );
  const updateFilter = (value: string, index: number) => {
    const editableFilters = [...filters];
    editableFilters[index].filter = value;
    setFilters(editableFilters);
  };
  const updateValue = (value: string, index: number) => {
    const editableFilters = [...filters];
    editableFilters[index].value = value;
    setFilters(editableFilters);
  };

  const removeFilter = (index: number) => {
    const editableFilters = [...filters];
    editableFilters.splice(index, 1);
    setFilters(editableFilters);
  };

  const addFilter = () => {
    setFilters([...filters, { filter: '', type: '', value: '' }]);
  };
  const clearFilters = () => {
    setFilters([{ filter: '', type: '', value: '' }]);
  };

  return (
    <Tooltip
      {...{
        selfClosing: false,
        overflow: true,
        align: 'center',
        isOpen,
        button: (
          <DropdownButton
            {...{
              variant: 'inline',
              disabled: false,
              size: 'small',
              leftIconComponent: <FiltersIcon {...{ width: 16, height: 16 }} />,
              selected: filters.some((filter) => filter.value.length > 0),
              onClick: () => {
                setIsOpen(true);
              },
            }}
          >
            <FiltersIcon {...{ width: 16, height: 16 }} />
            Filter
          </DropdownButton>
        ),
      }}
    >
      <FiltersTooltip {...{ style: { width: 'max-content' } }}>
        <Typography {...{ variant: 'body2', style: { marginBottom: theme.gutters.base } }}>
          Filters for {title}
        </Typography>
        {filters.map((selectedFilter, index) => (
          <SingleFilterWrapper>
            <CloseIcon
              {...{
                onClick: () => {
                  removeFilter(index);
                },
                width: 16,
                height: 16,
                color: 'main',
              }}
            />
            <span>Where</span>
            <Select
              {...{
                selfClosing: true,
                style: {
                  flex: 1,
                },
                size: 'small',
                variant: 'regular',
                placeholder: 'Column',
                options: filterOptions.filter((filter) => !filters.some((selected) => selected.filter === filter.key)),
                onChange: (option) => {
                  updateFilter(option.key, index);
                },
                // Add Translation to label here
                selected: selectedFilter.filter
                  ? { value: selectedFilter.filter, label: selectedFilter.filter, key: selectedFilter.filter }
                  : null,
              }}
            />
            <TextInput
              {...{
                value: selectedFilter.value,
                onChange: (e) => {
                  updateValue(e.target.value, index);
                },
              }}
            />
          </SingleFilterWrapper>
        ))}
        <div {...{ style: { marginLeft: -16 } }}>
          <Button
            {...{
              disabled: filterOptions.length === filters.length,
              variant: 'ghostBlue',
              size: 'small',
              label: 'Add Filter',
              icon: <AddIcon {...{ width: 16, height: 16 }} />,
              onClick: () => {
                addFilter();

              },
            }}
          />
        </div>
        <ApprovalButtonsWrapper>
          <Button
            {...{
              disabled: filters.length < 1,
              variant: 'ghostBlack',
              size: 'small',
              label: 'Clear filters',
              icon: <CloseIcon {...{ width: 16, height: 16 }} />,
              onClick: () => {
                clearFilters();
              },
            }}
          />
          <Button
            {...{
              disabled: filterOptions.length === filters.length,
              size: 'small',
              label: 'Apply filters',
              onClick: () => {
                onSave(filters.filter((filter) => filter.filter !== '' && filter.value !== ''));
                setIsOpen(false);
              },
            }}
          />
        </ApprovalButtonsWrapper>
      </FiltersTooltip>
    </Tooltip>
  );
};

export default TableFilters;
