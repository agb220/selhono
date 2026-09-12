import type { Block } from 'payload'

export const BlogSearchSection: Block = {
  slug: 'blog-search-section',
  interfaceName: 'BlogSearchBlockType',
  admin: {
    group: 'Blog',
    images: {
      thumbnail: {
        url: '/blocks/blogsearckex.avif',
        alt: 'Blog Search Block preview',
      },
    },
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
      defaultValue: 'Latest Post',
    },
  ],
}
