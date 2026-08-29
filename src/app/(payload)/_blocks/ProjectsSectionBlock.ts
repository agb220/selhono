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
      name: 'displayMode',
      type: 'select',
      label: 'Display Mode',
      defaultValue: 'grid',
      options: [
        {
          label: 'Standard Grid / Home Section',
          value: 'grid',
        },
        {
          label: 'Full Page (Tabs Filter + Pagination)',
          value: 'fullPage',
        },
      ],
      admin: {
        description: 'Select "Full Page" for a full projects page with filters and pagination.',
      },
    },
    {
      name: 'heading',
      type: 'text',
      label: 'Section Heading',
      defaultValue: 'Follow Our Projects',
      localized: true,
      admin: {
        condition: (_, siblingData) => siblingData?.displayMode !== 'fullPage',
      },
    },
    {
      name: 'subheading',
      type: 'textarea',
      label: 'Section Subheading',
      defaultValue:
        'It is a long established fact that a reader will be distracted by the readable content of page lookings at its layouts points.',
      localized: true,
      admin: {
        condition: (_, siblingData) => siblingData?.displayMode !== 'fullPage',
      },
    },
    {
      name: 'viewAllText',
      type: 'text',
      localized: true,
      admin: {
        description: 'Button text, e.g., "View All Articles".',
        condition: (_, siblingData) => siblingData?.displayMode !== 'fullPage',
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
      admin: {
        condition: (_, siblingData) => siblingData?.displayMode !== 'fullPage',
      },
    },
    {
      name: 'selectedProjects',
      type: 'relationship',
      relationTo: 'projects',
      hasMany: true,
      label: 'Select Projects Manually',
      admin: {
        condition: (_, siblingData) =>
          siblingData?.displayMode !== 'fullPage' && siblingData?.populateBy === 'manual',
        description: 'Drag and drop projects to reorder them in the site grid.',
      },
    },
    {
      name: 'limit',
      type: 'number',
      label: 'Limit Projects',
      defaultValue: 4,
      min: 1,
      admin: {
        description:
          'The number of projects displayed per page (for Full Page) or total displayed (for Standard Grid).',
      },
    },
  ],
}
