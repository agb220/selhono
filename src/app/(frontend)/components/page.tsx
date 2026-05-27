import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export default function ComponentsPlayground() {
  if (process.env.NODE_ENV === 'production') {
    notFound()
  }
  return (
    <div className="min-h-screen  p-10  container">
      <div className="max-w-4xl mx-auto space-y-12">
        <div>
          <h1 className="text-3xl font-dm font-bold mb-2">SELHONO Design System</h1>
          <p className="">Плейграунд для перевірки та стилізації UI-компонентів.</p>
        </div>

        <hr className="border-gold-100" />

        <section className="space-y-4">
          <h2 className="text-xl font-bold font-dm ">1. Buttons (Кнопки)</h2>
          <div className="flex flex-wrap gap-4 items-center p-6  rounded-2xl border border-gold-100">
            <Button variant="default">Primary Button</Button>
            <Button variant="outline">Secondary Outline</Button>
            <Button variant="ghost">Ghost Button</Button>

            <Button asChild variant="default">
              <Link href="#">As Link Component</Link>
            </Button>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold font-dm ">2. Typography (Шрифти)</h2>
          <div className="p-6 rounded-2xl border border-gold-100  space-y-4">
            <p className="font-dm text-4xl">DM Serif Display: Let's make your home beautiful</p>
            <p className="font-dm text-base ">
              Jost Regular: It is a long established fact that a reader will be distracted.
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}
