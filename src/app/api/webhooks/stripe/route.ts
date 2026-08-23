import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { getPayload } from 'payload'
import configPromise from '@/payload.config'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16' as any,
})

export async function POST(req: Request) {
  const body = await req.text()
  const signature = req.headers.get('stripe-signature') || ''

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET || '')
  } catch (err: any) {
    console.error(`Webhook signature verification failed: ${err.message}`)
    return new Response(`Webhook Error: ${err.message}`, { status: 400 })
  }

  const payload = await getPayload({ config: configPromise })

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session

    let periodStart = new Date()
    let periodEnd = new Date()
    periodEnd.setMonth(periodEnd.getMonth() + 1)

    if (session.subscription) {
      const sub = await stripe.subscriptions.retrieve(session.subscription as string)
      const subData = sub as any

      if (subData.current_period_start && subData.current_period_end) {
        periodStart = new Date(subData.current_period_start * 1000)
        periodEnd = new Date(subData.current_period_end * 1000)
      }
    }

    await payload.create({
      collection: 'payments',
      data: {
        planTitle: session.metadata?.planTitle || 'Subscription Plan',
        status: 'active',
        amount: (session.amount_total || 0) / 100,
        currency: session.currency || 'usd',
        paidAt: new Date().toISOString(),
        periodStart: periodStart.toISOString(),
        periodEnd: periodEnd.toISOString(),
        stripeCustomerId: session.customer as string,
        stripeSubscriptionId: (session.subscription as string) || session.id,
        customerEmail: session.customer_details?.email || undefined,
      },
    })
  }

  return NextResponse.json({ received: true })
}
