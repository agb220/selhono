export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // Додаємо suppressHydrationWarning, щоб розширення браузера не викликали подібних збоїв
    <html suppressHydrationWarning>
      <body>{children}</body>
    </html>
  )
}
