'use client'

const STATUS_COLORS: Record<string, { bg: string; color: string; label: string }> = {
  new: { bg: '#e0f2fe', color: '#0369a1', label: 'NEW' },
  in_progress: { bg: '#fef3c7', color: '#b45309', label: 'IN PROGRESS' },
  completed: { bg: '#dcfce7', color: '#15803d', label: 'COMPLETED' },
  closed: { bg: '#f3f4f6', color: '#4b5563', label: 'CLOSED' },
}

export const StatusBadge = (props: any) => {
  const statusValue = props.cellData || props.rowData?.status || props.value

  const config = STATUS_COLORS[statusValue] || {
    bg: '#f3f4f6',
    color: '#374151',
    label: statusValue ? String(statusValue).toUpperCase() : 'N/A',
  }

  return (
    <span
      style={{
        backgroundColor: config.bg,
        color: config.color,
        padding: '4px 10px',
        borderRadius: '12px',
        fontSize: '12px',
        fontWeight: 600,
        display: 'inline-block',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
      }}
    >
      {config.label}
    </span>
  )
}

export default StatusBadge
