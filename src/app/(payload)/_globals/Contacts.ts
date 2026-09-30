import type { GlobalConfig } from 'payload'

export const Contacts: GlobalConfig = {
  slug: 'contacts',
  label: 'Contacts',
  admin: {
    group: 'Settings',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'email',
      type: 'text',
      label: 'Email',
    },
    {
      name: 'phone',
      type: 'text',
      label: 'Phone Number',
    },
    {
      name: 'website',
      type: 'text',
      label: 'Website URL',
    },
    {
      name: 'mapEmbedUrl',
      type: 'textarea',
      label: 'Google Map Embed URL (src)',
      admin: {
        description: 'Вставте значення src з Google Maps Embed iframe',
      },
    },
  ],
}
