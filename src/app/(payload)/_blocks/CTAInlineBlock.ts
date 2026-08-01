import { Block } from 'payload'

export const ContactFormInlineBlock: Block = {
  slug: 'contact-form-inline-block',
  interfaceName: 'ContactFormInlineBlockType',
  labels: {
    singular: 'Inline Contact Form',
    plural: 'Inline Contact Forms',
  },
  admin: {
    group: 'CTA Forms',
    images: {
      thumbnail: {
        url: '/blocks/ctainlinenlockex.avif',
        alt: 'Preview of the Feature Cards Section',
      },
    },
  },
  fields: [
    {
      name: 'title',
      label: 'Section Title',
      type: 'text',
      required: true,
      localized: true,
      defaultValue: "Creative project? Let's have a productive talk.",
    },
  ],
}
