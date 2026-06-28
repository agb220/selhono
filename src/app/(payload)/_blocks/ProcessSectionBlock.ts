import { Block } from 'payload'

export const ProcessSectionBlock: Block = {
  slug: 'process-section',
  interfaceName: 'ProcessSectionBlockType',
  labels: {
    singular: 'Work Stages Section',
    plural: 'Work Stages Sections',
  },

  admin: {
    group: 'Page Builder',
    images: {
      thumbnail: {
        url: '/blocks/WorkStages.png',
        alt: 'Preview of the Work Stages Section',
      },
    },
  },

  fields: [
    {
      name: 'stages',
      type: 'relationship',
      relationTo: 'work-stage',
      hasMany: true,
      required: true,
      label: 'Select the work steps for this section',
    },
  ],
}
