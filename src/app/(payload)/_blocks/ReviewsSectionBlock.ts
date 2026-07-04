import { Block } from 'payload'

export const ReviewsSectionBlock: Block = {
  slug: 'reviews-section',
  interfaceName: 'ReviewsSectionBlockType',
  labels: {
    singular: 'Reviews Section [Global]',
    plural: 'Reviews Sections [Global]',
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
  fields: [],
}
