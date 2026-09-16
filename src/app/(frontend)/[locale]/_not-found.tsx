export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-4">
      <h1 className="text-4xl font-bold mb-2">404</h1>
      <p className="text-dark-200/60 mb-4">Page not found</p>
      <a
        href="/"
        className="px-6 py-3 bg-gold-300 text-white rounded-xl hover:bg-dark-200 transition-colors"
      >
        Go to Home
      </a>
    </div>
  )
}
