import React from 'react'
import Image from 'next/image'
import { Media, ProcessStepsBlockType } from '@/payload-types'
import { getImageUrl } from '@/lib/getImageUrl'
import { cn } from '@/lib/utils'

interface ProcessStepCardProps {
  index: number
  step: {
    title: string
    description: string
    image: string | Media
    id?: string | null
  }
}

export const ProcessStepCard: React.FC<ProcessStepCardProps> = (props: ProcessStepCardProps) => {
  const isReversed = props.index % 2 !== 0

  return (
    <div
      className={`flex flex-col md:flex-row gap-10 lg:gap-20 ${
        isReversed ? 'md:flex-row-reverse' : ''
      }`}
    >
      <div className="w-full md:w-1/2 relative aspect-4/3">
        <Image
          src={getImageUrl(props.step.image)}
          alt={props.step.title}
          fill
          className={`object-cover ${isReversed ? 'rounded-tl-[150px] xl:rounded-br-[400px] xl:rounded-tl-[300px] rounded-br-[200px]' : 'xl:rounded-bl-[400px] xl:rounded-tr-[300px] rounded-bl-[200px] rounded-tr-[150px]'}`}
        />
      </div>
      <div className="w-full md:w-1/2 flex flex-col items-start justify-between min-h-full">
        <div
          className={cn(
            'flex-inline justify-between items-center w-full mb-4',
            isReversed ? 'text-start' : ' text-end',
          )}
        >
          <span className="text-number text-gold-200">0{props.index + 1}</span>
        </div>
        <div>
          <h3 className="h5 md:text-accent mb-2 text-dark-200">{props.step.title}</h3>
          <p className="max-w-md">{props.step.description}</p>
        </div>
      </div>
    </div>
  )
}

export default ProcessStepCard
