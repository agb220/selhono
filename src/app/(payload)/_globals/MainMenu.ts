import { GlobalConfig } from 'payload'
import { revalidatePath } from 'next/cache'

export const MainMenu: GlobalConfig = {
  slug: 'main-menu',
  label: 'Main menu',
  admin: {
    group: 'Settings',
  },
  hooks: {
    afterChange: [
      () => {
        revalidatePath('/', 'layout')
      },
    ],
  },
  fields: [
    {
      name: 'items',
      type: 'relationship',
      relationTo: 'pages',
      hasMany: true,
      label: 'Pages in the menu',
      admin: {
        description:
          'Select the pages and drag and drop them to change their order. The “Home” page is automatically added to the site as the first page.',
      },
    },
  ],
}
