import { Block } from 'payload'

export const ProcessSectionBlock: Block = {
  slug: 'process-section',
  interfaceName: 'ProcessSectionBlockType',
  labels: {
    singular: 'Секція етапів роботи',
    plural: 'Секції етапів роботи',
  },

  admin: {
    group: 'Конструктор сторінок',
    images: {
      thumbnail: {
        url: '/blocks/WorkStages.png',
        alt: 'Прев’ю секції етапів роботи',
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
      label: 'Оберіть етапи роботи для цієї секції',
    },
  ],
}
