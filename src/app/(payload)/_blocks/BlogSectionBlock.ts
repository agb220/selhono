import { Block } from 'payload'

export const BlogSectionBlock: Block = {
  slug: 'blog-section',
  interfaceName: 'BlogSectionBlockType',
  admin: {
    group: 'Blog',
    images: {
      thumbnail: {
        url: '/blocks/BlogSectionEx.png',
        alt: 'Blog Section preview',
      },
    },
  },
  labels: {
    singular: 'Blog Section',
    plural: 'Blog Sections',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'subheading',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'cardVariant',
      type: 'select',
      defaultValue: 'default',
      required: true,
      options: [
        { label: 'Default (with border & badge)', value: 'default' },
        { label: 'Simple (no border, cleaner look)', value: 'simple' },
      ],
    },
    {
      name: 'viewAllText',
      type: 'text',
      localized: true,
      admin: {
        description: 'Button text, e.g., "View All Articles".',
      },
    },
    {
      name: 'selectionType',
      type: 'select',
      defaultValue: 'latest',
      required: true,
      options: [
        { label: 'Latest Posts automatically', value: 'latest' },
        { label: 'Select Manually', value: 'manual' },
      ],
    },
    {
      name: 'limit',
      type: 'number',
      defaultValue: 3,
      min: 3,
      admin: {
        condition: (_, siblingData) => siblingData?.selectionType === 'latest',
        description: 'How many posts to display automatically',
      },
    },
    {
      name: 'manualPosts',
      type: 'relationship',
      relationTo: 'posts',
      hasMany: true,
      admin: {
        condition: (_, siblingData) => siblingData?.selectionType === 'manual',
        description: 'Choose specific posts to display in this section',
      },
    },
  ],
}
