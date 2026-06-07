import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { Slot } from 'radix-ui'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'group/button inline-flex shrink-0 items-center justify-center border border-transparent whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 transition-colors duration-500',
  {
    variants: {
      variant: {
        // buttons
        default: 'bg-gold-300 text-white button-semmibold hover:bg-dark-200 button-semibold',
        primary: 'bg-dark-200 text-white button-semmibold hover:bg-gold-300',

        // icon in circle
        'circle-white': 'bg-white text-gold-300 hover:bg-gold-300 hover:text-white',
        'circle-light': 'bg-light-200 text-dark-200 hover:bg-gold-300 hover:text-white',
        'circle-gold': 'hover:bg-gold-200 text-white bg-gold-300 hover:text-white',
        'circle-outline':
          'border border-gold-300 bg-transparent hover:border-transparent text-dark-200 hover:bg-light-200 aria-current:text-light-200 aria-current:border-transparent',

        // link
        link: 'text-dark-200 link hover:text-gold-300 p-0 bg-transparent aria-current:text-gold-300',
        outline: 'text-dark-200 button-semibold hover:text-gold-300',
      },
      size: {
        default: 'h-[75px] px-[48px] py-[26px] rounded-[18px] gap-[10px]',
        sm: 'h-12 px-6 rounded-xl gap-2 text-sm',

        // for icons
        'icon-xl': 'size-[93px] p-0',
        'icon-lg': 'size-[70px] p-0',
        'icon-md': 'size-[52px] p-0',
        'icon-sm': 'size-12 p-0',
        menu: 'p-0',
        icon: 'size-8 rounded-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export interface ButtonProps
  extends React.ComponentProps<'button'>, VariantProps<typeof buttonVariants> {
  asChild?: boolean
  isCircle?: boolean
  icon?: React.ComponentType<{ className?: string }>
  iconPlacement?: 'start' | 'end'
  isActive?: boolean
}

function Button({
  className,
  variant = 'default',
  size = 'default',
  asChild = false,
  isCircle = false,
  icon: IconProp,
  iconPlacement = 'end',
  children,
  isActive = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot.Root : 'button'

  const isCircleVariant = variant?.toString().startsWith('circle-')
  const shouldBeCircle = isCircle || isCircleVariant

  const renderIcon = () => {
    if (!IconProp) return null
    return (
      <IconProp
        className={cn(
          'transition-transform duration-300 ease-out',
          iconPlacement === 'end' && !isCircleVariant && 'group-hover/button:translate-x-1',
          iconPlacement === 'start' && !isCircleVariant && 'group-hover/button:-translate-x-1',
        )}
      />
    )
  }

  console.log('btn isActive', isActive)

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      aria-current={isActive ? 'page' : props['aria-current']}
      className={cn(
        buttonVariants({ variant, size, className }),

        shouldBeCircle && 'rounded-full',
        isActive && 'text-gold-300! font-bold',
      )}
      {...props}
    >
      {asChild ? (
        children
      ) : (
        <>
          {IconProp && iconPlacement === 'start' && renderIcon()}
          {children && <span>{children}</span>}
          {IconProp && iconPlacement === 'end' && renderIcon()}
        </>
      )}
    </Comp>
  )
}

export { Button, buttonVariants }
