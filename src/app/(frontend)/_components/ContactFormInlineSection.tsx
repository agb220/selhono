import { ContactFormInlineBlockType } from '@/payload-types'
import ContactFormInline from './Shared/Forms/ContactFormInline'

export const ContactFormInlineSection: React.FC<ContactFormInlineBlockType> = ({ title }) => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-accent md:h4 text-center  text-dark-100 mb-8 md:mb-12 max-w-158 mx-auto ">
          {title}
        </h2>
        <ContactFormInline />
      </div>
    </section>
  )
}

export default ContactFormInlineSection
