import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      keyframes: {
        overlayShow: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        overlayHide: {
          from: { opacity: '1' },
          to: { opacity: '0' },
        },
        contentShow: {
          from: { transform: 'translateX(100%)' },
          to: { transform: 'translateX(0)' },
        },
        contentHide: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(100%)' },
        },
      },
      animation: {
        overlayShow: 'overlayShow 400ms cubic-bezier(0.16, 1, 0.3, 1)',
        overlayHide: 'overlayHide 300ms cubic-bezier(0.16, 1, 0.3, 1)',
        contentShow: 'contentShow 500ms cubic-bezier(0.16, 1, 0.3, 1)',
        contentHide: 'contentHide 450ms cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
export default config
