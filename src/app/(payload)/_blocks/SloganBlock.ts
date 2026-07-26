import { Block } from 'payload'

export const SloganBlock: Block = {
  slug: 'slogan-block',
  interfaceName: 'SloganBlockType',
  admin: {
    group: 'Page Builder',
    images: {
      thumbnail: {
        url: '/blocks/sloganblockex.avif',
        alt: 'Preview of the Slogan Section',
      },
    },
  },
  fields: [
    {
      name: 'quote',
      label: 'Quote / Slogan',
      type: 'textarea',
      required: true,
      localized: true,
    },
    {
      name: 'author',
      label: 'Author',
      type: 'text',
      required: false,
      localized: true,
    },
  ],
}
