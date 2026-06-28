import { CollectionConfig } from 'payload'

export const WorkStage: CollectionConfig = {
  slug: 'work-stage',

  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'updatedAt'],
    group: 'Blocks Content',
  },

  labels: {
    singular: 'Stage of work',
    plural: 'Stage of work',
  },

  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Card Title',
      localized: true,
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      label: 'Card Description',
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
      label: 'Link for the “Read More” button',
      defaultValue: '/',
    },
  ],
}
