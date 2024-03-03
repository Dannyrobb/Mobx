import * as React from 'react';

import { CheckMarkIcon, ChevronDownIcon } from '@cellxpert/icons';
import { theme } from '@cellxpert/theme';
import styled from '@emotion/styled';

import Checkbox from '../Checkbox/Checkbox';
import Tooltip from '../Tooltip/Tooltip';
import Typography from '../Typography/Typography';
import { LabelWrap } from '../Input/Input';

export interface Option {
  key: string;
  value: string;
  label: string;
  additionalData?: string | number;
}

export interface SelectProps {
  // inputComponent?: React.ReactElement;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  options: Option[];
  selected?: Option | Option[] | null;
  onChange: {
    (option: Option, ind?: number): void;
  };
  isDefaultOpen?: boolean;
  /** @default regular */
  variant?: 'inline' | 'regular';
  /** @default true */
  selfClosing?: boolean;
  /** @default 'medium' */
  size?: 'small' | 'medium' | 'large';
  helper?: string;
  isMultiSelect?: boolean;
  withCheckboxes?: boolean;
  withSearch?: boolean;
  withInnerSearch?: boolean;
  searchPlaceholder?: string;
  headerText?: string;
  withSortingDnD?: boolean;
  onOrderChange?: (order: string[]) => void;
  columnOrder?: string[];
  leftIconComponent?: React.ReactElement;
  reversedSelect?: boolean;
}

export const Container = styled('div')(() => ({
  '& label': {
    display: 'block',
  },
  '& *': {
    boxSizing: 'border-box',
  },
}));

const HeaderWrapper = styled('div')<Pick<SelectProps, 'withInnerSearch'>>(({ withInnerSearch }) => ({
  ...(withInnerSearch && {
    minWidth: 200,
  }),
  ...theme.typography.meta.body2,
  fontWeight: 700,
  padding: theme.gutters.base * 2,
  paddingBottom: theme.gutters.base,
  position: 'sticky',
  top: 0,
  zIndex: 1,
  backgroundColor: theme.palette.blacks.white,
}));

const SelectHeader = styled('div')(() => ({
  paddingBottom: theme.gutters.base * 2,
}));

const StyledSelect = styled('ul')(() => ({
  ...theme.typography.meta.body2,
  margin: 0,
  padding: 0,
  listStyle: 'none',
  backgroundColor: theme.palette.blacks.white,
}));

const StyledOption = styled('li')<{ isSelected: boolean } & Pick<SelectProps, 'disabled'>>(
  ({ isSelected, disabled }) => ({
    alignItems: 'center',
    padding: `${theme.gutters.base * 1.5}px ${theme.gutters.base * 2}px`,
    margin: 0,
    cursor: 'pointer',
    display: 'flex',
    lineHeight: '20px',
    position: 'relative',
    whiteSpace: 'nowrap',
    'label>svg': { fill: theme.palette.blacks.grey },
    ':not(label) > svg': {
      display: 'none',
      fill: theme.palette.main.primary1.base,
      marginLeft: 'auto',
      ...(isSelected && {
        display: 'block',
      }),
    },
    ':hover': {
      backgroundColor: theme.palette.additional.grey[300],
    },
    ...(isSelected && {
      color: theme.palette.main.primary1.base,
      backgroundColor: theme.palette.main.primary1[100],
    }),
    ...(disabled && {
      color: theme.palette.text.disabled,
    }),
    '&.over': {
      boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
    },
  })
);

const AdditionalData = styled('div')(() => ({
  ...theme.typography.meta.caption,
  marginLeft: 'auto',
  color: theme.palette.text.helper,
}));

export const Search = styled('input')<{ searchSize: SelectProps['size'] } & Pick<SelectProps, 'variant'>>(
  ({ searchSize, variant }) => ({
    padding: `${theme.gutters.base * 1.5}.5px ${theme.gutters.base * 2}px`,
    color: theme.palette.text.main,
    border: 'none',
    ...(variant === 'regular' && {
      backgroundColor: theme.palette.blacks.white,
      border: `1px solid ${theme.palette.blacks.border}`,
      borderBottomColor: theme.palette.additional.grey[600],
    }),
    width: '100%',
    '&:focus': {
      outline: 'none',
    },
    '&::placeholder': {
      color: theme.palette.text.placeholder,
    },
    ...(searchSize === 'large' && {
      padding: `${theme.gutters.base * 2 - 1}px ${theme.gutters.base * 2 - 1}px`,
    }),
    ...(searchSize === 'small' && {
      padding: `${theme.gutters.base - 1}px ${theme.gutters.base * 2 - 1}px`,
    }),
  })
);

export const Selected = styled('div')(() => ({
  cursor: 'pointer',
  boxShadow: `0 2px 3px 0 rgba(0, 0, 0, 0.1)`,
  padding: `${theme.gutters.base * 1.3}px ${theme.gutters.base * 2}px`,
  background: theme.palette.blacks.white,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  minHeight: theme.gutters.base * 5,
}));

