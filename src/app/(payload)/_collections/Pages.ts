import { CollectionConfig } from 'payload'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
    group: 'Контент сайту',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Назва сторінки',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'Slug (URL адреса)',
      admin: {
        description:
          'Наприклад: "services", "about", "project". Не використовуйте "index" або "/", бо головна сторінка вже створена в коді.',
      },
    },
    {
      name: 'content',
      type: 'richText',
      label: 'Контент сторінки',
    },
  ],
}
