import { CollectionConfig } from 'payload'

export const Payments: CollectionConfig = {
  slug: 'payments',
  labels: {
    singular: 'Payment',
    plural: 'Payments',
  },
  admin: {
    useAsTitle: 'stripeSubscriptionId',
    group: 'Billing & Payments',
    defaultColumns: ['planTitle', 'status', 'amount', 'paidAt', 'periodEnd'],
  },
  access: {
    create: () => false,
    update: () => false,
    delete: () => true,
  },
  fields: [
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      label: 'Customer / User',
    },
    {
      name: 'planTitle',
      type: 'text',
      required: true,
      label: 'Paid Plan Title',
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      options: [
        { label: 'Active / Paid', value: 'active' },
        { label: 'Canceled', value: 'canceled' },
        { label: 'Past Due', value: 'past_due' },
        { label: 'Incomplete', value: 'incomplete' },
      ],
      defaultValue: 'active',
    },
    {
      type: 'row',
      fields: [
        {
          name: 'amount',
          type: 'number',
          required: true,
          label: 'Amount Paid',
          admin: { width: '50%' },
        },
        {
          name: 'currency',
          type: 'text',
          required: true,
          defaultValue: 'usd',
          admin: { width: '50%' },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'paidAt',
          type: 'date',
          required: true,
          label: 'Payment Date',
          admin: {
            date: { pickerAppearance: 'dayAndTime' },
            width: '33%',
          },
        },
        {
          name: 'periodStart',
          type: 'date',
          required: true,
          label: 'Period Start',
          admin: {
            date: { pickerAppearance: 'dayAndTime' },
            width: '33%',
          },
        },
        {
          name: 'periodEnd',
          type: 'date',
          required: true,
          label: 'Period End',
          admin: {
            date: { pickerAppearance: 'dayAndTime' },
            width: '33%',
          },
        },
      ],
    },
    {
      name: 'stripeCustomerId',
      type: 'text',
      label: 'Stripe Customer ID',
      admin: { readOnly: true },
    },
    {
      name: 'stripeSubscriptionId',
      type: 'text',
      label: 'Stripe Subscription / Checkout ID',
      admin: { readOnly: true },
    },
    {
      name: 'customerEmail',
      type: 'text',
      label: 'Customer Email',
    },
  ],
}
