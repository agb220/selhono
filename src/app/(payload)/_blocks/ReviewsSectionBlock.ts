import { Block } from 'payload'

export const ReviewsSectionBlock: Block = {
  slug: 'reviews-section',
  interfaceName: 'ReviewsSectionBlockType',
  labels: {
    singular: 'Reviews Section',
    plural: 'Reviews Sections',
  },

  admin: {
    group: 'Page Builder',
    images: {
      thumbnail: {
        url: '/blocks/ReviewsBlockEx.png',
        alt: 'Preview of the Reviews Section',
      },
    },
  },

  fields: [
    {
      name: 'reviews',
      type: 'relationship',
      relationTo: 'reviews',
      hasMany: true,
      required: true,
      label: 'Select the review for this section',
    },
  ],
}
