import { CollectionConfig } from 'payload'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
    group: 'Website Content',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Page Title',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'Slug (URL адреса)',
      admin: {
        description:
          'For example: “services,” “about,” “project.” Do not use ‘index’ or “/,” because the home page has already been created in the code.',
      },
    },
    {
      name: 'content',
      type: 'richText',
      label: 'Page Content',
    },
  ],
}
