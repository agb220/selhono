import type { Block } from 'payload'

export const TeamBlock: Block = {
  slug: 'team-block',
  interfaceName: 'TeamBlockType',
  labels: {
    singular: 'Team Section',
    plural: 'Team Sections',
  },
  admin: {
    group: 'Page Builder',
    images: {
      thumbnail: {
        url: '/blocks/teamblockex.png',
        alt: 'Preview of the Team Section',
      },
    },
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      localized: true,
      admin: {
        description: 'Optional section title',
      },
    },
  ],
}
