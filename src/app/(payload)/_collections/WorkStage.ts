import { CollectionConfig } from 'payload'

export const WorkStage: CollectionConfig = {
  slug: 'work-stage',

  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'updatedAt'],
    group: 'Blocks Content',
  },

  labels: {
    singular: 'Етап роботи',
    plural: 'Етапи роботи',
  },

  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Заголовок картки',
      localized: true,
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      label: 'Опис картки',
      localized: true,
    },
    {
      name: 'nameLink',
      type: 'text',
      required: true,
      label: 'Name Link',
      defaultValue: 'Read More',
      localized: true,
    },
    {
      name: 'link',
      type: 'text',
      required: true,
      label: 'Посилання для кнопки (Read More)',
      defaultValue: '/',
    },
  ],
}
