import { GlobalConfig } from 'payload'
import { MainHeroBlock } from '../_blocks/MainHeroBlock'
import { ProcessSectionBlock } from '../_blocks/ProcessSectionBlock'
import { PromoBlockSection } from '../_blocks/PromoBlockSection'

export const HomePage: GlobalConfig = {
  slug: 'home-page',
  access: {
    read: () => true,
  },
  label: 'Main page',
  admin: {
    group: 'Pages',
  },
  fields: [
    {
      name: 'layout',
      type: 'blocks',
      label: 'Home Page Builder',
      minRows: 1,
      blocks: [MainHeroBlock, ProcessSectionBlock, PromoBlockSection],
    },
  ],
}
