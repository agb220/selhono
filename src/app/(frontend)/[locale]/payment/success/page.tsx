import { Button } from '@/app/(frontend)/_components/ui/ButtonUI'
import { getScopedI18n } from '@/app/(frontend)/_locales/server'
import Link from 'next/link'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16' as any,
})

interface SuccessPageProps {
  searchParams: Promise<{ session_id?: string }>
}

export default async function PaymentSuccessPage({ searchParams }: SuccessPageProps) {
  const t = await getScopedI18n('payments')
  const { session_id } = await searchParams
  let customerEmail = ''

  if (session_id) {
    try {
      const session = await stripe.checkout.sessions.retrieve(session_id)
      customerEmail = session.customer_details?.email || ''
    } catch (e) {
      console.error('Failed to retrieve checkout session', e)
    }
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full text-center p-8 md:p-10 rounded-[30px] border border-light-100 shadow-sm">
        <h1 className="text-dark-200 text-accent xl:h4 mb-3">{t('title')}</h1>
        <p className="mb-6 xl:paragraph">
          {t('desc')}{' '}
          {customerEmail ? (
            <span className="font-semibold text-gold-300">{customerEmail}</span>
          ) : (
            'your email'
          )}
          .
        </p>
        <Button asChild>
          <Link href="/">{t('titleBtn')}</Link>
        </Button>
      </div>
    </div>
  )
}
