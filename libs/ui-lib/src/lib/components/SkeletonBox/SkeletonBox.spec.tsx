import { render } from '@testing-library/react';

import { SkeletonBox } from './SkeletonBox';

describe('SkeletonBox', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SkeletonBox />);
    expect(baseElement).toMatchSnapshot();
  });
});
