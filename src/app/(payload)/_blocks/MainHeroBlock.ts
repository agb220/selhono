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
        alt: 'Прев’ю головного банера',
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
