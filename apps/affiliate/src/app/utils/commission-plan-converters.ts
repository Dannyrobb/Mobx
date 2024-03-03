import {
  CountryCommission,
  CountryCommissionKeys,
  NumberRevshareCommission,
  NumberRevshareCommissionKeys,
  SpecialCommission,
  SpecialCommissionKeys,
  SymbolCommission,
  SymbolCommissionKeys,
  TierNum,
  TiersCommissionKeys,
  TiersCommission,
  NumberSubAffiliateCommission,
  MultiTierSubAffiliateCommission,
  NumberSubAffiliateCommissionKeys,
  MultiTierSubAffiliateCommissionKeys,
  CPL,
  CplCommissionKeys,
  FixedCommissionKeys,
  Fixed,
  CPA,
} from '@cellxpert/api-types';
import { CommissionPlanDataRow } from '../pages/commission-plan/CommissionPlan';

export function handleCpa(cpa: CPA): CommissionPlanDataRow | undefined {
  if (
    cpa.ActiveCPAPlan === 'Fixed CPA' ||
    cpa.ActiveCPAPlan === 'Fixed CPAA' ||
    cpa.ActiveCPAPlan === 'First Deposit CPA'
  ) {
    return {
      type: `CPA - ${cpa.ActiveCPAPlan}`,
      description: [{ title: 'CPA Amount' }],
      amount: [{ value: cpa.commissionPlan, symbol: '$' }],
    };
  } else if (
    cpa.ActiveCPAPlan === 'CPA by Country and Product' ||
    cpa.ActiveCPAPlan === 'CPA by Tracking Code and country' ||
    cpa.ActiveCPAPlan === 'FTD Tiers By Country'
  ) {
    const commissionPlan = cpa.commissionPlan;

    const transformedData = Object.keys(commissionPlan).map((key) => {
      const item = commissionPlan[key];
      return {
        description: [
          {
            title: key,
            descriptionRows: item.map((o) => `${o.name} (${o.code})`),
          },
        ],
        amount: item.map((o) => ({
          value: o.amount,
          symbol: '$' as const,
        })),
      };
    });

    return {
      type: `CPA - ${cpa.ActiveCPAPlan}`,
      description: transformedData.flatMap((item) => item.description),
      amount: transformedData.flatMap((item) => item.amount),
    };
  } else if (cpa.ActiveCPAPlan === 'CPA by Country' || cpa.ActiveCPAPlan === 'CPA By Product') {
    return {
      type: `CPA - ${cpa.ActiveCPAPlan}`,
      description: cpa.commissionPlan.map((item) => ({
        title: `${item.name} (${item.code})`,
      })),
      amount: cpa.commissionPlan.map((item) => ({
        value: item.amount,
        symbol: '$',
      })),
    };
  } else if (
    cpa.ActiveCPAPlan === 'FTD Tiers' ||
    cpa.ActiveCPAPlan === 'Progressive CPA Tiers' ||
    cpa.ActiveCPAPlan === 'Trader Tiers'
  ) {
    const commissionPlan = cpa.commissionPlan;

    // TODO - need to add different checks and fallbacks, cause things might be undefined.
    const transformedData = Object.keys(commissionPlan).map((key) => {
      return {
        description: [
          {
            title: `Between ${commissionPlan[key as `Tier${TierNum}`]?.from} to ${
              commissionPlan[key as `Tier${TierNum}`]?.to
            } (${key})`,
          },
        ],
        amount: [{ symbol: '$' as const, value: commissionPlan[key as `Tier${TierNum}`]?.amount ?? 0 }].filter(
          (item) => item.value !== 0
        ),
      };
    });
    return {
      type: `CPA - ${cpa.ActiveCPAPlan}`,
      description: transformedData.flatMap((item) => item.description),
      amount: transformedData.flatMap((item) => item.amount),
    };
  } else if (cpa.ActiveCPAPlan === 'FTD Revshare CPA') {
    const commissionPlan = cpa.commissionPlan;
    // TODO translate values of title
    const transformedData = Object.keys(commissionPlan).map((key) => {
      return {
        description: [{ title: key }],
        amount: [
          {
            symbol: (key != 'FTDRevshareCPAFTDMultiplier' ? '$' : '%') as '$' | '%',
            value: commissionPlan?.[key as keyof typeof commissionPlan] ?? 0,
          },
        ],
      };
    });

    return {
      type: `CPA - ${cpa.ActiveCPAPlan}`,
      description: transformedData.flatMap((item) => item.description),
      amount: transformedData.flatMap((item) => item.amount),
    };
  } else if (cpa.ActiveCPAPlan === 'CPA by Instrument & Country') {
    const transformedData = cpa.commissionPlan.map((item) => {
      const descriptionStuff = ['Equity', 'Crypto', 'Forex'].map((inst, i) => {
        return {
          description: [
            {
              title: i === 0 ? `${item.name} (${item.code})` : ' ',
              // title: `${item.name} (${item.code})`, // possible fix that adds country to each row
              descriptionRows: [inst],
            },
          ],
          amount: [{ value: item.amount[i], symbol: '%' as const }],
        };
      });
      console.log(descriptionStuff);

      return {
        description: descriptionStuff.flatMap((item) => item.description),
        amount: descriptionStuff.flatMap((item) => item.amount),
      };
    });
    return {
      type: `CPA - ${cpa.ActiveCPAPlan}`,
      description: transformedData.flatMap((item) => item.description),
      amount: transformedData.flatMap((item) => item.amount),
    };

    // OLD VERSION
    // return {
    //   type: `CPA - ${cpa.ActiveCPAPlan}`,
    //   description: cpa.commissionPlan.map((item) => ({

    //     title: `${item.name} (${item.code})`,
    //     descriptionRows: ['Equity', 'Crypto', 'Forex'],
    //   })),

    //   amount: cpa.commissionPlan.flatMap((item) => {
    //     return item.amount.map((inst) => ({
    //       value: inst,
    //       symbol: '$',
    //     }));
    //   }),
    // };
  } else {
    return undefined;
  }
}

