import Link from 'next/link'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16' as any,
})

interface SuccessPageProps {
  searchParams: Promise<{ session_id?: string }>
}

export default async function PaymentSuccessPage({ searchParams }: SuccessPageProps) {
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
      <div className="max-w-md w-full text-center bg-white p-8 md:p-10 rounded-[30px] border border-slate-100 shadow-sm">
        <div className="w-16 h-16 bg-[#CDA274]/10 text-[#CDA274] rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="text-3xl font-serif text-slate-900 mb-3">Payment Successful!</h1>

        <p className="text-slate-600 text-base mb-6">
          Thank you for your order. We have sent a confirmation email to{' '}
          {customerEmail ? (
            <span className="font-semibold text-slate-900">{customerEmail}</span>
          ) : (
            'your email'
          )}
          .
        </p>

        <Link
          href="/"
          className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-[#CDA274] text-white font-medium hover:bg-[#b88f63] transition-colors duration-200"
        >
          Back to Home
        </Link>
      </div>
    </div>
  )
}
