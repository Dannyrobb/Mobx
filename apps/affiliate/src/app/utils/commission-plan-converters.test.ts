import { handleCpa, handleCpl, handleRevshare, handleSubAffiliate } from './commission-plan-converters';

import { CPA, CPL, RevShare, SubAffiliates } from '@cellxpert/api-types';

const cpaCommissionPlanNumberMock: CPA = {
  ActiveCPAPlan: 'Fixed CPA',
  commissionPlan: 10,
};

const cpaCommissionPlanCountryAndProductMock: CPA = {
  ActiveCPAPlan: 'CPA by Country and Product',
  commissionPlan: {
    'MonEspritZen-Romain': [
      {
        code: 'KH',
        name: 'Cambodia',
        amount: 1,
      },
    ],
    'Presentation Design': [
      {
        code: 'ELSE',
        name: 'Default',
        amount: 1,
      },
    ],
    gk228: [
      {
        code: 'US',
        name: 'United States',
        amount: 3,
      },
    ],
    Default: [
      {
        code: 'AQ',
        name: 'Antarctica',
        amount: 1,
      },
      {
        code: 'AR',
        name: 'Argentina',
        amount: 1,
      },
      {
        code: 'AZ',
        name: 'Azerbaijan',
        amount: 1,
      },
      {
        code: 'BI',
        name: 'Burundi',
        amount: 1,
      },
      {
        code: 'IL',
        name: 'Israel',
        amount: 1,
      },
    ],
  },
};

const cpaCommissionPlanCountryMock: CPA = {
  ActiveCPAPlan: 'CPA by Country',
  commissionPlan: [
    {
      code: 'RU',
      name: 'Russia',
      amount: 200,
    },
    {
      code: 'GB',
      name: 'United Kingdom',
      amount: 300,
    },
    {
      code: 'AU',
      name: 'Australia',
      amount: 100,
    },
    {
      code: 'CA',
      name: 'Canada',
      amount: 10,
    },
  ],
};

const cpaCommissionPlanFtdTiersMock: CPA = {
  ActiveCPAPlan: 'FTD Tiers',
  commissionPlan: {
    Tier1: {
      from: 1,
      to: 1000,
      amount: 300,
    },
    Tier2: {
      from: 1001,
      to: 2000,
      amount: 500,
    },
  },
};

const cpaCommissionPlanFtdRevshareMock: CPA = {
  ActiveCPAPlan: 'FTD Revshare CPA',
  commissionPlan: {
    FTDRevshareCPAMinimumFTD: 1,
    FTDRevshareCPAFTDMultiplier: 2,
    FTDRevshareCPACAP: 3,
  },
};

const revshareNumberMock: RevShare = {
  OngoingPLRevshare: 1,
};

const revshareTiersMock: RevShare = {
  MonthlyNetDeposits: {
    Tier1: {
      from: 1,
      to: 2,
      amount: 3,
    },
    Tier2: {
      from: 2,
      to: 3,
      amount: 4,
    },
  },
};

const revshareCountriesMock: RevShare = {
  NGRRevshareByCountry: [
    {
      code: 'BE',
      name: 'Belgium',
      amount: 1,
    },
    {
      code: 'AF',
      name: 'Afghanistan',
      amount: 2,
    },
    {
      code: 'US',
      name: 'United States',
      amount: 1,
    },
  ],
};

const revshareProductsMock: RevShare = {
  RevsharePerSymbol: [
    {
      name: 'AAA',
      amount: 3,
    },
    {
      name: 'BTCUSD!',
      amount: 1,
    },
    {
      name: 'BTCETH1',
      amount: 2,
    },
  ],
};

const subaffiliatesCommissionMock: SubAffiliates = {
  SubAffiliateCPA: 3,
  SubAffiliateComissionCut: 2,
  MultiTierSubaffiliates: {
    level1: 2,
    level2: 3,
  },
};

const cplCommissionMock: CPL = {
  CPLByCountry: [
    {
      code: 'BR',
      name: 'Brazil',
      amount: 2,
    },
    {
      code: 'AS',
      name: 'American Samoa',
      amount: 1,
    },
  ],
};

