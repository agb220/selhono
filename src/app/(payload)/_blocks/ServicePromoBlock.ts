import { Block } from 'payload'

export const ServicePromoBlock: Block = {
  slug: 'service-promo-block',
  interfaceName: 'ServicePromoBlockType',
  labels: {
    singular: 'Service Promo Block',
    plural: 'Service Promo Blocks',
  },
  admin: {
    group: 'Page Builder',
    images: {
      thumbnail: {
        url: '/blocks/ServicePromoBlock.avif',
        alt: 'Preview of the Service Promo Section',
      },
    },
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
      name: 'description',
      type: 'textarea',
      required: true,
      localized: true,
      label: 'Description',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Image',
    },
    {
      name: 'buttonText',
      type: 'text',
      localized: true,
      label: 'Button Text',
    },
  ],
}
