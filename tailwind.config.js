/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        charcoal: {
          950: '#07080a',
          900: '#0b0d10',
          800: '#121519',
          700: '#1a1e24',
        },
        neon: {
          DEFAULT: '#b6ff3b',
          dim: '#7fc41f',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['"Space Grotesk"', 'Inter', 'ui-sans-serif', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        glow: '0 0 40px -10px rgba(182, 255, 59, 0.45)',
      },
    },
  },
  plugins: [],
};
