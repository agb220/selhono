import { GlobalConfig } from 'payload'

export const ReviewsBlock: GlobalConfig = {
  slug: 'reviews-block',
  label: 'Reviews Block',
  admin: {
    group: 'Blocks Content',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Title',
      localized: true,
    },

    {
      name: 'ctaButton',
      type: 'group',
      label: 'Call to Action Button',
      fields: [
        {
          name: 'label',
          type: 'text',
          label: 'Button Label',
          localized: true,
        },
      ],
    },
    {
      name: 'reviews',
      type: 'relationship',
      relationTo: 'reviews',
      hasMany: true,
      required: false,
      label: 'Select review',
    },
  ],
}
