import { Block } from 'payload'

export const HeroScrollBlock: Block = {
  slug: 'hero-scroll',
  interfaceName: 'HeroScrollBlockType',
  labels: {
    singular: 'Hero Scroll Section',
    plural: 'Hero Scroll Sections',
  },
  admin: {
    group: 'Page Builder',
    images: {
      thumbnail: {
        url: '/blocks/HeroScrollEx.png',
        alt: 'Hero Scroll banner preview',
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
      name: 'slides',
      type: 'array',
      required: true,
      labels: {
        singular: 'Slide',
        plural: 'Slides',
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
  ],
}
