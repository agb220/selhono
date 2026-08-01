import { ProcessStepsBlockType } from '@/payload-types'
import ProcessStepCard from './Shared/ProcessStepCard'
import { Title } from './Shared/Title'

export const ProcessStepsSection = (props: ProcessStepsBlockType) => {
  if (!props.steps || props.steps.length === 0) return null

  return (
    <section className="py-16 md:py-28 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-24">
          <Title
            title={props.title}
            description={props.description ? props.description : ''}
            size="section"
          />
        </div>
        <div className="flex flex-col gap-16 md:gap-28 max-w-6xl mx-auto">
          {props.steps.map((step, index) => (
            <ProcessStepCard step={step} index={index} key={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProcessStepsSection
