import type { Block } from 'payload'

export const FaqBlock: Block = {
  slug: 'faq-block',
  interfaceName: 'FaqBlockType',
  labels: {
    singular: 'FAQ Block',
    plural: 'FAQ Blocks',
  },
  admin: {
    group: 'Page Builder',
    images: {
      thumbnail: {
        url: '/blocks/faqsblockex.png',
        alt: 'Preview of the Feature Cards Section',
      },
    },
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Section Title',
      defaultValue: 'Every Question Answered',
      localized: true,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Side Image',
      required: true,
    },
    {
      name: 'items',
      type: 'array',
      label: 'Questions & Answers',
      minRows: 1,
      fields: [
        {
          name: 'question',
          type: 'text',
          label: 'Question',
          required: true,
          localized: true,
        },
        {
          name: 'answer',
          type: 'textarea',
          label: 'Answer',
          required: true,
          localized: true,
        },
      ],
    },
  ],
}
