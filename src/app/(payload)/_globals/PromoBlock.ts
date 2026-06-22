import { GlobalConfig } from 'payload'

export const PromoBlock: GlobalConfig = {
  slug: 'promo-block',
  label: 'Promo Block',
  admin: {
    group: 'Blocks Content',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Title',
      localized: true,
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      label: 'Description / Text',
      localized: true,
    },
    {
      name: 'contactInfo',
      type: 'group',
      label: 'Contact Information',
      fields: [
        {
          name: 'phone',
          type: 'text',
          label: 'Phone Number',
        },
        {
          name: 'label',
          type: 'text',
          label: 'Phone Label (e.g., Call Us Anytime)',
          localized: true,
        },
      ],
    },
    {
      name: 'ctaButton',
      type: 'group',
      label: 'Call to Action Button',
      fields: [
        {
          name: 'label',
          type: 'text',
          label: 'Button Label',
          localized: true,
        },
        {
          name: 'link',
          type: 'text',
          label: 'Button Link (URL)',
        },
      ],
    },
    {
      name: 'leftImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Left Image (Wide Arch)',
    },
    {
      name: 'rightImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Right Image (Narrow Arch)',
    },
  ],
}
