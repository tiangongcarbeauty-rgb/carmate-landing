import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './hooks/**/*.{js,ts,jsx,tsx}',
    './lib/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  '#DDF0FE',
          100: '#B5DEFC',
          300: '#43AAF5',
          500: '#0090EE',
          600: '#0070C7',
          700: '#00549A',
          DEFAULT: '#0090EE',
        },
        gray: {
          0:   '#FFFFFF',
          25:  '#FAFAFA',
          50:  '#F5F5F5',
          100: '#EDEDED',
          200: '#E0E0E0',
          300: '#C7C7C7',
          400: '#9A9A9A',
          500: '#757575',
          600: '#525252',
          700: '#2E2E2E',
          800: '#1A1A1A',
          900: '#0A0A0A',
        },
      },
      fontFamily: {
        zh:    ['"Noto Sans TC"', '"PingFang TC"', '"Microsoft JhengHei"', 'sans-serif'],
        latin: ['"Inter"', 'sans-serif'],
      },
      borderRadius: {
        sm:   '6px',
        md:   '12px',
        lg:   '16px',
        xl:   '24px',
        pill: '999px',
      },
      boxShadow: {
        '1':    '0 1px 2px rgba(15,15,15,.04)',
        '2':    '0 4px 14px rgba(15,15,15,.06)',
        '3':    '0 16px 40px rgba(15,15,15,.10)',
        'blue': '0 12px 30px rgba(0,144,238,.25)',
      },
      maxWidth: {
        container: '1200px',
      },
    },
  },
  plugins: [],
}

export default config
