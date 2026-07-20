import { formatSlug } from '@/lib/hooks/formatSlug'
import { CollectionConfig } from 'payload'

export const BlogCategories: CollectionConfig = {
  slug: 'blog-categories',
  admin: {
    useAsTitle: 'title',
    group: 'Blog',
  },
  fields: [
    { name: 'title', type: 'text', required: true, localized: true },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      localized: false,
      hooks: {
        beforeValidate: [formatSlug('title')],
      },
      admin: {
        readOnly: false,
        description: 'is automatically generated from the English page title',
      },
    },
  ],
}
