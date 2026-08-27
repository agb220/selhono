'use client'

import React from 'react'

interface StatusBadgeCellProps {
  cellData: string
  rowData: {
    periodEnd?: string
    status?: string
  }
}

export default function StatusBadgeCell({ cellData, rowData }: StatusBadgeCellProps) {
  const now = new Date()
  const periodEnd = rowData?.periodEnd ? new Date(rowData.periodEnd) : null
  const isExpired = periodEnd ? periodEnd < now : false

  const isActive = cellData === 'active' && !isExpired

  const styles = isActive
    ? {
        backgroundColor: '#e6f4ea',
        color: '#137333',
        border: '1px solid #ceead6',
      }
    : {
        backgroundColor: '#fce8e6',
        color: '#c5221f',
        border: '1px solid #fad2cf',
      }

  return (
    <span
      style={{
        ...styles,
        padding: '4px 10px',
        borderRadius: '12px',
        fontSize: '12px',
        fontWeight: 600,
        display: 'inline-flex',
        alignItems: 'center',
        lineHeight: 1,
      }}
    >
      {isActive ? '● Active' : '● Expired / Canceled'}
    </span>
  )
}
