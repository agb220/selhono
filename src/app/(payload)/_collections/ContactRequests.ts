import { CollectionConfig } from 'payload'

export const ContactRequests: CollectionConfig = {
  slug: 'contact-requests',
  labels: {
    singular: 'Contact Request',
    plural: 'Contact Requests',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'phone', 'status', 'createdAt'],
    group: 'Contact Requests',
  },
  access: {
    create: () => true,
    read: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Full Name',
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'phone',
      type: 'text',
      required: true,
      label: 'Phone Number',
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'message',
      type: 'textarea',
      label: 'Short Description',
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      required: true,
      label: 'Request Status',
      options: [
        { label: 'New', value: 'new' },
        { label: 'In Progress', value: 'in_progress' },
        { label: 'Completed', value: 'completed' },
        { label: 'Closed', value: 'closed' },
      ],
      admin: {
        position: 'sidebar',
        components: {
          Cell: '@/app/(frontend)/_components/Admin/StatusBadge',
        },
      },
    },
    {
      name: 'adminNotes',
      type: 'array',
      label: 'Admin Comments & History',
      admin: {
        description:
          'Please add comments regarding the process of communicating with the client (for example: “Quotation sent,” “Awaiting feedback”)',
      },
      fields: [
        {
          name: 'date',
          type: 'date',
          label: 'Date',
          defaultValue: () => new Date(),
          admin: {
            date: {
              pickerAppearance: 'dayAndTime',
            },
          },
        },
        {
          name: 'comment',
          type: 'textarea',
          required: true,
          label: 'Comment',
        },
      ],
    },
  ],
}
