import { Block } from 'payload'

export const ServiceFeaturesBlock: Block = {
  slug: 'service-features-block',
  interfaceName: 'ServiceFeaturesBlockType',
  labels: {
    singular: 'Service Features Block',
    plural: 'Service Features Blocks',
  },
  admin: {
    group: 'Page Builder',
    images: {
      thumbnail: {
        url: '/blocks/ServiceFeaturesBlockEX.avif',
        alt: 'Preview of the Service Features Section',
      },
    },
  },
  fields: [
    {
      name: 'columns',
      type: 'array',
      label: 'Columns',
      minRows: 1,
      maxRows: 2,
      labels: {
        singular: 'Column',
        plural: 'Columns',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          localized: true,
          label: 'Title',
        },
        {
          name: 'items',
          type: 'textarea',
          required: true,
          localized: true,
          label: 'Items (One per line)',
          admin: {
            description: 'Enter each list item on a new line',
          },
        },
      ],
    },
  ],
}
