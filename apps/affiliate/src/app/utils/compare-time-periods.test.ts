import { compareTimePeriods } from './compare-time-periods';

const input = [
  {
    Adjustments: 0,
    Admin_Fee: 0,
    All: '2',
    Bonus: 0,
    CPA_Commissions: 0,
    CPL_Commissions: 0,
    CTR: '0.00%',
    Clicks: '423',
    Commission: 0,
    Conversion_Rate: '0.00%',
    Demo: 0,
    Deposits: '0',
    Direct_Commissions: 0,
    FTD: 0,
    FirstDeposits: 0,
    GGR: 0,
    Impressions: '0',
    Jackpot_Contribution: 0,
    Leads: 0,
    Net_Deposits: '0',
    PL: 0,
    PositionLOT: 0,
    PositionPL: 0,
    PositionSpread: 0,
    PositionVolume: 0,
    QFTD: 0,
    Registrations: 0,
    Revshare_Commissions: 0,
    Sub_Commissions: 0,
    Tax: 0,
    Unique_Demo: 0,
    Unique_Impressions: '0',
    Unique_Leads: 0,
    Unique_Pre_Reals: 0,
    Unique_Visitors: '423',
    Visitors: '423',
    Volume: '0',
    Withdrawals: '0',
    eCPA: 0,
    eCPC: 0,
    eCPL: 0,
  },
  {
    Adjustments: 0,
    Admin_Fee: 0,
    All: '2',
    Bonus: 0,
    CPA_Commissions: 0,
    CPL_Commissions: 0,
    CTR: '0.00%',
    Clicks: '3',
    Commission: 0,
    Conversion_Rate: '0.00%',
    Demo: 0,
    Deposits: '0',
    Direct_Commissions: 0,
    FTD: 0,
    FirstDeposits: 0,
    GGR: 0,
    Impressions: '0',
    Jackpot_Contribution: 0,
    Leads: 0,
    Net_Deposits: '0',
    PL: 0,
    PositionLOT: 0,
    PositionPL: 0,
    PositionSpread: 0,
    PositionVolume: 0,
    QFTD: 0,
    Registrations: 0,
    Revshare_Commissions: 0,
    Sub_Commissions: 0,
    Tax: 0,
    Unique_Demo: 0,
    Unique_Impressions: '0',
    Unique_Leads: 0,
    Unique_Pre_Reals: 0,
    Unique_Visitors: '1',
    Visitors: '3',
    Volume: '0',
    Withdrawals: '0',
    eCPA: 0,
    eCPC: 0,
    eCPL: 0,
  },
];

const output = {
  Adjustments: 0,
  Admin_Fee: 0,
  All: '0.0',
  Bonus: 0,
  CPA_Commissions: 0,
  CPL_Commissions: 0,
  CTR: 0,
  Clicks: '14000.0',
  Commission: 0,
  Conversion_Rate: 0,
  Demo: 0,
  Deposits: 0,
  Direct_Commissions: 0,
  FTD: 0,
  FirstDeposits: 0,
  GGR: 0,
  Impressions: 0,
  Jackpot_Contribution: 0,
  Leads: 0,
  Net_Deposits: 0,
  PL: 0,
  PositionLOT: 0,
  PositionPL: 0,
  PositionSpread: 0,
  PositionVolume: 0,
  QFTD: 0,
  Registrations: 0,
  Revshare_Commissions: 0,
  Sub_Commissions: 0,
  Tax: 0,
  Unique_Demo: 0,
  Unique_Impressions: 0,
  Unique_Leads: 0,
  Unique_Pre_Reals: 0,
  Unique_Visitors: '42200.0',
  Visitors: '14000.0',
  Volume: 0,
  Withdrawals: 0,
  eCPA: 0,
  eCPC: 0,
  eCPL: 0,
};
describe('filter keys', () => {
  it('should extract the keys as expected', () => {
    const result = compareTimePeriods(input[0], input[1]);

    expect(result).toEqual(output);
  });
});
