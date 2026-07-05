'use client'
import { useState } from 'react'
import { useScopedI18n } from '../_locales/client'
import { Button } from './ui/Button'
import { toast as sonnerToast } from 'sonner'

interface ReviewFormProps {
  onSuccess: () => void
}

export default function ReviewForm({ onSuccess }: ReviewFormProps) {
  const t = useScopedI18n('modal')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [fileName, setFileName] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (isSubmitting) return

    setIsSubmitting(true)
    const currentForm = e.currentTarget
    const formData = new FormData(currentForm)
    const file = formData.get('avatarFile') as File

    let avatarId: string | null = null

    try {
      if (file && file.size > 0) {
        const mediaData = new FormData()
        mediaData.append('file', file)

        const mediaResponse = await fetch('/api/media', {
          method: 'POST',

          body: mediaData,
        })

        if (!mediaResponse.ok) {
          throw new Error('Failed to upload image')
        }

        const mediaResult = await mediaResponse.json()
        avatarId = mediaResult.doc.id
      }

      const reviewData = {
        author: formData.get('author'),
        location: formData.get('location'),
        text: formData.get('text'),
        ...(avatarId && { avatar: avatarId }),
      }

      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reviewData),
      })

      if (!response.ok) {
        throw new Error('Failed to submit review')
      }

      onSuccess()
      sonnerToast.success(t('successTitle'), {
        description: t('successDesc'),
        icon: '✨',
      })
    } catch (error) {
      console.error('Error submitting review:', error)
      sonnerToast.error(t('errorTitle'), {
        description: t('errorDesc'),
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-dark-200">{t('inputName')}</label>
        <input
          name="author"
          type="text"
          required
          disabled={isSubmitting}
          className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-gold-100 disabled:opacity-50"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-dark-200">{t('inputLocation')}</label>
        <input
          name="location"
          type="text"
          required
          disabled={isSubmitting}
          className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-gold-100 disabled:opacity-50"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-dark-200">{t('avatarInput')}</label>

        <div className="relative flex items-center gap-3">
          <input
            name="avatarFile"
            type="file"
            accept="image/*"
            disabled={isSubmitting}
            onChange={(e) => {
              const file = e.target.files?.[0]
              setFileName(file ? file.name : null)
            }}
            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10 disabled:pointer-events-none"
          />

          <div className="px-4 py-2 bg-gold-100/10 text-gold-100 font-semibold text-sm rounded-xl border-0 transition-colors pointer-events-none">
            {t('fileBtn')}
          </div>

          <span className="text-sm text-gray-400 truncate max-w-50">
            {fileName || t('fileNoFile')}
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-dark-200">{t('inputReview')}</label>
        <textarea
          name="text"
          required
          rows={4}
          maxLength={180}
          placeholder={t('placeholderReview')}
          disabled={isSubmitting}
          className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm resize-none focus:outline-none focus:border-gold-100 disabled:opacity-50"
        />
      </div>

      <div className="flex justify-center gap-3 mt-2">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? '...' : t('btnTitle')}
        </Button>
      </div>
    </form>
  )
}
