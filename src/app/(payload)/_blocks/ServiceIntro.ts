import { Block } from 'payload'

export const ServiceIntroBlock: Block = {
  slug: 'service-intro-block',
  interfaceName: 'ServiceIntroBlockType',
  labels: {
    singular: 'Service Intro Block',
    plural: 'Service Intro Blocks',
  },
  admin: {
    group: 'Page Builder',
    images: {
      thumbnail: {
        url: '/blocks/serviceintroex.avif',
        alt: 'Preview of the Service Intro Section',
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
      name: 'subtitle',
      type: 'textarea',
      localized: true,
      label: 'Subtitle (Accent Text)',
    },
    {
      name: 'content',
      type: 'textarea',
      localized: true,
      label: 'Main Content',
    },
  ],
}
