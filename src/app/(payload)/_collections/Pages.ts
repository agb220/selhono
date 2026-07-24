import { CollectionConfig } from 'payload'
import { MainHeroBlock } from '../_blocks/MainHeroBlock'
import { ProcessSectionBlock } from '../_blocks/ProcessSectionBlock'
import { PromoBlockSection } from '../_blocks/PromoBlockSection'
import { formatSlug } from '@/lib/hooks/formatSlug'
import { HeroScrollBlock } from '../_blocks/HeroScrollBlock'
import { HeroBlock } from '../_blocks/HeroBlock'
import { ReviewsSectionBlock } from '../_blocks/ReviewsSectionBlock'
import { LogoMarqueeBlock } from '../_blocks/LogoMarqueeBlock'
import { ProjectsSectionBlock } from '../_blocks/ProjectsSectionBlock'
import { StatsSectionBlock } from '../_blocks/StatsSectionBlock'
import { BlogSectionBlock } from '../_blocks/BlogSectionBlock'
import { CTABlock } from '../_blocks/CTABlock'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
    group: 'Pages',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Page Title',
      localized: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'Slug (URL Address)',
      admin: {
        description:
          'Enter the page URL identifier. For example: "about", "services", "contact". Do not use uppercase letters, spaces, or leading slashes.',
      },

      hooks: {
        beforeValidate: [formatSlug('title')],
      },
      validate: (val: any) => {
        if (val && /[^a-z0-9-_]/.test(val)) {
          return 'The slug must contain only lowercase letters, numbers, hyphens, or underscores.'
        }
        return true
      },
    },
    {
      name: 'layout',
      type: 'blocks',
      label: 'Page Layout Builder',
      admin: {
        description: 'Add, remove, or reorder visual components to build the page structure.',
      },
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
        BlogSectionBlock,
        CTABlock,
      ],
    },
  ],
}
