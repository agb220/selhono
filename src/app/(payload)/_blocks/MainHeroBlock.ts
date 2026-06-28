import { Block } from 'payload'

export const MainHeroBlock: Block = {
  slug: 'main-hero',
  labels: {
    singular: 'Main Hero Banner',
    plural: 'Main Hero Banners',
  },
  interfaceName: 'MainHeroBlockType',
  admin: {
    group: 'Page Builder',
    images: {
      thumbnail: {
        url: '/blocks/MainHeroEx.png',
        alt: 'Main banner preview',
      },
    },
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Main Title',
      localized: true,
      required: true,
    },
    {
      name: 'subtitle',
      type: 'textarea',
      label: 'Subtitle / Description',
      localized: true,
      required: true,
    },
    {
      name: 'buttonText',
      type: 'text',
      label: 'Button Text',
      localized: true,
      defaultValue: 'Get Started',
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
    {
      name: 'buttonLink',
      type: 'text',
      label: 'Button Link (URL)',
      defaultValue: '/',
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Background Image',
      required: true,
    },
  ],
}
