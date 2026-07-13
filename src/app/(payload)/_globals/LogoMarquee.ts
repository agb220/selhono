import { GlobalConfig } from 'payload'

export const LogoMarquee: GlobalConfig = {
  slug: 'logo-marquee',
  access: {
    read: () => true,
  },
  admin: {
    group: 'Blocks Content',
  },
  fields: [
    {
      name: 'logos',
      type: 'array',
      label: 'Marquee Logos',
      minRows: 1,
      labels: {
        singular: 'Logo Item',
        plural: 'Logo Items',
      },
      fields: [
        {
          name: 'logoImage',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: 'Logo Image',
        },
        {
          name: 'brandName',
          type: 'text',
          label: 'Brand Name (for SEO/Alt)',
          required: true,
        },
      ],
    },
  ],
}
