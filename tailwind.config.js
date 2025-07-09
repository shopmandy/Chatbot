/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'pink-bg': '#ffe0f2',
        'pink-primary': '#ff0080',
        'pink-accent': '#ff003c',
        'pink-hero': '#ff0099',
      },
    },
  },
  plugins: [],
}
