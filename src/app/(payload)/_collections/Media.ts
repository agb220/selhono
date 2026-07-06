import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  fields: [
    {
      name: 'alt',
      type: 'text',
    },
  ],

  upload: {
    staticDir: 'media',
    mimeTypes: ['image/*', 'application/pdf'],
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: undefined,
        position: 'centre',
        formatOptions: { format: 'jpg', options: { quality: 60 } },
      },
      {
        name: 'card',
        width: 600,
        height: undefined,
        position: 'centre',
        formatOptions: { format: 'jpg', options: { quality: 80 } },
      },
      {
        name: 'slider',
        width: 1280,
        height: undefined,
        position: 'centre',
        formatOptions: { format: 'jpg', options: { quality: 80 } },
      },
      {
        name: 'big',
        width: 2000,
        height: undefined,
        position: 'centre',
        formatOptions: { format: 'jpg', options: { quality: 80 } },
      },
      {
        name: 'large',
        width: 2800,
        height: undefined,
        position: 'centre',
        formatOptions: { format: 'jpg', options: { quality: 80 } },
      },
      {
        name: 'pngSlider',
        width: 1200,
        height: undefined,
        position: 'centre',
        formatOptions: { format: 'png', options: { quality: 80 } },
      },
      {
        name: 'pngBig',
        width: 2000,
        height: undefined,
        position: 'centre',
        formatOptions: { format: 'png', options: { quality: 80 } },
      },
    ],
  },

  hooks: {
    beforeValidate: [
      async ({ req }) => {
        const shouldSkip = req.headers?.get?.('x-skip-sizes') === 'true'

        if (shouldSkip && req.payload?.collections?.media?.config?.upload) {
          req.payload.collections.media.config.upload.imageSizes =
            req.payload.collections.media.config.upload.imageSizes?.filter(
              (size: any) => size.name === 'thumbnail',
            )
        }
      },
    ],
  },
  access: {
    read: () => true,
    create: () => true,
  },
}
