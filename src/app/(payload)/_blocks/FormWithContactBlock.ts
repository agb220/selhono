import type { Block } from 'payload'

export const FormWithContactBlock: Block = {
  slug: 'form-with-contact-block',
  interfaceName: 'FormWithContactBlockType',
  labels: {
    singular: 'Form with Contact Block',
    plural: 'Form with Contact Blocks',
  },
  admin: {
    group: 'CTA Forms',
    images: {
      thumbnail: {
        url: '/blocks/formwithcontactex.png',
        alt: 'Form with contacts preview',
      },
    },
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      localized: true,
      admin: {
        description: 'Section title',
      },
    },
  ],
}
