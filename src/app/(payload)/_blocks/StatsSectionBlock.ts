import { Block } from 'payload'

export const StatsSectionBlock: Block = {
  slug: 'stats-section',
  interfaceName: 'StatsSectionBlockType',
  labels: {
    singular: 'Stats Section (Global Data)',
    plural: 'Stats Sections (Global Data)',
  },
  admin: {
    group: 'Page Builder',
    images: {
      thumbnail: {
        url: '/blocks/companystatsex.png',
        alt: 'Preview of the Company Stats Section',
      },
    },
  },
  fields: [],
}