const numberCommissions: NumberRevshareCommissionKeys = [
  'NETDEPOSITRevshare',
  'NETPLRevshare',
  'OngoingNetDepositsRevshare',
  'OngoingPLRevshare',
  'PLCommission',
  'PositionVolumeRevshare',
  'SpreadRevshare',
  'perLOTCommission',
];

const countryCommissions: CountryCommissionKeys = ['NGRRevshareByCountry', 'RevshareEnabledByCountry'];

const symbolCommissions: SymbolCommissionKeys = [
  'RevsharePerSymbol',
  'SpreadRevsharePerSymbol',
  'BrokerageFeeRevsharePerSymbol',
  'PipsPerLotRevshare',
];

const tiersCommissions: TiersCommissionKeys = ['PLTiers', 'MonthlyNetDeposits'];

const specialCommissions: SpecialCommissionKeys = ['MultiLevelSymbolLot'];

function isNumberCommission(key: string): key is NumberRevshareCommissionKeys[number] {
  return numberCommissions.includes(key as unknown as NumberRevshareCommissionKeys[number]);
}

function isCountryCommission(key: string): key is CountryCommissionKeys[number] {
  return countryCommissions.includes(key as unknown as CountryCommissionKeys[number]);
}

function isSymbolCommission(key: string): key is SymbolCommissionKeys[number] {
  return symbolCommissions.includes(key as unknown as SymbolCommissionKeys[number]);
}

function isTiersCommission(key: string): key is TiersCommissionKeys[number] {
  return tiersCommissions.includes(key as unknown as TiersCommissionKeys[number]);
}

function isSpecialCommission(key: string): key is SpecialCommissionKeys[number] {
  return specialCommissions.includes(key as unknown as SpecialCommissionKeys[number]);
}

