import { render, fireEvent } from '@cellxpert/react-testing-utils';

import { ContentSwitcher } from './ContentSwitcher';

describe('ContentSwitcher', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ContentSwitcher options={['left', 'middle', 'right']} />);

    expect(baseElement).toMatchSnapshot();
  });

  it('should show the first item as selected by default', () => {
    const { getByText } = render(<ContentSwitcher options={['left', 'middle', 'right']} />);

    // TODO - show debug, add the test to click on the second item, try moving the test-setup to the testind utils

    const firstElement = getByText('left').closest('button');
    expect(firstElement).toMatchSnapshot();
    console.log({ firstElement: firstElement?.style });

    expect(firstElement).toHaveStyle('background-color: rgb(29, 29, 27)');
  });

  it('should be able to change tabs', () => {
    const { getByText } = render(<ContentSwitcher options={['left', 'middle', 'right']} />);

    const secondElement = getByText('middle').closest('button');
    expect(secondElement).toMatchSnapshot();

    expect(secondElement).not.toHaveStyle('background-color: rgb(29, 29, 27)');
    // TODO = add assertion for actual background color

    fireEvent.click(secondElement!);
    expect(secondElement).toHaveStyle('background-color: rgb(29, 29, 27)');
  });

  it.todo('should support disabled tabs');
});
