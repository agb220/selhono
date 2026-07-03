import { CollectionConfig } from 'payload'
import React from 'react'

export const Reviews: CollectionConfig = {
  slug: 'reviews',
  admin: {
    useAsTitle: 'author',
    defaultColumns: ['author', 'location', 'isApproved', 'createdAt'],
    group: 'Blocks Content',
  },
  access: {
    read: () => true,
    create: () => true,
  },
  fields: [
    {
      name: 'author',
      type: 'text',
      required: true,
      label: 'Name',
    },
    {
      name: 'location',
      type: 'text',
      required: true,
      label: 'Location',
    },
    {
      name: 'avatar',
      type: 'upload',
      relationTo: 'media',
      label: 'Photo',
    },
    {
      name: 'text',
      type: 'textarea',
      required: true,
      label: 'Text',
    },
    {
      name: 'isApproved',
      type: 'checkbox',
      defaultValue: false,
      label: 'Approved for the website',
      admin: {
        position: 'sidebar',
        components: {
          Cell: ((props: any) => {
            const cellData = props.cellData
            return React.createElement(
              'span',
              {
                style: {
                  backgroundColor: cellData ? '#d4edda' : '#f8d7da',
                  color: cellData ? '#155724' : '#721c24',
                  padding: '4px 10px',
                  borderRadius: '12px',
                  fontSize: '12px',
                  fontWeight: '500',
                  border: `1px solid ${cellData ? '#c3e6cb' : '#f5c6cb'}`,
                  display: 'inline-block',
                },
              },
              cellData ? '● Approved' : '○ Pending',
            )
          }) as any,
        },
      },
    },
  ],
}
