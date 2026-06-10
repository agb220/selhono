import { GlobalConfig } from 'payload'

export const Homepage: GlobalConfig = {
  slug: 'homepage',
  label: 'Головна сторінка',
  admin: {
    group: 'Контент сайту',
  },
  fields: [
    {
      type: 'tabs', // Розбиваємо полях по вкладках, щоб адмінка була красивою
      tabs: [
        {
          label: 'Головний екран (Hero)',
          fields: [
            {
              name: 'heroTitle',
              type: 'text',
              required: true,
              label: 'Головний заголовок (H1)',
              defaultValue: 'Ми створюємо унікальний дизайн',
            },
            {
              name: 'heroDescription',
              type: 'textarea',
              label: 'Опис під заголовком',
            },
            {
              name: 'heroImage',
              type: 'upload',
              relationTo: 'media',
              label: 'Фонова картинка',
            },
          ],
        },
        {
          label: 'Секція Про нас',
          fields: [
            {
              name: 'aboutTitle',
              type: 'text',
              label: 'Заголовок секції',
            },
            {
              name: 'aboutText',
              type: 'richText',
              label: 'Текст',
            },
          ],
        },
      ],
    },
  ],
}
