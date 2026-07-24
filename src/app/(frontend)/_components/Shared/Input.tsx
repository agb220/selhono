import React, { ComponentPropsWithRef, forwardRef } from 'react'

type BaseProps = {
  label?: string
  error?: string
}

type InputProps = BaseProps &
  ComponentPropsWithRef<'input'> & {
    as?: 'input'
  }

type TextareaProps = BaseProps &
  ComponentPropsWithRef<'textarea'> & {
    as: 'textarea'
  }

export type FormInputProps = InputProps | TextareaProps

export const Input = forwardRef<HTMLInputElement | HTMLTextAreaElement, FormInputProps>(
  (props, ref) => {
    const { label, error, className = '', disabled, ...rest } = props

    const baseInputStyles = `px-4 py-2.5 rounded-xl border text-sm transition-colors focus:outline-none ${
      error ? 'border-red-500' : 'border-gray-200 focus:border-gold-100'
    } ${disabled ? 'bg-gray-50 opacity-60 cursor-not-allowed' : ''} ${className}`

    return (
      <div className="flex flex-col gap-1 w-full">
        {label && <label className="text-sm font-medium text-dark-200">{label}</label>}

        {props.as === 'textarea' ? (
          <textarea
            ref={ref as React.Ref<HTMLTextAreaElement>}
            disabled={disabled}
            className={`resize-none ${baseInputStyles}`}
            {...(rest as ComponentPropsWithRef<'textarea'>)}
          />
        ) : (
          <input
            ref={ref as React.Ref<HTMLInputElement>}
            disabled={disabled}
            className={baseInputStyles}
            {...(rest as ComponentPropsWithRef<'input'>)}
          />
        )}

        {error && <span className="text-xs text-red-500 mt-0.5 pl-1">{error}</span>}
      </div>
    )
  },
)

Input.displayName = 'Input'
export default Input
