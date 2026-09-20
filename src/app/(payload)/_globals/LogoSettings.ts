import { GlobalConfig } from 'payload'

export const LogoSettings: GlobalConfig = {
  slug: 'logo-settings',
  label: 'Logo Settings',
  admin: {
    group: 'Settings',
  },
  fields: [
    {
      name: 'logoImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Logo file',
      required: true,
    },
  ],
}
