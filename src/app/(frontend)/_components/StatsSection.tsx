import { CompanyStat } from '@/payload-types'
import dynamic from 'next/dynamic'

const LazyStatsCard = dynamic(() => import('./Shared/StatsCard').then((mod) => mod.StatsCard), {
  ssr: true,
})

const StatsSection = (data: CompanyStat) => {
  if (!data.stats || data.stats.length === 0) return null

  return (
    <section className="mb-20 md:mb-40 xl:mb-63">
      <div className="container mx-auto">
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-12 lg:gap-y-0 relative">
          {data.stats.map((item, index) => (
            <div key={item.id || index} className="relative flex justify-center">
              <LazyStatsCard value={item.value} label={item.label} />

              {index < (data.stats?.length ?? 0) - 1 && (
                <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 h-24 w-px bg-gold-300" />
              )}
            </div>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default StatsSection
