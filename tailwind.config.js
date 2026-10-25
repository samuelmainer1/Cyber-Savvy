const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        // next/font self-hosts Inter (layout.tsx) and exposes it as
        // --font-inter; the default system stack remains the fallback.
        sans: ['var(--font-inter)', ...fontFamily.sans],
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
