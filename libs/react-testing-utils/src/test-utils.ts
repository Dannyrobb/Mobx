import { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
// import { WithAllStorybookWrappers } from '@cellxpert/wrappers';

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) => render(ui, { ...options });

export * from '@testing-library/react';
export { customRender as render };