function isNumberSubAffiliateCommission(key: string): key is NumberSubAffiliateCommissionKeys[number] {
  return numberSubAffiliateCommissions.includes(key as unknown as NumberSubAffiliateCommissionKeys[number]);
}

function isMultiTierSubAffiliateCommission(key: string): key is MultiTierSubAffiliateCommissionKeys[number] {
  return multiTierSubAffiliateCommissions.includes(key as unknown as MultiTierSubAffiliateCommissionKeys[number]);
}

function isFixedCommission(key: string): key is FixedCommissionKeys[number] {
  return fixedCommissionKeys.includes(key as unknown as FixedCommissionKeys[number]);
}

function isCplCommission(key: string): key is CplCommissionKeys[number] {
  return cplCommissionKeys.includes(key as unknown as CplCommissionKeys[number]);
}

export function handleRevshare(
  revShare: Partial<
    NumberRevshareCommission | CountryCommission | SymbolCommission | TiersCommission | SpecialCommission
  >
): CommissionPlanDataRow[] | [] {
  if (Object.keys(revShare).length === 0) {
    return [];
  } else {
    const transformedData: (CommissionPlanDataRow | undefined)[] = (
      Object.keys(revShare) as
        | NumberRevshareCommissionKeys
        | CountryCommissionKeys
        | SymbolCommissionKeys
        | TiersCommissionKeys
        | SpecialCommissionKeys
    ).map((key) => {
      if (isNumberCommission(key)) {
        return {
          type: `Revshare`,
          description: [{ title: key }],
          amount: [
            {
              value: (revShare as NumberRevshareCommission)[key],
              symbol: key === 'perLOTCommission' ? '$' : ('%' as '$' | '%'),
            },
          ], //only single number commission with $ if more added might rather move 2 array
        };
      } else if (isCountryCommission(key)) {
        const commissionPlan = (revShare as CountryCommission)[key];

        return {
          type: `Revshare`,
          description: [
            {
              title: key,
              descriptionRows: commissionPlan.map((item) => `${item.name} (${item.code})`),
            },
          ],
          amount: commissionPlan.map((item) => ({
            value: key != 'RevshareEnabledByCountry' ? item.amount : item.amount == 1 ? 'Enabled' : 'Disabled', //only symbol commission with Enable/Disabled if more added might rather move 2 array
            symbol: key != 'RevshareEnabledByCountry' ? '%' : ('' as '%'),
          })),
        };
      } else if (isSymbolCommission(key)) {
        const commissionPlan = (revShare as SymbolCommission)[key];

        return {
          type: `Revshare`,
          description: [
            {
              title: key,
              descriptionRows: commissionPlan.map((item) => `${item.name}`),
            },
          ],
          amount: commissionPlan.map((item) => ({
            value: item.amount,
            symbol: key != 'RevsharePerSymbol' ? '%' : ('$' as '$' | '%'), //only symbol commission with $ if more added might rather move 2 array
          })),
        };
      } else if (isTiersCommission(key)) {
        const commissionPlan = (revShare as TiersCommission)[key];

        const mappedTiersData = (Object.keys(commissionPlan) as `Tier${TierNum}`[]).map((tierKey) => {
          const item = commissionPlan[tierKey];

          if (!item) {
            return;
          }
          return {
            descriptionRows: [`Between ${item.from} to ${item.to} (${tierKey})`],
            amount: [{ symbol: '%' as const, value: item.amount }],
          };
        });

        return {
          type: `Revshare`,
          description: [
            {
              title: key,
              descriptionRows: mappedTiersData.flatMap((item) => item?.descriptionRows as string[]) ?? [],
            },
          ],
          amount: mappedTiersData.flatMap((item) => item?.amount as { symbol: '%'; value: number }[]) ?? [],
        };
      } else if (isSpecialCommission(key)) {
        const commissionPlan = (revShare as SpecialCommission)[key];

        const mappedSpecialData = (Object.keys(commissionPlan) as `LOTPerSymbolLevel${TierNum}`[]).map((tierKey) => {
          const item = commissionPlan[tierKey];
          return {
            description: [
              {
                title: `${key} (${tierKey})`,
                descriptionRows: item?.map((o) => `${o.name}`),
              },
            ],
            amount: item?.map((o) => ({
              value: o.amount,
              symbol: '%' as const,
            })),
          };
        });

        return {
          type: `Revshare`,
          description: mappedSpecialData.flatMap((item) => item.description),
          amount: mappedSpecialData.flatMap((item) => item.amount as { symbol: '%'; value: number }[]),
        };
      } else {
        return undefined;
      }
    });

    return transformedData as CommissionPlanDataRow[];
  }
}

