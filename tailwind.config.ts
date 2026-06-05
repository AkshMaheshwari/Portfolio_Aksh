import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        pitch: '#080f0a',
        gold: '#f5c518',
        'green-deep': '#1a3a24',
        card: '#0d1f14',
        border: 'rgba(255,255,255,0.094)',
      },
      fontFamily: {
        bebas: ['var(--font-bebas)', 'sans-serif'],
        inter: ['var(--font-inter)', 'sans-serif'],
      },
      keyframes: {
        pulse_green: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(74,222,128,0.4)' },
          '50%': { boxShadow: '0 0 0 8px rgba(74,222,128,0)' },
        },
        ticker: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        pulse_green: 'pulse_green 2s ease-in-out infinite',
        ticker: 'ticker 20s linear infinite',
      },
    },
  },
  plugins: [],
};

export default config;
