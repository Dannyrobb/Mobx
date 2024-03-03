import { formatChartData, getSortedVolumeAndCountData } from './CustomerProfileOverviewStore';

describe('Utils', function () {
  test('formatChartData', () => {
    const tests = [
      { input: null, output: null },
      {
        input: [
          {
            Volume: 10,
            Symbol: '$',
            Count: 2,
          },
        ],
        output: [
          {
            volume: 10,
            symbol: '$',
            count: 2,
          },
        ],
      },
      {
        input: [
          {
            Volume: 10,
            Symbol: null,
            Count: 2,
          },
        ],
        output: [
          {
            volume: 10,
            symbol: 'No Symbol',
            count: 2,
          },
        ],
      },
    ];

    tests.forEach((item) => {
      expect(formatChartData(item.input)).toEqual(item.output);
    });
  });

  test('getSortedVolumeAndCountData', () => {
    const testVolume = [
      {
        input: [
          {
            volume: 10,
            symbol: '$',
            count: 19,
          },
          {
            volume: 30,
            symbol: 'No Symbol',
            count: 9,
          },
          {
            volume: 10,
            symbol: 'EUR',
            count: 8,
          },
          {
            volume: 2,
            symbol: 'BRL',
            count: 8,
          },
          // {
          //   volume: 2,
          //   symbol: 'GBP',
          //   count: 8,
          // },
          // {
          //   volume: 1,
          //   symbol: 'ILS',
          //   count: 8,
          // },
        ],
        output: {
          top: [
            {
              value: 30,
              symbol: 'No Symbol',
            },
            {
              value: 10,
              symbol: '$',
            },
            {
              value: 10,
              symbol: 'EUR',
            },
            {
              value: 2,
              symbol: 'BRL',
            },
            // {
            //   value: 3,
            //   symbol: 'Other',
            // },
          ],
          total: 52,
        },
      },
    ];

    testVolume.forEach((item) => {
      expect(getSortedVolumeAndCountData('volume', item.input)).toEqual(item.output);
    });
  });
  test('getSortedVolumeAndCountData 2', () => {
    const testCount = [
      {
        input: [
          {
            volume: 10,
            symbol: '$',
            count: 19,
          },
          {
            volume: 30,
            symbol: 'No Symbol',
            count: 9,
          },
          {
            volume: 10,
            symbol: 'EUR',
            count: 8,
          },
          {
            volume: 2,
            symbol: 'BRL',
            count: 7,
          },
          {
            volume: 2,
            symbol: 'GBP',
            count: 6,
          },
          {
            volume: 2,
            symbol: 'ILS',
            count: 5,
          },
        ],
        output: {
          top: [
            {
              value: 19,
              symbol: '$',
            },
            {
              value: 9,
              symbol: 'No Symbol',
            },
            {
              value: 8,
              symbol: 'EUR',
            },
            {
              value: 7,
              symbol: 'BRL',
            },
            {
              value: 11,
              symbol: 'Other',
            },
          ],
          total: 54,
        },
      },
    ];

    testCount.forEach((item) => {
      expect(getSortedVolumeAndCountData('count', item.input)).toEqual(item.output);
    });
  });
});
