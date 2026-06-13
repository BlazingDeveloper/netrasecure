/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#020817',
          900: '#040f2a',
          800: '#071232',
          700: '#0a1a44',
          600: '#0d2060',
        },
        blue: {
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          glow: '#1d6fe8',
        },
        orange: {
          accent: '#f97316',
          dim: '#c2590a',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 12s linear infinite',
        'orbit': 'orbit 8s linear infinite',
        'orbit-reverse': 'orbit 12s linear infinite reverse',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        orbit: {
          '0%': { transform: 'rotate(0deg) translateX(120px) rotate(0deg)' },
          '100%': { transform: 'rotate(360deg) translateX(120px) rotate(-360deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(29,111,232,0.4)' },
          '100%': { boxShadow: '0 0 40px rgba(29,111,232,0.8), 0 0 60px rgba(29,111,232,0.4)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
