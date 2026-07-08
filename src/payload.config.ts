import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { s3Storage } from '@payloadcms/storage-s3'
import { en } from '@payloadcms/translations/languages/en'
import { de } from '@payloadcms/translations/languages/de'
import { Users } from './app/(payload)/_collections/Users'
import { Pages } from './app/(payload)/_collections/Pages'
import { HomePage } from './app/(payload)/_globals/Homepage'
import { MainMenu } from './app/(payload)/_globals/MainMenu'
import { LogoSettings } from './app/(payload)/_globals/LogoSettings'
import Categories from './app/(payload)/_collections/Categories'
import { FooterSettings } from './app/(payload)/_globals/FooterSettings'
import { SocialLinks } from './app/(payload)/_globals/SocialLinks'
import { WorkStage } from './app/(payload)/_collections/WorkStage'
import { PromoBlock } from './app/(payload)/_globals/PromoBlock'
import { Reviews } from './app/(payload)/_collections/Reviews'
import { ReviewsBlock } from './app/(payload)/_globals/ReviewsBlock'
import Media from './app/(payload)/_collections/Media'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Pages, Categories, WorkStage, Reviews],
  globals: [
    HomePage,
    MainMenu,
    LogoSettings,
    FooterSettings,
    SocialLinks,
    PromoBlock,
    ReviewsBlock,
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  sharp,

  plugins: [
    s3Storage({
      collections: {
        media: {
          disableLocalStorage: true,
          disablePayloadAccessControl: true,
          generateFileURL: ({ filename }) => {
            return `${process.env.NEXT_PUBLIC_S3_PUBLIC_URL}/${filename}`
          },
        },
      },
      bucket: process.env.S3_BUCKET || '',
      config: {
        endpoint: process.env.S3_ENDPOINT || '',
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
        },
        region: 'auto',
        forcePathStyle: true,
      },
    }),
  ],

  localization: {
    locales: [
      {
        label: 'English',
        code: 'en',
      },
      {
        label: 'Deutsch',
        code: 'de',
      },
    ],
    defaultLocale: 'en',
    fallback: true,
  },
  i18n: {
    supportedLanguages: { en, de },
  },
})
