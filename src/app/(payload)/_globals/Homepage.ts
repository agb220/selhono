import { GlobalConfig } from 'payload'
import { MainHeroBlock } from '../_blocks/MainHeroBlock'
import { ProcessSectionBlock } from '../_blocks/ProcessSectionBlock'
import { PromoBlockSection } from '../_blocks/PromoBlockSection'
import { HeroScrollBlock } from '../_blocks/HeroScrollBlock'
import { HeroBlock } from '../_blocks/HeroBlock'
import { ReviewsSectionBlock } from '../_blocks/ReviewsSectionBlock'
import { LogoMarqueeBlock } from '../_blocks/LogoMarqueeBlock'
import { ProjectsSectionBlock } from '../_blocks/ProjectsSectionBlock'
import { StatsSectionBlock } from '../_blocks/StatsSectionBlock'

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
      blocks: [
        MainHeroBlock,
        ProcessSectionBlock,
        PromoBlockSection,
        HeroScrollBlock,
        HeroBlock,
        ReviewsSectionBlock,
        LogoMarqueeBlock,
        ProjectsSectionBlock,
        StatsSectionBlock,
      ],
    },
  ],
}
