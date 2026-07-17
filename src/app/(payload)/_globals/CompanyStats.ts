import { GlobalConfig } from 'payload'

export const CompanyStats: GlobalConfig = {
  slug: 'company-stats',
  label: 'Company Statistics',
  admin: {
    group: 'Blocks Content (Reusable Components)',
  },
  fields: [
    {
      name: 'stats',
      type: 'array',
      label: 'Statistics List',
      minRows: 1,
      maxRows: 4,
      labels: {
        singular: 'Stat Item',
        plural: 'Stat Items',
      },
      fields: [
        {
          name: 'value',
          type: 'number',
          required: true,
          label: 'Target Number',
        },
        {
          name: 'label',
          type: 'text',
          required: true,
          label: 'Label Text',
          localized: true,
        },
      ],
    },
  ],
}
