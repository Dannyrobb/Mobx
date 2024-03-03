import { UseGlobalFiltersState, UsePaginationState, UseSortByColumnProps } from 'react-table';

declare module 'react-table' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface, @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
  export interface TableOptions<D> extends Record<string, any> {}

  export interface TableState<D> extends UseGlobalFiltersState<D>, UsePaginationState<D> {}

  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface ColumnInstance<D> extends UseSortByColumnProps<D> {}
}
