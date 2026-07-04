'use client'
import { useScopedI18n } from '../_locales/client'
import { Button } from './ui/Button'

interface ReviewFormProps {
  onSuccess: () => void
}

export default function ReviewForm({ onSuccess }: ReviewFormProps) {
  const t = useScopedI18n('modal')
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    onSuccess()
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-dark-200">{t('inputName')}</label>
        <input
          name="author"
          type="text"
          required
          className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-gold-100"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-dark-200">{t('inputLocation')}</label>
        <input
          name="location"
          type="text"
          required
          className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-gold-100"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-dark-200">{t('inputReview')}</label>
        <textarea
          name="text"
          required
          rows={4}
          className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm resize-none focus:outline-none focus:border-gold-100"
        />
      </div>
      <div className="flex justify-end gap-3 mt-2">
        <Button type="submit">{t('btnTitle')}</Button>
      </div>
    </form>
  )
}
