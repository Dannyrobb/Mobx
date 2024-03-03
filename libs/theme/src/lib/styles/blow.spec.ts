import { blow } from './blow';

describe('blow', () => {
  it('should render successfully', () => {
    const result = blow;
    expect(result).toMatchSnapshot();
  });
});
