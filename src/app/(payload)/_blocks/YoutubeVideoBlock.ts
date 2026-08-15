import { Block } from 'payload'

export const YoutubeVideoBlock: Block = {
  slug: 'youtube-video-block',
  interfaceName: 'YoutubeVideoBlockType',
  labels: {
    singular: 'YouTube Video Block',
    plural: 'YouTube Video Blocks',
  },
  admin: {
    group: 'Page Builder',
    images: {
      thumbnail: {
        url: '/blocks/youtubevideoex.avif',
        alt: 'Preview of the Video Youtube Section',
      },
    },
  },
  fields: [
    {
      name: 'youtubeUrl',
      type: 'text',
      required: true,
      label: 'YouTube Video URL',
      admin: {
        placeholder: 'https://www.youtube.com/watch?v=... or https://youtu.be/...',
      },
    },
  ],
}
