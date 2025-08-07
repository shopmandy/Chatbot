import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Brand colors from theme.ts
        'mandy-primary': '#f91b8f',
        'mandy-secondary': '#ff69b4',
        'mandy-background': '#ffe0f2',
        'mandy-white': '#fff',
        'mandy-dark': '#4a1d3d',
      },
      fontFamily: {
        // Custom fonts - exact match from theme.ts
        'mandy-heading': ["'VT323'", "'Tiny5'", "'Courier New'", 'Courier', 'monospace'],
        'mandy-body': ['Poppins', 'Montserrat', 'Arial', 'sans-serif'],
      },
      backgroundImage: {
        // Gradients from theme.ts - exact match
        'mandy-hero': 'linear-gradient(135deg, rgba(255, 224, 242, 0.9) 0%, rgba(224, 234, 255, 0.9) 100%)',
        'mandy-about': 'linear-gradient(135deg, rgba(255, 224, 242, 0.9) 0%, rgba(255, 220, 174, 0.9) 100%)',
        'mandy-founder': 'linear-gradient(135deg, rgba(97, 179, 242, 0.9) 0%, rgba(175, 219, 244, 0.9) 100%)',
        'mandy-instagram': 'linear-gradient(135deg, rgba(230, 184, 241, 0.9) 0%, rgba(248, 174, 255, 0.9) 100%)',
        'mandy-cta': 'linear-gradient(135deg, rgba(255, 224, 242, 0.9) 0%, rgba(250, 238, 246, 0.9) 100%)',
      },
      boxShadow: {
        // Custom shadows from theme.ts - exact match
        'mandy-card': '0 20px 60px rgba(255, 105, 180, 0.25), 0 8px 32px rgba(0,0,0,0.1)',
        'mandy-button': '0 8px 24px rgba(255, 105, 180, 0.2)',
        'mandy-text': '0 4px 16px rgba(255, 105, 180, 0.3)',
      },
    },
  },
  plugins: [],
}

export default config