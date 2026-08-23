'use client'
import useEmblaCarousel from 'embla-carousel-react'
import { Button } from './ui/ButtonUI'
import { ArrowSvg } from './icons'
import { PricingGlobal } from '@/payload-types'
import { useTransition } from 'react'
import { createCheckoutSession } from '../_actions/checkout'
import { cn } from '@/lib/utils'

export default function PricingSection({ plans }: PricingGlobal) {
  const [isPending, startTransition] = useTransition()

  const [emblaRef] = useEmblaCarousel({
    align: 'start',
    containScroll: 'trimSnaps',
  })

  if (!plans || plans.length === 0) return null

  const handleSubscribe = (stripePriceId?: string | null, planTitle?: string) => {
    if (!stripePriceId || !planTitle) return

    startTransition(async () => {
      await createCheckoutSession(stripePriceId, planTitle)
    })
  }

  return (
    <section className="pb-16 md:pb-24 pt-10 xl:pt-0 container">
      <div className="overflow-hidden pt-6 -mt-6" ref={emblaRef}>
        <ul className="flex gap-4 md:gap-8 xl:gap-12">
          {plans.map((plan, idx) => {
            const featureList = plan.features
              ? plan.features.split('\n').filter((item) => item.trim() !== '')
              : []

            return (
              <li
                key={idx}
                className="group relative flex flex-col items-center text-center p-5 md:p-8 rounded-[30px] border border-light-100 transition-all duration-500 hover:shadow-lg hover:border-gold-300 max-w-92"
              >
                {plan.isPopular && (
                  <div className="mb-4 px-3 py-2 rounded-full bg-gold-300 text-white button-semmibold absolute -top-5 z-1">
                    {plan.badge || 'Most Popular Plans'}
                  </div>
                )}
                <h3 className={'h5 text-dark-200'}>{plan.title}</h3>
                <div className="mb-4">
                  <div className="flex items-center justify-center">
                    <span className="xl:h5">{plan.currency || '$'}</span>
                    <span className="text-number transition-colors duration-500 group-hover:text-gold-300">
                      {plan.price}
                    </span>
                  </div>
                  {plan.period && <span className="xl:h5">/ {plan.period}</span>}
                </div>
                {featureList.length > 0 && (
                  <ul className="space-y-2 mb-6 w-full">
                    {featureList.map((feature, featureIdx) => (
                      <li key={featureIdx} className="md:link-regular">
                        {feature.trim()}
                      </li>
                    ))}
                  </ul>
                )}

                <div className="mt-auto w-full flex justify-center">
                  <Button
                    variant="primary"
                    icon={ArrowSvg}
                    disabled={isPending}
                    onClick={() => handleSubscribe(plan.stripePriceId, plan.title)}
                  >
                    {plan.buttonText || 'Get Started'}
                  </Button>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
