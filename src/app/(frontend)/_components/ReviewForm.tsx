'use client'
import { useState, useEffect } from 'react'
import { useScopedI18n } from '../_locales/client'
import { Button } from './ui/Button'
import { toast as sonnerToast } from 'sonner'
import { createReviewOnlyAction } from '../_actions/reviews'

interface ReviewFormProps {
  onSuccess: () => void
}

interface FormErrors {
  author?: string
  location?: string
  text?: string
}

export default function ReviewForm({ onSuccess }: ReviewFormProps) {
  const t = useScopedI18n('modal')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [uploadingImage, setUploadingImage] = useState(false)
  const [fileName, setFileName] = useState<string | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const [author, setAuthor] = useState('')
  const [location, setLocation] = useState('')
  const [text, setText] = useState('')
  const [errors, setErrors] = useState<FormErrors>({})
  const [isFormValid, setIsFormValid] = useState(false)

  useEffect(() => {
    if (author.trim() && location.trim() && text.trim()) {
      setIsFormValid(true)
    } else {
      setIsFormValid(false)
    }
  }, [author, location, text])

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}
    if (!author.trim()) newErrors.author = 'Please enter your name'
    if (!location.trim()) newErrors.location = 'Please enter your location'
    if (!text.trim()) {
      newErrors.text = 'Review text cannot be empty'
    } else if (text.length < 10) {
      newErrors.text = 'Review must be at least 10 characters long'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (isSubmitting || uploadingImage || !isFormValid) return
    if (!validateForm()) return

    setIsSubmitting(true)
    let uploadedAvatarId: string | null = null

    try {
      if (selectedFile) {
        setUploadingImage(true)
        const mediaData = new FormData()
        mediaData.append('file', selectedFile)
        mediaData.append('alt', `Avatar for ${author}`)

        const mediaResponse = await fetch(`${window.location.origin}/api/media`, {
          method: 'POST',
          headers: {
            'x-skip-sizes': 'true',
          },
          body: mediaData,
        })

        if (!mediaResponse.ok) {
          throw new Error('Failed to upload image')
        }

        const mediaResult = await mediaResponse.json()
        uploadedAvatarId = mediaResult.doc?.id || mediaResult.id
        setUploadingImage(false)
      }

      const result = await createReviewOnlyAction({
        author,
        location,
        text,
        avatarId: uploadedAvatarId,
      })

      if (!result.success) {
        throw new Error(result.error || 'Failed to save review')
      }

      setAuthor('')
      setLocation('')
      setText('')
      setFileName(null)
      setSelectedFile(null)
      setErrors({})
      onSuccess()

      sonnerToast.success(t('successTitle'), {
        description: t('successDesc'),
        icon: '✨',
      })
    } catch (error: any) {
      console.error('Error:', error)
      sonnerToast.error(t('errorTitle'), {
        description: error.message || t('errorDesc'),
      })
    } finally {
      setIsSubmitting(false)
      setUploadingImage(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-dark-200">{t('inputName')}</label>
        <input
          name="author"
          type="text"
          value={author}
          onChange={(e) => {
            setAuthor(e.target.value)
            if (errors.author) setErrors((prev) => ({ ...prev, author: undefined }))
          }}
          disabled={isSubmitting || uploadingImage}
          className={`px-4 py-2.5 rounded-xl border text-sm focus:outline-none transition-colors ${
            errors.author ? 'border-red-500' : 'border-gray-200 focus:border-gold-100'
          }`}
        />
        {errors.author && <span className="text-xs text-red-500 mt-0.5 pl-1">{errors.author}</span>}
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-dark-200">{t('inputLocation')}</label>
        <input
          name="location"
          type="text"
          value={location}
          onChange={(e) => {
            setLocation(e.target.value)
            if (errors.location) setErrors((prev) => ({ ...prev, location: undefined }))
          }}
          disabled={isSubmitting || uploadingImage}
          className={`px-4 py-2.5 rounded-xl border text-sm focus:outline-none transition-colors ${
            errors.location ? 'border-red-500' : 'border-gray-200 focus:border-gold-100'
          }`}
        />
        {errors.location && (
          <span className="text-xs text-red-500 mt-0.5 pl-1">{errors.location}</span>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-dark-200">{t('avatarInput')}</label>
        <div className="relative flex items-center gap-3">
          <input
            type="file"
            accept="image/*"
            disabled={isSubmitting || uploadingImage}
            onChange={(e) => {
              const file = e.target.files?.[0] || null
              setSelectedFile(file)
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
          rows={4}
          maxLength={180}
          placeholder={t('placeholderReview')}
          value={text}
          onChange={(e) => {
            setText(e.target.value)
            if (errors.text) setErrors((prev) => ({ ...prev, text: undefined }))
          }}
          disabled={isSubmitting || uploadingImage}
          className={`px-4 py-2.5 rounded-xl border text-sm resize-none focus:outline-none transition-colors ${
            errors.text ? 'border-red-500' : 'border-gray-200 focus:border-gold-100'
          }`}
        />
        {errors.text && <span className="text-xs text-red-500 mt-0.5 pl-1">{errors.text}</span>}
      </div>

      <div className="flex justify-center gap-3 mt-2">
        <Button type="submit" disabled={isSubmitting || uploadingImage || !isFormValid}>
          {uploadingImage
            ? 'Uploading photo...'
            : isSubmitting
              ? 'Saving review...'
              : t('btnTitle')}
        </Button>
      </div>
    </form>
  )
}
