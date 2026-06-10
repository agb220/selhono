import { GlobalConfig } from 'payload'

export const LogoSettings: GlobalConfig = {
  slug: 'logo-settings',
  label: 'Налаштування logo',
  admin: {
    group: 'Налаштування',
  },
  fields: [
    {
      name: 'logoType',
      type: 'select',
      label: 'Тип логотипа',
      defaultValue: 'text',
      options: [
        { label: 'Текст', value: 'text' },
        { label: 'Зображення (SVG/PNG)', value: 'image' },
      ],
    },
    {
      name: 'logoText',
      type: 'text',
      label: 'Текст логотипа',

      localized: true,
      admin: {
        condition: (data) => data?.logoType === 'text',
      },
    },
    {
      name: 'logoImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Файл логотипа',
      admin: {
        condition: (data) => data?.logoType === 'image',
      },
    },
  ],
}
