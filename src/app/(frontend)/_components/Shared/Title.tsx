import { cn } from '@/lib/utils'

interface TitleProps {
  title: string
  as?: 'h1' | 'h2' | 'h3'
  size?: 'hero' | 'section' | 'sub'
  description?: string
  descVariant?: 'light' | 'muted'
  className?: string
  classNameDesc?: string
}

export const Title = ({
  title,
  as: Tag = 'h2',
  size = 'section',
  description,
  descVariant = 'light',
  className = '',
  classNameDesc = '',
}: TitleProps) => {
  const titleSizes = {
    hero: 'h4 md:h1',
    section: 'h4 md:h2',
    sub: '',
  }

  const descVariants = {
    light: 'font-medium',
    muted: 'paragraph',
  }

  return (
    <div className={`flex flex-col ${className}`}>
      <Tag className={titleSizes[size]}>{title}</Tag>

      {description && <p className={cn(descVariants[descVariant], classNameDesc)}>{description}</p>}
    </div>
  )
}
