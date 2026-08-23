import { GlobalConfig } from 'payload'

export const PricingGlobal: GlobalConfig = {
  slug: 'pricing-global',
  label: 'Pricing Block',
  admin: {
    group: 'Blocks Content (Reusable Components)',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      localized: true,
      label: 'Section Title',
      defaultValue: 'Pricing & Plan',
    },
    {
      name: 'subtitle',
      type: 'textarea',
      localized: true,
      label: 'Section Subtitle / Description',
    },
    {
      name: 'plans',
      type: 'array',
      label: 'Pricing Plans',
      minRows: 1,
      labels: {
        singular: 'Plan',
        plural: 'Plans',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          localized: true,
          label: 'Plan Title',
        },
        {
          name: 'stripePriceId',
          type: 'text',
          required: true,
          label: 'Stripe Price ID (e.g. price_1Nxxx...)',
          admin: {
            description: 'Отримайте Price ID з панелі Stripe Dashboard',
          },
        },
        {
          type: 'row',
          fields: [
            {
              name: 'price',
              type: 'text',
              required: true,
              label: 'Price (e.g. 29)',
              admin: {
                width: '50%',
              },
            },
            {
              name: 'currency',
              type: 'text',
              label: 'Currency Symbol',
              defaultValue: '$',
              admin: {
                width: '50%',
              },
            },
          ],
        },
        {
          name: 'period',
          type: 'text',
          localized: true,
          label: 'Period (e.g. /month)',
          defaultValue: '/month',
        },
        {
          name: 'badge',
          type: 'text',
          localized: true,
          label: 'Badge Text (e.g. Most Popular Plans)',
        },
        {
          name: 'isPopular',
          type: 'checkbox',
          label: 'Highlight as Popular Plan',
          defaultValue: false,
        },
        {
          name: 'features',
          type: 'textarea',
          required: true,
          localized: true,
          label: 'Features (One per line)',
          admin: {
            description: 'Enter each feature on a new line',
          },
        },
        {
          name: 'buttonText',
          type: 'text',
          localized: true,
          label: 'Button Text',
          defaultValue: 'Get Started',
        },
      ],
    },
  ],
}
