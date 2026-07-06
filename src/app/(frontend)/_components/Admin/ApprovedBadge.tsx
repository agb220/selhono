'use client'
import React from 'react'

export default function ApprovedBadge(props: any) {
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
}
