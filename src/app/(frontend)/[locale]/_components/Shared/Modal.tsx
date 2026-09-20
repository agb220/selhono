'use client'
import * as Dialog from '@radix-ui/react-dialog'

interface ModalLayoutProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description?: string
  children: React.ReactNode
}

export default function ModalLayout({
  isOpen,
  onOpenChange,
  title,
  description,
  children,
}: ModalLayoutProps) {
  return (
    <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 animate-fade-in" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-[30px] max-w-md w-full shadow-2xl z-50 focus:outline-none animate-scale-in">
          <Dialog.Title className="text-medium-bold text-center mb-1">{title}</Dialog.Title>

          {description && (
            <Dialog.Description className="text-gold-300 mb-6 text-center">
              {description}
            </Dialog.Description>
          )}

          {children}
          <Dialog.Close asChild>
            <button
              className="absolute top-5 right-5 text-gray-400 hover:text-dark-200 text-lg focus:outline-none cursor-pointer"
              aria-label="Close"
            >
              ✕
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
