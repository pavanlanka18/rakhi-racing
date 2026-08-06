import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        circuit: {
          50: '#E8EFEB',
          100: '#C2D4C8',
          200: '#8FAE9C',
          300: '#5C8A70',
          400: '#386A4E',
          500: '#1E3D2F',
          600: '#163025',
          700: '#11251D',
          800: '#0E1A14',
          900: '#0A0F0C',
        },
        mauli: {
          400: '#E8C36A',
          500: '#D4A24A',
          600: '#B98A2E',
        },
        vermillion: {
          400: '#E25141',
          500: '#C8341F',
          600: '#9A2412',
        },
        chrome: {
          200: '#D8DCE0',
          400: '#9AA1A8',
          600: '#5C636A',
        },
        ivory: '#F5F1E8',
        ink: '#0A0F0C',
      },
      fontFamily: {
        display: ['var(--font-rajdhani)', 'system-ui', 'sans-serif'],
        body: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-plex-mono)', 'ui-monospace', 'monospace'],
      },
      keyframes: {
        'circuit-draw': {
          from: { strokeDashoffset: '1000' },
          to: { strokeDashoffset: '0' },
        },
        'rakhi-tie': {
          '0%': { transform: 'rotate(-12deg) translateY(-4px)', opacity: '0' },
          '60%': { transform: 'rotate(2deg) translateY(0)', opacity: '1' },
          '100%': { transform: 'rotate(0)', opacity: '1' },
        },
        'placard-fade': {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'placard-pulse': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(212,162,74,0.0)' },
          '50%': { boxShadow: '0 0 16px 0 rgba(212,162,74,0.35)' },
        },
      },
      animation: {
        'circuit-draw': 'circuit-draw 1.4s ease-out forwards',
        'rakhi-tie': 'rakhi-tie 700ms ease-out 200ms both',
        'placard-fade': 'placard-fade 500ms ease-out 900ms both',
        'placard-pulse': 'placard-pulse 3s ease-in-out 1500ms infinite',
      },
      backgroundImage: {
        'circuit-grid':
          'linear-gradient(rgba(216,220,224,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(216,220,224,0.05) 1px, transparent 1px)',
      },
      backgroundSize: {
        'grid-32': '32px 32px',
      },
      boxShadow: {
        'mauli-glow': '0 0 24px rgba(212,162,74,0.25)',
        'vermillion-glow': '0 0 24px rgba(200,52,31,0.25)',
      },
    },
  },
  plugins: [],
};

export default config;
