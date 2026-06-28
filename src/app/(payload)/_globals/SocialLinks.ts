import { GlobalConfig } from 'payload'

export const SocialLinks: GlobalConfig = {
  slug: 'social-links',
  access: {
    read: () => true,
  },
  admin: {
    group: 'Налаштування',
  },
  fields: [
    {
      name: 'links',
      type: 'array',
      label: 'Social Media Links',
      minRows: 1,
      fields: [
        {
          name: 'name',
          type: 'text',
          label: 'Platform Name',
          required: true,
        },
        {
          name: 'url',
          type: 'text',
          label: 'Profile URL',
          required: true,
        },
        {
          name: 'icon',
          type: 'upload',
          relationTo: 'media',
          label: 'SVG Icon File',
          required: true,
          admin: {
            description: 'Upload an icon file in .svg format',
          },
        },
      ],
    },
  ],
}
