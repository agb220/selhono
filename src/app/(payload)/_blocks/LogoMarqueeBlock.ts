import { Block } from 'payload'

export const LogoMarqueeBlock: Block = {
  slug: 'logo-merquee-section',
  interfaceName: 'LogoMarqueeBlockType',
  labels: {
    singular: 'Logo Marquee [Global]',
    plural: 'Logo Marquee [Global]',
  },
  admin: {
    group: 'Page Builder',

    images: {
      thumbnail: {
        url: '/blocks/LogoMarqueEx.png',
        alt: 'Preview of the Logo Marquee Section',
      },
    },
  },

  fields: [],
}
