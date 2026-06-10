import { CollectionConfig } from 'payload'

// Функція-хелпер для створення слага
const formatSlug = (val: string): string =>
  val
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '') // видаляємо все крім букв, цифр і пробілів/дефісів
    .replace(/\s+/g, '-') // замінюємо пробіли на дефіси
    .replace(/-+/g, '-') // прибираємо подвійні дефіси
    .replace(/^-+|-+$/g, '') // зрізаємо дефіси на початку та в кінці

const Categories: CollectionConfig = {
  slug: 'categories',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      localized: false,
      hooks: {
        beforeValidate: [
          ({ value, data, operation }) => {
            if (value) return formatSlug(value)
            if (data?.title) {
              const englishTitle = typeof data.title === 'object' ? data.title.en : data.title
              if (englishTitle) {
                return formatSlug(englishTitle)
              }
            }
            return value
          },
        ],
      },
      admin: {
        readOnly: false,
        description: 'генерується автоматично з англійської назви сторінки',
      },
    },
  ],
}

export default Categories
