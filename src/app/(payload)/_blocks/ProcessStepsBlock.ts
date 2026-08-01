import { Block } from 'payload'

export const ProcessStepsBlock: Block = {
  slug: 'process-steps-block',
  interfaceName: 'ProcessStepsBlockType',
  labels: {
    singular: 'Process Steps Section',
    plural: 'Process Steps Sections',
  },
  admin: {
    group: 'Page Builder',
    images: {
      thumbnail: {
        url: '/blocks/ProcessstepsBlockex.avif',
        alt: 'Preview of the Process Steps Block Section',
      },
    },
  },
  fields: [
    {
      name: 'title',
      label: 'Section Title',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'description',
      label: 'Section Subtitle / Description',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'steps',
      label: 'Steps List',
      type: 'array',
      minRows: 1,
      labels: {
        singular: 'Step Item',
        plural: 'Step Items',
      },
      fields: [
        {
          name: 'title',
          label: 'Step Title',
          type: 'text',
          required: true,
          localized: true,
        },
        {
          name: 'description',
          label: 'Step Description',
          type: 'textarea',
          required: true,
          localized: true,
        },
        {
          name: 'image',
          label: 'Step Image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
  ],
}
