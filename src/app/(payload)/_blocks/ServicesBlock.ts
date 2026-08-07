import { Block } from 'payload'

export const ServicesBlock: Block = {
  slug: 'services-section',
  interfaceName: 'ServicesBlockType',
  labels: {
    singular: 'Services Section',
    plural: 'Services Sections',
  },

  admin: {
    group: 'Page Builder',
    images: {
      thumbnail: {
        url: '/blocks/WorkStages.png',
        alt: 'Preview of the Services Section',
      },
    },
  },

  fields: [
    {
      name: 'services',
      type: 'relationship',
      relationTo: 'services',
      hasMany: true,
      required: true,
      label: 'Select the Service for this section',
    },
  ],
}
