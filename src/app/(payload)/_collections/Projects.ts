import { CollectionConfig } from 'payload'
import { formatSlug } from '@/lib/hooks/formatSlug'

export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'date'],
    group: 'Projects',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Project Title',
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
          'Generated automatically from the project name. Contains only lowercase letters, numbers, and hyphens.',
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
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      required: true,
      label: 'Category',
      admin: {
        description: 'Select a category to filter by on the website (Bathroom, Bedroom, etc.)',
      },
    },
    {
      name: 'mainImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Main Image / Cover',
    },
    {
      name: 'projectDetails',
      type: 'group',
      label: 'Project Meta Details',
      interfaceName: 'ProjectDetails',
      fields: [
        {
          name: 'client',
          type: 'text',
          label: 'Client Name',
          localized: true,
        },
        {
          name: 'tags',
          type: 'text',
          label: 'Tags',
          localized: true,
          admin: {
            description: 'Enter them separated by commas. For example: VIP, Home',
          },
        },
        {
          name: 'date',
          type: 'date',
          label: 'Project Date',
          admin: {
            date: {
              pickerAppearance: 'dayOnly',
              displayFormat: 'dd.MM.yyyy',
            },
          },
        },
      ],
    },
    {
      name: 'description',
      type: 'richText',
      label: 'Project Description',
      localized: true,
      required: true,
    },
    {
      name: 'gallery',
      type: 'array',
      label: 'Project Gallery',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
  ],
}

export default Projects
