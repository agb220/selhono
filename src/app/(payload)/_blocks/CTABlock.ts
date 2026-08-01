import { Block } from 'payload'

export const CTABlock: Block = {
  slug: 'cta-block-section',
  interfaceName: 'CTABlockSectionType',
  labels: {
    singular: 'CTA Form [Global]',
    plural: 'CTA Form  [Global]',
  },
  admin: {
    group: 'CTA Forms ',

    images: {
      thumbnail: {
        url: '/blocks/CTABlockEx.png',
        alt: 'Preview of the CTA Form',
      },
    },
  },

  fields: [],
}
