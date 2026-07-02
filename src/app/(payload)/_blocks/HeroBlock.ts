import { Block } from 'payload'

export const HeroBlock: Block = {
  slug: 'hero-block',
  interfaceName: 'HeroBlockType',
  labels: {
    singular: 'Hero Section',
    plural: 'Hero Sections',
  },
  admin: {
    group: 'Page Builder',
    images: {
      thumbnail: {
        url: '/blocks/HeroBlockEx.png',
        alt: 'Hero banner preview',
      },
    },
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Section Title',
      localized: true,
      required: true,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
  ],
}
