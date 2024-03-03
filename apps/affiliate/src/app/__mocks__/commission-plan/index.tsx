import { CommissionPlanPageProps } from '../../pages/commission-plan/CommissionPlan';

export const mockData: CommissionPlanPageProps['data'] = [
  {
    sectionName: 'Default Commission Plan',
    info: [
      {
        type: 'CPA-Fixed CPA',
        description: [{ title: 'CPA amount' }],
        amount: [
          {
            value: '10.00',
            symbol: '$',
          },
        ],
      },
      {
        type: 'Cashback',
        description: [{ title: '' }],
        amount: [
          {
            value: '10.00',
            symbol: '$',
          },
        ],
      },
      {
        type: 'CPA by country & SOme very long stuff',
        description: [
          { title: 'Articles & Blog Posts', descriptionRows: ['Antigua (AG)'] },
          {
            title: 'Architecture & Interior Design',
            descriptionRows: ['Else'],
          },
          { title: 'Dialogue Editing', descriptionRows: ['Montserrat (MS)'] },
        ],
        amount: [
          {
            symbol: '$',
            value: '11.00',
          },
          {
            symbol: '$',
            value: '5.00',
          },
          {
            symbol: '$',
            value: '5.00',
          },
        ],
      },
      {
        type: 'Sub-Affiliate',
        description: [
          {
            title: 'Multi tier subaffiliates',
            descriptionRows: ['level 1', 'level 2', 'level 3', 'level 4', 'level 5'],
          },
        ],
        amount: [
          {
            value: '50',
            symbol: '%',
          },
          {
            value: '40',
            symbol: '%',
          },
          {
            value: '30',
            symbol: '%',
          },
          {
            value: '20',
            symbol: '%',
          },
          {
            value: '10',
            symbol: '%',
          },
        ],
      },
    ],
  },
];