export const DropdownButton = styled('button')<
  { selected: boolean } & Pick<SelectProps, 'variant' | 'disabled' | 'size' | 'leftIconComponent'>
>(({ selected, variant, disabled, size, leftIconComponent }) => ({
  ...theme.typography.meta.buttonRegular,
  width: 'min-content',
  whiteSpace: 'nowrap',
  backgroundColor: theme.palette.blacks.transparent,
  gap: 6,
  color: theme.palette.text.main,
  cursor: 'pointer',
  borderWidth: 0,
  boxSizing: 'border-box',
  display: 'flex',
  justifyContent: 'space-between',
  position: 'relative',
  padding: `${theme.gutters.base * 1.5}px ${theme.gutters.base * 2}px`,
  svg: {
    fill: theme.palette.text.main,
  },
  ...(variant === 'regular' && {
    backgroundColor: theme.palette.blacks.white,
    border: `1px solid ${theme.palette.blacks.border}`,
    borderBottomColor: theme.palette.additional.grey[600],
  }),
  ...(disabled && {
    color: theme.palette.text.disabled,
    svg: {
      fill: theme.palette.text.disabled,
    },
  }),
  ...(size === 'large' && {
    padding: `${theme.gutters.base * 2}px ${theme.gutters.base * 2}px`,
  }),
  ...(size === 'small' && {
    padding: `${theme.gutters.base - 1}px ${theme.gutters.base * 2}px`,
  }),
  ...(leftIconComponent && {
    justifyContent: 'flex-start',
    ...(selected && {
      color: theme.palette.main.primary1.base,
      svg: {
        fill: theme.palette.main.primary1.base,
      },
    }),
  }),
  '&:focus': {
    padding: `${theme.gutters.base * 1.5 - 2}px ${theme.gutters.base * 2 - 2}px`,
    border: `2px solid ${theme.palette.main.primary1.base}`,
    ...(size === 'large' && {
      padding: `${theme.gutters.base * 2 - 2}px ${theme.gutters.base * 2 - 2}px`,
    }),
    ...(size === 'small' && {
      padding: `${theme.gutters.base - 2}px ${theme.gutters.base * 2 - 1}px`,
    }),
  },
}));

export const SelectedText = styled(Typography)(() => ({
  fontSize: 15,
  fontWeight: 600,
  lineHeight: '20px',
  color: theme.palette.text.main,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  maxWidth: 200,
}));

export const MessageWrap = styled('div')<Pick<SelectProps, 'helper'>>(() => ({
  ...theme.typography.meta.caption,
  marginTop: theme.gutters.base * 0.5,
  color: theme.palette.text.helper,
}));

function _isMultiSelect(value: Option | Option[] | null): value is Array<Option> {
  if (!value) return false;
  return Array.isArray(value);
}

