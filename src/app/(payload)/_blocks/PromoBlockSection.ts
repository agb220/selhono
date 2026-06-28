import { Block } from 'payload'

export const PromoBlockSection: Block = {
  slug: 'promo-section',
  interfaceName: 'PromoBlockSectionType',
  labels: {
    singular: 'Promo section [Global]',
    plural: 'Promo sections [Global]',
  },
  admin: {
    group: 'Page Builder',

    images: {
      thumbnail: {
        url: '/blocks/PromoBlockEx.png',
        alt: 'Preview of the Promotions Section',
      },
    },
  },

  fields: [],
}
