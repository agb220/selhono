import { GlobalConfig } from 'payload'

export const LogoSettings: GlobalConfig = {
  slug: 'logo-settings',
  label: 'Logo Settings',
  admin: {
    group: 'Settings',
  },
  fields: [
    {
      name: 'logoType',
      type: 'select',
      label: 'Logo Type',
      defaultValue: 'text',
      options: [
        { label: 'Text', value: 'text' },
        { label: 'Image (SVG/PNG)', value: 'image' },
      ],
    },
    {
      name: 'logoText',
      type: 'text',
      label: 'Logo text',

      localized: true,
      admin: {
        condition: (data) => data?.logoType === 'text',
      },
    },
    {
      name: 'logoImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Logo file',
      admin: {
        condition: (data) => data?.logoType === 'image',
      },
    },
  ],
}
