import { CollectionConfig } from 'payload'

const formatSlug = (val: string): string =>
  val
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '')

const Categories: CollectionConfig = {
  slug: 'categories',
  admin: {
    useAsTitle: 'title',
    group: 'Blocks Content (Reusable Components)',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      localized: false,
      hooks: {
        beforeValidate: [
          ({ value, data, operation }) => {
            if (value) return formatSlug(value)
            if (data?.title) {
              const englishTitle = typeof data.title === 'object' ? data.title.en : data.title
              if (englishTitle) {
                return formatSlug(englishTitle)
              }
            }
            return value
          },
        ],
      },
      admin: {
        readOnly: false,
        description: 'is automatically generated from the English page title',
      },
    },
  ],
}

export default Categories
