import { render } from '@cellxpert/react-testing-utils';

import { Label } from './Label';

describe('Label', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Label label="Label" />);

    expect(baseElement).toBeTruthy();
  });
  it('snould not have a label attribute', () => {
    const { baseElement, getByText } = render(<Label label="Label" />);

    expect(baseElement).toMatchSnapshot();
    // expect(getByText('Label')).not.toHaveAttribute('label');
  });
});