describe('handleCPA', () => {
  test('commissionPlan is a number', () => {
    const item = cpaCommissionPlanNumberMock;

    const output = handleCpa(item);

    expect(output).toEqual({
      type: 'CPA - Fixed CPA',
      description: [{ title: 'CPA Amount' }],
      amount: [{ value: 10, symbol: '$' }],
    });
  });

  test('commissionPlan is by Country And Product', () => {
    const item = cpaCommissionPlanCountryAndProductMock;

    const output = handleCpa(item);

    expect(output).toEqual({
      type: 'CPA - CPA by Country and Product',
      description: [
        {
          title: 'MonEspritZen-Romain',
          descriptionRows: ['Cambodia (KH)'],
        },
        {
          title: 'Presentation Design',
          descriptionRows: ['Default (ELSE)'],
        },
        {
          title: 'gk228',
          descriptionRows: ['United States (US)'],
        },
        {
          title: 'Default',
          descriptionRows: ['Antarctica (AQ)', 'Argentina (AR)', 'Azerbaijan (AZ)', 'Burundi (BI)', 'Israel (IL)'],
        },
      ],
      amount: [
        { value: 1, symbol: '$' },
        { value: 1, symbol: '$' },
        { value: 3, symbol: '$' },
        { value: 1, symbol: '$' },
        { value: 1, symbol: '$' },
        { value: 1, symbol: '$' },
        { value: 1, symbol: '$' },
        { value: 1, symbol: '$' },
      ],
    });
  });

  test('commissionPlan is by Country', () => {
    const item = cpaCommissionPlanCountryMock;

    const output = handleCpa(item);

    expect(output).toEqual({
      type: 'CPA - CPA by Country',
      description: [
        {
          title: 'Russia (RU)',
        },
        {
          title: 'United Kingdom (GB)',
        },
        {
          title: 'Australia (AU)',
        },
        {
          title: 'Canada (CA)',
        },
      ],
      amount: [
        { value: 200, symbol: '$' },
        { value: 300, symbol: '$' },
        { value: 100, symbol: '$' },
        { value: 10, symbol: '$' },
      ],
    });
  });

  test('commissionPlan is a Tiers', () => {
    const item = cpaCommissionPlanFtdTiersMock;

    const output = handleCpa(item);

    expect(output).toEqual({
      type: 'CPA - FTD Tiers',
      description: [{ title: 'Between 1 to 1000 (Tier1)' }, { title: 'Between 1001 to 2000 (Tier2)' }],
      amount: [
        { value: 300, symbol: '$' },
        { value: 500, symbol: '$' },
      ],
    });
  });

  test('commissionPlan is a FTD Revshare', () => {
    const item = cpaCommissionPlanFtdRevshareMock;

    const output = handleCpa(item);

    expect(output).toEqual({
      type: 'CPA - FTD Revshare CPA',
      description: [
        { title: 'FTDRevshareCPAMinimumFTD' },
        { title: 'FTDRevshareCPAFTDMultiplier' },
        { title: 'FTDRevshareCPACAP' },
      ],
      amount: [
        { value: 1, symbol: '$' },
        { value: 2, symbol: '%' },
        { value: 3, symbol: '$' },
      ],
    });
  });
});

describe('handleRevshare', () => {
  test('Revshare is a number', () => {
    const output = handleRevshare(revshareNumberMock);

    expect(output).toEqual([
      {
        type: 'Revshare',
        description: [{ title: 'OngoingPLRevshare' }],
        amount: [{ value: 1, symbol: '%' }],
      },
    ]);
  });

  test('Revshare is a Tiers', () => {
    const output = handleRevshare(revshareTiersMock);

    expect(output).toEqual([
      {
        type: 'Revshare',
        description: [
          {
            title: 'MonthlyNetDeposits',
            descriptionRows: ['Between 1 to 2 (Tier1)', 'Between 2 to 3 (Tier2)'],
          },
        ],
        amount: [
          { value: 3, symbol: '%' },
          { value: 4, symbol: '%' },
        ],
      },
    ]);
  });

  test('Revshare is a Countries', () => {
    const output = handleRevshare(revshareCountriesMock);

    expect(output).toEqual([
      {
        type: 'Revshare',
        description: [
          {
            title: 'NGRRevshareByCountry',
            descriptionRows: ['Belgium (BE)', 'Afghanistan (AF)', 'United States (US)'],
          },
        ],
        amount: [
          { value: 1, symbol: '%' },
          { value: 2, symbol: '%' },
          { value: 1, symbol: '%' },
        ],
      },
    ]);
  });
  test('Revshare is a Products', () => {
    const output = handleRevshare(revshareProductsMock);

    expect(output).toEqual([
      {
        type: 'Revshare',
        description: [
          {
            title: 'RevsharePerSymbol',
            descriptionRows: ['AAA', 'BTCUSD!', 'BTCETH1'],
          },
        ],
        amount: [
          { value: 3, symbol: '$' },
          { value: 1, symbol: '$' },
          { value: 2, symbol: '$' },
        ],
      },
    ]);
  });
});

describe('handleSubaffiliates', () => {
  test('SubAffiliates is a number', () => {
    const output = handleSubAffiliate(subaffiliatesCommissionMock);

    expect(output).toEqual([
      {
        type: 'Sub-Affiliate',
        description: [{ title: 'SubAffiliateCPA' }],
        amount: [{ value: 3, symbol: '$' }],
      },
      {
        type: 'Sub-Affiliate',
        description: [{ title: 'SubAffiliateComissionCut' }],
        amount: [{ value: 2, symbol: '%' }],
      },
      {
        type: 'Sub-Affiliate',
        description: [{ title: 'MultiTierSubaffiliates', descriptionRows: ['level1', 'level2'] }],
        amount: [
          { value: 2, symbol: '%' },
          { value: 3, symbol: '%' },
        ],
      },
    ]);
  });
});

describe('handleCPL', () => {
  test('CPL', () => {
    const output = handleCpl(cplCommissionMock);

    expect(output).toEqual([
      {
        type: 'CPL',
        amount: [
          {
            value: 2,
            symbol: '$',
          },
          {
            value: 1,
            symbol: '$',
          },
        ],
        description: [
          {
            title: 'Brazil (BR)',
          },
          {
            title: 'American Samoa (AS)',
          },
        ],
      },
    ]);
  });
});
