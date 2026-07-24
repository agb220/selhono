import { GlobalConfig } from 'payload'

export const CTASection: GlobalConfig = {
  slug: 'cta-section',
  label: 'CTA Banner Section',
  access: {
    read: () => true,
  },
  admin: {
    group: 'Blocks Content (Reusable Components)',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
      defaultValue: 'Wanna join the interno?',
    },
    {
      name: 'description',
      type: 'textarea',
      localized: true,
      defaultValue: 'It is a long established fact will be distracted.',
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'buttonText',
      type: 'text',
      localized: true,
      defaultValue: 'Contact With Us',
    },
  ],
}
