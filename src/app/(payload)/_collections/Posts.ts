import { formatSlug } from '@/lib/hooks/formatSlug'
import { CollectionConfig } from 'payload'

export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    useAsTitle: 'title',
    group: 'Blog',
  },
  fields: [
    { name: 'title', type: 'text', required: true, localized: true },
    {
      name: 'slug',
      type: 'text',
      unique: true,
      hooks: {
        beforeValidate: [formatSlug('title')],
      },
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'publishedDate',
      type: 'date',
      required: true,
      defaultValue: () => new Date(),
      admin: {
        position: 'sidebar',
        date: {
          pickerAppearance: 'dayOnly',
          displayFormat: 'd MMMM, yyyy',
        },
      },
    },
    {
      name: 'excerpt',
      type: 'textarea',
      admin: {
        description: 'Short description for cards and the Latest Post section',
      },
      localized: true,
    },
    { name: 'mainImage', type: 'upload', relationTo: 'media', required: true },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'blog-categories',
      required: true,
    },
    { name: 'tags', type: 'array', fields: [{ name: 'tag', type: 'text' }] },
    {
      name: 'content',
      type: 'richText',
      localized: true,
    },
  ],
}
