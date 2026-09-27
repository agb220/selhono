import { formatSlug } from '@/lib/hooks/formatSlug'
import type { CollectionConfig } from 'payload'
import { HeroBlock } from '../_blocks/HeroBlock'
import { ContactFormInlineBlock } from '../_blocks/CTAInlineBlock'
import { TeamBlock } from '../_blocks/TeamBlock'

export const Team: CollectionConfig = {
  slug: 'team',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'role', 'location'],
    group: 'Team',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
      },
      hooks: {
        beforeValidate: [formatSlug('name')],
      },
    },
    {
      name: 'photo',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'role',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'location',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      type: 'group',
      name: 'contacts',
      fields: [
        {
          name: 'email',
          type: 'email',
        },
        {
          name: 'phone',
          type: 'text',
        },
        {
          name: 'website',
          type: 'text',
        },
      ],
    },
    {
      name: 'shortDescription',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'biography',
      type: 'richText',
      localized: true,
    },
    {
      name: 'skillsBlock',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
          localized: true,
        },
        {
          name: 'description',
          type: 'textarea',
          localized: true,
        },
        {
          name: 'items',
          type: 'array',
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
              localized: true,
            },
            {
              name: 'percentage',
              type: 'number',
              required: true,
              min: 0,
              max: 100,
            },
          ],
        },
      ],
    },
    {
      name: 'faqBlock',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
          localized: true,
        },
        {
          name: 'description',
          type: 'textarea',
          localized: true,
        },
        {
          name: 'items',
          type: 'array',
          fields: [
            {
              name: 'question',
              type: 'text',
              required: true,
              localized: true,
            },
            {
              name: 'answer',
              type: 'textarea',
              required: true,
              localized: true,
            },
          ],
        },
      ],
    },
    {
      name: 'socials',
      type: 'array',
      fields: [
        {
          name: 'platform',
          type: 'select',
          required: true,
          options: [
            { label: 'Facebook', value: 'facebook' },
            { label: 'X', value: 'X' },
          ],
        },
        {
          name: 'url',
          type: 'text',
          required: true,
        },
        {
          name: 'icon',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
    {
      name: 'layout',
      type: 'blocks',
      blocks: [HeroBlock, TeamBlock, ContactFormInlineBlock],
    },
  ],
}
