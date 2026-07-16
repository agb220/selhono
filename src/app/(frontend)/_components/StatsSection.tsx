import { getPayload } from 'payload'
import config from '@/payload.config'
import { CompanyStat } from '@/payload-types'
import dynamic from 'next/dynamic'

// Динамічно вантажимо клієнтську картку з анімацією
const LazyStatsCard = dynamic(() => import('./Shared/StatsCard').then((mod) => mod.StatsCard), {
  ssr: true, // Дозволяє згенерувати початковий HTML на сервері для SEO
})

const StatsSection = async () => {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const globalStats = (await payload.findGlobal({
    slug: 'company-stats',
    depth: 0,
  })) as CompanyStat

  if (!globalStats.stats || globalStats.stats.length === 0) return null

  return (
    <section className="bg-[#F9F6F0] py-16 md:py-24 my-16">
      <div className="container mx-auto max-w-6xl px-4">
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-12 lg:gap-y-0 relative">
          {globalStats.stats.map((item, index) => (
            <div key={item.id || index} className="relative flex justify-center">
              <LazyStatsCard value={item.value} label={item.label} />

              {index < (globalStats.stats?.length ?? 0) - 1 && (
                <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 h-24 w-px bg-gold-300/40" />
              )}
            </div>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default StatsSection
