import { CollectionConfig } from 'payload'

export const Reviews: CollectionConfig = {
  slug: 'reviews',
  admin: {
    useAsTitle: 'author',
    defaultColumns: ['author', 'location', 'isApproved', 'createdAt'],
    group: 'Blocks Content (Reusable Components)',
  },
  access: {
    read: () => true,
    create: () => true,
  },
  fields: [
    { name: 'author', type: 'text', required: true, label: 'Name' },
    { name: 'location', type: 'text', required: true, label: 'Location' },
    { name: 'avatar', type: 'upload', relationTo: 'media', label: 'Photo' },
    { name: 'text', type: 'textarea', required: true, label: 'Text' },
    {
      name: 'isApproved',
      type: 'checkbox',
      defaultValue: false,
      label: 'Approved for the website',
      admin: {
        position: 'sidebar',
        components: {
          Cell: {
            path: '@/app/(frontend)/_components/Admin/ApprovedBadge',
          },
        },
      },
    },
  ],
}
