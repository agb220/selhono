import { CollectionConfig } from 'payload'
import { formatSlug } from '@/lib/hooks/formatSlug'
import { HeroBlock } from '../_blocks/HeroBlock'
import { ServiceIntroBlock } from '../_blocks/ServiceIntro'
import { LogoMarqueeBlock } from '../_blocks/LogoMarqueeBlock'
import { YoutubeVideoBlock } from '../_blocks/YoutubeVideoBlock'

export const Services: CollectionConfig = {
  slug: 'services',

  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
    group: 'Services',
  },

  labels: {
    singular: 'Service',
    plural: 'Services',
  },

  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Card Title',
      localized: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'Slug (URL Address)',
      admin: {
        description: 'Generates automatically from title, or enter a custom one.',
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
      name: 'description',
      type: 'textarea',
      required: true,
      label: 'Card Description',
      localized: true,
    },
    {
      name: 'nameLink',
      type: 'text',
      required: true,
      label: 'Button Title',
      defaultValue: 'Read More',
      localized: true,
    },

    {
      name: 'layout',
      type: 'blocks',
      label: 'Single Service Page Layout',
      blocks: [HeroBlock, ServiceIntroBlock, LogoMarqueeBlock, YoutubeVideoBlock],
    },
  ],
}
