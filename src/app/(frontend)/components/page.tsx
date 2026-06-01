import { ArrowShortSvg, ArrowSvg, PhoneSvg } from '@/components/icons'
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
            <Button variant="default" icon={ArrowSvg}>
              Default Button
            </Button>
            <Button variant="primary" icon={ArrowSvg}>
              Primary Button
            </Button>
            <Button variant="outline" icon={ArrowSvg}>
              Secondary Outline
            </Button>
            Circle-light
            <Button variant="circle-light" size="icon-lg" icon={ArrowShortSvg}></Button>
            Circle-gold
            <Button variant="circle-gold" size="icon-lg" icon={ArrowShortSvg}></Button>
            Circle-outline
            <Button variant="circle-outline" size="icon-md">
              01
            </Button>
            Circle white
            <Button variant="circle-white" size="icon-xl" icon={PhoneSvg}>
              <Link href="#"></Link>
            </Button>
            <Button asChild variant="default">
              <Link href="#">As Link Component</Link>
            </Button>
            <Button asChild variant="link" size="menu">
              <Link href="#">Menu link</Link>
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
