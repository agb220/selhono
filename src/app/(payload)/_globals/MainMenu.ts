import { GlobalConfig } from 'payload'

export const MainMenu: GlobalConfig = {
  slug: 'main-menu',
  label: 'Головне меню',
  admin: {
    group: 'Налаштування',
  },
  fields: [
    {
      name: 'items',
      type: 'relationship',
      relationTo: 'pages',
      hasMany: true,
      label: 'Сторінки в меню',
      admin: {
        description:
          'Оберіть сторінки та перетягуйте їх для зміни порядку. Сторінка "Home" додається на сайт автоматично першою.',
      },
    },
  ],
}
