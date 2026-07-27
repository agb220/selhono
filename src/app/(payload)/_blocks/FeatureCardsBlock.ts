import { Block } from 'payload'

export const FeatureCardsBlock: Block = {
  slug: 'feature-cards-block',
  interfaceName: 'FeatureCardsBlockType',
  labels: {
    singular: 'Feature Cards Section',
    plural: 'Feature Cards Sections',
  },
  admin: {
    group: 'Page Builder',
    images: {
      thumbnail: {
        url: '/blocks/FeatureCardsBlockEx.avif',
        alt: 'Preview of the Feature Cards Section',
      },
    },
  },
  fields: [
    {
      name: 'items',
      label: 'Cards List',
      type: 'array',
      minRows: 1,
      labels: {
        singular: 'Card Item',
        plural: 'Card Items',
      },
      fields: [
        {
          name: 'title',
          label: 'Title',
          type: 'text',
          required: true,
          localized: true,
        },
        {
          name: 'description',
          label: 'Description',
          type: 'textarea',
          required: true,
          localized: true,
        },
        {
          name: 'image',
          label: 'Image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          type: 'group',
          name: 'button',
          label: 'Button Settings',
          fields: [
            {
              name: 'label',
              label: 'Button Text',
              type: 'text',
              required: true,
              localized: true,
            },
            {
              name: 'url',
              label: 'Button Link / URL',
              required: true,
              type: 'text',
            },
          ],
        },
      ],
    },
  ],
}
