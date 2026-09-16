import { cn } from '@/lib/utils'

interface TitleProps {
  title: string
  as?: 'h1' | 'h2' | 'h3'
  size?: 'hero' | 'section' | 'sub'
  titleVariant?: 'dark' | 'white'
  description?: string
  descVariant?: 'light' | 'muted'
  className?: string
  classNameDesc?: string
}

export const Title = ({
  title,
  as: Tag = 'h2',
  size = 'section',
  titleVariant = 'dark',
  description,
  descVariant = 'light',
  className = '',
  classNameDesc = '',
}: TitleProps) => {
  const titleSizes = {
    hero: 'h4 md:h1',
    section: 'text-accent-lg md:h4',
    sub: '',
  }

  const titleVariants = {
    dark: 'text-dark-200',
    white: 'text-white',
  }

  const descVariants = {
    light: 'font-medium',
    muted: 'paragraph',
  }

  return (
    <div className={cn('flex flex-col', className)}>
      <Tag className={cn(titleSizes[size], titleVariants[titleVariant])}>{title}</Tag>

      {description && <p className={cn(descVariants[descVariant], classNameDesc)}>{description}</p>}
    </div>
  )
}
