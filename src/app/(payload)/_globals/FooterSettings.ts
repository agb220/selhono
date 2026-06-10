import { GlobalConfig } from 'payload'

export const FooterSettings: GlobalConfig = {
  slug: 'footer-settings',
  access: {
    read: () => true,
  },
  admin: {
    group: 'Налаштування',
  },
  fields: [
    {
      name: 'companyBlock',
      type: 'group',
      label: 'Company Info',
      fields: [
        {
          name: 'description',
          type: 'textarea',
          label: 'Description under logo',
          localized: true,
          required: true,
        },
      ],
    },
    {
      name: 'columnTitles',
      type: 'group',
      label: 'Column Titles',
      fields: [
        {
          name: 'pagesTitle',
          type: 'text',
          label: 'Title for Pages Column',
          defaultValue: 'Pages',
          localized: true,
          required: true,
        },
        {
          name: 'servicesTitle',
          type: 'text',
          label: 'Title for Services Column',
          defaultValue: 'Services',
          localized: true,
          required: true,
        },
        {
          name: 'contactTitle',
          type: 'text',
          label: 'Title for Contact Column',
          defaultValue: 'Contact',
          localized: true,
          required: true,
        },
      ],
    },
    {
      name: 'contactBlock',
      type: 'group',
      label: 'Contact Info',
      fields: [
        {
          name: 'address',
          type: 'textarea',
          label: 'Address',
          localized: true,
        },
        {
          name: 'email',
          type: 'text',
          label: 'Contact Email',
        },
        {
          name: 'phone',
          type: 'text',
          label: 'Contact Phone',
        },
      ],
    },
  ],
}
