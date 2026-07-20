import { Block } from 'payload'

export const ProjectsSectionBlock: Block = {
  slug: 'projects-section',
  interfaceName: 'ProjectsSectionBlockType',
  labels: {
    singular: 'Projects Section',
    plural: 'Projects Sections',
  },
  admin: {
    group: 'Page Builder',

    images: {
      thumbnail: {
        url: '/blocks/projectsex.png',
        alt: 'Preview of the Projects Section',
      },
    },
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      label: 'Section Heading',
      defaultValue: 'Follow Our Projects',
      localized: true,
    },
    {
      name: 'subheading',
      type: 'textarea',
      label: 'Section Subheading',
      defaultValue:
        'It is a long established fact that a reader will be distracted by the readable content of page lookings at its layouts points.',
      localized: true,
    },
    {
      name: 'viewAllText',
      type: 'text',
      localized: true,
      admin: {
        description: 'Button text, e.g., "View All Articles".',
      },
    },
    {
      name: 'populateBy',
      type: 'select',
      label: 'Populate By',
      defaultValue: 'latest',
      options: [
        {
          label: 'Latest Projects (Automatically, the most recent)',
          value: 'latest',
        },
        {
          label: 'Hand-picked (Select manually)',
          value: 'manual',
        },
      ],
    },
    {
      name: 'selectedProjects',
      type: 'relationship',
      relationTo: 'projects',
      hasMany: true,
      label: 'Select Projects Manually',
      admin: {
        condition: (_, siblingData) => siblingData?.populateBy === 'manual',
        description: 'Drag and drop projects to reorder them in the site grid.',
      },
    },
    {
      name: 'limit',
      type: 'number',
      label: 'Limit Projects',
      defaultValue: 4,
      min: 4,
      admin: {
        condition: (_, siblingData) => siblingData?.populateBy === 'latest',
        description: 'The number of projects that will automatically be displayed in the section.',
      },
    },
  ],
}
