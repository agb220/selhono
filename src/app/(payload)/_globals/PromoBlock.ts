import { GlobalConfig } from 'payload'

export const PromoBlock: GlobalConfig = {
  slug: 'promo-block',
  label: 'Promo Block',
  admin: {
    group: 'Blocks Content (Reusable Components)',
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
          admin: {
            description: 'Character limit: 25. Prevents layout breaking in the navigation menu.',
          },
          validate: (val: any) => {
            if (val && val.length > 25) {
              return 'The label is too long! Maximum allowed is 25 characters.'
            }
            return true
          },
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