const numberSubAffiliateCommissions: NumberSubAffiliateCommissionKeys = ['SubAffiliateCPA', 'SubAffiliateComissionCut'];

const multiTierSubAffiliateCommissions: MultiTierSubAffiliateCommissionKeys = ['MultiTierSubaffiliates'];

export function handleSubAffiliate(
  subAffiliate: NumberSubAffiliateCommission | MultiTierSubAffiliateCommission
): CommissionPlanDataRow[] {
  if (Object.keys(subAffiliate).length === 0) {
    return [];
  }

  const transformedData: (CommissionPlanDataRow | undefined)[] = (
    Object.keys(subAffiliate) as NumberSubAffiliateCommissionKeys | MultiTierSubAffiliateCommissionKeys
  ).map((key) => {
    if (isNumberSubAffiliateCommission(key)) {
      return {
        type: `Sub-Affiliate`,
        description: [{ title: key }],
        amount: [
          {
            value: (subAffiliate as NumberSubAffiliateCommission)[key],
            symbol: (key === 'SubAffiliateCPA' ? '$' : '%') as '%' | '$',
          },
        ],
      };
    } else if (isMultiTierSubAffiliateCommission(key)) {
      const data = (subAffiliate as MultiTierSubAffiliateCommission)[key];

      const mappedData = (Object.keys(data) as `level${TierNum}`[]).map((tierKey) => {
        return {
          descriptionRows: [tierKey],
          amount: [{ symbol: '%' as const, value: data[tierKey] ?? 0 }].filter((item) => item.value !== 0),
        };
      });

      return {
        type: `Sub-Affiliate`,
        description: [
          {
            title: key,
            descriptionRows: mappedData.flatMap((item) => item.descriptionRows) ?? [],
          },
        ],
        amount: mappedData.flatMap((item) => item.amount) ?? [],
      };
    } else {
      return undefined;
    }
  });
  return transformedData as CommissionPlanDataRow[];
}

const cplCommissionKeys: CplCommissionKeys = ['PremiumCPLByCountry', 'CPLByCountry', 'CPIByCountry'];

export function handleCpl(cpl: CPL, commissionName = 'CPL') {
  if (Object.keys(cpl).length === 0) {
    return [];
  }

  return (Object.keys(cpl) as Array<CplCommissionKeys[number]>).map((key) => {
    if (isCplCommission(key)) {
      return {
        type: commissionName,
        description: cpl[key]?.map((item) => ({
          title: `${item.name} (${item.code})`,
        })),
        amount: cpl[key]?.map((item) => ({
          value: item.amount,
          symbol: '$',
        })),
      };
    } else {
      return undefined;
    }
  });
}

const fixedCommissionKeys: FixedCommissionKeys = ['FlatMonthlyFee', 'Cashback', 'MinimumMonthlyGuarantee'];

export function handleFixed(fixed: Fixed) {
  if (Object.keys(fixed).length === 0) {
    return [];
  }

  const transformedData = Object.keys(fixed).map((key) => {
    if (isFixedCommission(key)) {
      return {
        type: `Fixed`,
        description: [{ title: key }],
        amount: [{ value: fixed[key], symbol: key === 'Cashback' ? '%' : '$', isEditable: key === 'Cashback' ? 1 : 0 }],
      };
    } else {
      return undefined;
    }
  });

  return transformedData;
}
