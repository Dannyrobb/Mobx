import { extractFilterKeys } from './marketing-tools';

const input = [
  { Brand: '24bulls', Enabled: true, Language: 'English', Name: 'YanivNewTest1', Size: '1200x1600', Type: 'banner' },
  { Brand: 'markBrand', Enabled: true, Language: 'English', Name: 'yanivtest222', Size: '1200x1600', Type: 'banner' },
];

const output = {
  Brand: { '24bulls': false, markBrand: false },
  Language: { English: false },
  Name: { YanivNewTest1: false, yanivtest222: false },
  Size: { '1200x1600': false },
  Type: { banner: false },
};
describe('filter keys', () => {
  it('should extract the keys as expected', () => {

    const result = extractFilterKeys(input);

    expect(result).toEqual(output);
  });
});