export const Select: React.FunctionComponent<SelectProps> = ({
  onChange,
  options,
  children, 
  searchPlaceholder,
  placeholder,
  // inputComponent, // if not button
  disabled,
  label,
  selected,
  // withSearch, // also not in use at the moment, possibly will be relevant for future
  size,
  variant,
  isMultiSelect,
  withCheckboxes,
  selfClosing = !isMultiSelect,
  withInnerSearch,
  headerText,
  withSortingDnD,
  onOrderChange,
  columnOrder,
  leftIconComponent,
  helper,
  reversedSelect,
}) => {
  const [searchValue, setSearchValue] = React.useState<string>('');

  const _isSelected = (option: Option): boolean => {
    const boolean =
      selected && _isMultiSelect(selected)
        ? selected.some((opt) => opt.value === option.value) ?? false === reversedSelect
        : selected?.value === option.value;
    return reversedSelect ? !boolean : boolean;
  };

  const handleClick = (e: any) => {
    const key = e.target.dataset.value;

    if (!key) {
      return;
    }

    const option = options?.find((opt) => opt.key === key);
    const ind = options?.findIndex((opt) => opt.key === key);
    if (typeof option === 'undefined' || typeof ind === 'undefined') {
      return;
    }

    onChange(option, ind);
  };

  const handleCheckboxClick = (e: React.ChangeEvent<HTMLElement>) => {
    (e.target as HTMLElement).closest('li')?.click();
  };

  const handleToggle = () => {
    setSearchValue('');
  };

  const handleHoverToActivate = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    (e.target as HTMLElement).closest('input')?.focus();
  }

  let sourceElement: HTMLElement | null = null;
  const handleDragStart = (event: React.DragEvent<HTMLLIElement>) => {
    (event.target as HTMLLIElement).style.opacity = '0.5';
    sourceElement = event.target as HTMLLIElement;
    event.dataTransfer.effectAllowed = 'move';
  };
  const handleDragOver = (event: React.DragEvent<HTMLLIElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  };

  const handleDragEnter = (event: React.DragEvent<HTMLLIElement>) => {
    (event.target as HTMLLIElement).classList.add('over');
  };

  const handleDragLeave = (event: React.DragEvent<HTMLLIElement>) => {
    (event.target as HTMLLIElement).classList.remove('over');
  };

  const handleDrop = (event: React.DragEvent<HTMLLIElement>) => {
    event.stopPropagation();

    if (sourceElement !== event.target) {
      const list = options ? options?.filter((item) => item.value !== sourceElement?.dataset?.['value']) : [];
      const removed: Option[] = options?.filter((item) => item.value === sourceElement?.dataset?.['value']);
      const insertAt: number = options?.findIndex(
        (item) => item.value === (event.target as HTMLLIElement).dataset?.['value']
      );

      let tempList = [];

      if (insertAt >= list.length) {
        tempList = list?.slice(0).concat(removed);
        onOrderChange?.(tempList.map((opt) => opt.value));
      } else if (insertAt < list.length) {
        tempList = list.slice(0, insertAt).concat(removed);

        const newList = tempList.concat(list.slice(insertAt));
        onOrderChange?.(newList.map((opt) => opt.value));
      }
    }
    (event.target as HTMLLIElement).classList.remove('over');
  };

  const handleDragEnd = (event: React.DragEvent<HTMLLIElement>) => {
    (event.target as HTMLLIElement).style.opacity = '1';
    // console.log('-------------------------------------------------------------');
  };
  const draggableAddition = {
    draggable: true,
    onDragStart: handleDragStart,
    onDragOver: handleDragOver,
    onDragEnter: handleDragEnter,
    onDragLeave: handleDragLeave,
    onDrop: handleDrop,
    onDragEnd: handleDragEnd,
  };

  return (
    <Container>
      {label ? <LabelWrap {...{ label, disabled }}>{label}</LabelWrap> : ''}
      <Tooltip
        {...{
          selfClosing,
          isOpen: false,
          button: (
            <DropdownButton
              {...{
                onClick: (e) => {
                  handleToggle();
                },
                variant,
                disabled,
                size,
                leftIconComponent,
                selected: selected != null && _isMultiSelect(selected) ? !!selected.length : selected ? false : false,
              }}
            >
              {leftIconComponent && leftIconComponent}
              <span>
                {selected != null && _isMultiSelect(selected)
                  ? selected.length
                    ? selected.length + (reversedSelect ? ' Hidden' : ' Selected')
                    : placeholder
                  : (options && selected?.label) ?? placeholder}
              </span>{' '}
              {!leftIconComponent && <ChevronDownIcon />}
            </DropdownButton>
          ),
        }}
      >
        {(withInnerSearch || headerText) && (
          <HeaderWrapper {...{ withInnerSearch }}>
            {headerText && <SelectHeader>{headerText}</SelectHeader>}
            {withInnerSearch && (
              <Search 
                {...{
                  searchSize: size,
                  value: searchValue,
                  variant: 'regular',
                  placeholder: searchPlaceholder,
                  onChange: (e) => {
                    setSearchValue(e.target.value);
                  },
                  onMouseOver: (e) => {
                    handleHoverToActivate(e)
                  }
                }}
              />
            )}
            { children }
          </HeaderWrapper>
        )}
        <StyledSelect
          {...{
            onClick: (e) => {
              !disabled && handleClick(e);
            },
            value: selected,
          }}
        >
          {options
            .sort((a, b) => {
              if (columnOrder) return columnOrder.indexOf(a.key) - columnOrder.indexOf(b.key);
              else return 1;
            })
            .filter((opt) => opt.label.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()))
            .map((option, index) => {
              return (
                <StyledOption
                  {...{
                    ...(withSortingDnD && draggableAddition),
                    id: '' + index,
                    isSelected: _isSelected(option),
                    key: option.key,
                    'data-value': option.key,
                  }}
                >
                  {withCheckboxes ? (
                    <Checkbox
                      {...{
                        backgroundColor: theme.palette.main.primary1.base,
                        checked: _isSelected(option),
                        onChange: (e) => {
                          handleCheckboxClick(e);
                        },
                        dataValue: option.key,
                      }}
                    />
                  ) : null}
                  {option.label}
                  {withCheckboxes ? (
                    option.additionalData ? (
                      <AdditionalData
                        {...{ style: { marginLeft: 'auto' } }}
                      >{`(${option.additionalData})`}</AdditionalData>
                    ) : null
                  ) : (
                    <CheckMarkIcon
                      {...{
                        backgroundColor: theme.palette.main.primary1.base,
                        width: 16,
                        height: 16,
                      }}
                    />
                  )}
                </StyledOption>
              );
            })}
        </StyledSelect>
      </Tooltip>
      {helper && <MessageWrap>{helper}</MessageWrap>}
    </Container>
  );
};

export default Select;
