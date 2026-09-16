'use client'
import { useState, useEffect } from 'react'
import { toast as sonnerToast } from 'sonner'
import { Button } from '../../ui/ButtonUI'

import Input from '../Input'
import { useScopedI18n } from '@/app/(frontend)/_locales/client'
import { createContactRequestAction } from '@/app/(frontend)/_actions/contact'

interface ContactFormProps {
  onSuccess: () => void
}

interface ContactFormErrors {
  name?: string
  email?: string
  text?: string
}

export default function ContactForm({ onSuccess }: ContactFormProps) {
  const t = useScopedI18n('modalContact')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [text, setText] = useState('')
  const [errors, setErrors] = useState<ContactFormErrors>({})
  const [isFormValid, setIsFormValid] = useState(false)

  useEffect(() => {
    setIsFormValid(Boolean(name.trim() && email.trim() && text.trim()))
  }, [name, email, text])

  const validateForm = (): boolean => {
    const newErrors: ContactFormErrors = {}
    if (!name.trim()) newErrors.name = 'Please enter your name'
    if (!email.trim()) newErrors.email = 'Please enter your email'
    if (!text.trim()) {
      newErrors.text = 'Message text cannot be empty'
    } else if (text.length < 10) {
      newErrors.text = 'Message must be at least 10 characters long'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (isSubmitting || !isFormValid || !validateForm()) return

    setIsSubmitting(true)

    try {
      const result = await createContactRequestAction({
        name,
        email,
        text,
      })

      if (!result.success) {
        throw new Error(result.error || 'Failed to send request')
      }

      setName('')
      setEmail('')
      setText('')
      setErrors({})
      onSuccess()

      sonnerToast.success(t('successTitle'), {
        description: t('successDesc'),
        icon: '✨',
      })
    } catch (error: any) {
      console.error('Error submitting contact form:', error)
      sonnerToast.error(t('errorTitle'), {
        description: error.message || t('errorDesc'),
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
      <Input
        label={t('inputName')}
        name="name"
        type="text"
        value={name}
        error={errors.name}
        disabled={isSubmitting}
        onChange={(e) => {
          setName(e.target.value)
          if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }))
        }}
      />
      <Input
        label={t('inputEmail')}
        name="email"
        type="email"
        value={email}
        error={errors.email}
        disabled={isSubmitting}
        onChange={(e) => {
          setEmail(e.target.value)
          if (errors.email) setErrors((prev) => ({ ...prev, phoneNumber: undefined }))
        }}
      />
      <Input
        as="textarea"
        label={t('inputMessage')}
        name="text"
        rows={4}
        value={text}
        error={errors.text}
        disabled={isSubmitting}
        onChange={(e) => {
          setText(e.target.value)
          if (errors.text) setErrors((prev) => ({ ...prev, text: undefined }))
        }}
      />
      <div className="flex justify-center gap-3 mt-2">
        <Button type="submit" disabled={isSubmitting || !isFormValid}>
          {isSubmitting ? 'Sending...' : t('btnTitle')}
        </Button>
      </div>
    </form>
  )
}
