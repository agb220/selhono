import { Block } from 'payload'

export const PricingBlock: Block = {
  slug: 'pricing-block',
  interfaceName: 'PricingBlockType',
  labels: {
    singular: 'Pricing Block [Global ]',
    plural: 'Pricing Blocks [Global]',
  },
  admin: {
    group: 'Page Builder',
    images: {
      thumbnail: {
        url: '/blocks/pricingblockex.avif',
        alt: 'Preview of the Service Promo Section',
      },
    },
  },
  fields: [],
}
