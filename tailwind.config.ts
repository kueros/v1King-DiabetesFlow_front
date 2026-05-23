import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    borderRadius: {
      sm: '0px',
      md: '0px',
      lg: '0px',
      xl: '0px',
      '2xl': '0px',
      '3xl': '0px',
      full: '0px',
      DEFAULT: '0px',
    },
    extend: {
      colors: {
        'forge-black': '#1A1A1A',
        'viking-red': '#C41E3A',
        'saga-cream': '#F5F1E8',
        'shield-gray': '#3D3D3D',
        'helm-gold': '#D4AF37',
      },
      fontFamily: {
        space: ['var(--font-space)'],
        syne: ['var(--font-syne)'],
        inter: ['var(--font-inter)'],
        mono: ['var(--font-mono)'],
      },
    },
  },
  plugins: [],
};

export default config;
