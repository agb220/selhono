import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { en } from '@payloadcms/translations/languages/en'
import { Users } from './app/(payload)/_collections/Users'
import { Media } from './app/(payload)/_collections/Media'
import { Pages } from './app/(payload)/_collections/Pages'
import { Homepage } from './app/(payload)/_globals/Homepage'
import { MainMenu } from './app/(payload)/_globals/MainMenu'
import { LogoSettings } from './app/(payload)/_globals/LogoSettings'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Pages],
  globals: [Homepage, MainMenu, LogoSettings],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URL || '',
  }),
  sharp,
  plugins: [],

  localization: {
    locales: ['en', 'de'],
    defaultLocale: 'en',
    fallback: true,
  },
  i18n: {
    supportedLanguages: { en },
  },
})
