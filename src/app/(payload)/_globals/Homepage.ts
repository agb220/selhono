import { GlobalConfig } from 'payload'
import { MainHeroBlock } from '../_collections/MainHeroBlock'

export const HomePage: GlobalConfig = {
  slug: 'home-page',
  access: {
    read: () => true,
  },
  label: 'Головна сторінка',
  admin: {
    group: 'Сторінки',
  },
  fields: [
    {
      name: 'layout',
      type: 'blocks',
      label: 'Конструктор головної сторінки',
      minRows: 1,
      blocks: [MainHeroBlock],
    },
  ],
}
