/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,md,mdx}',
    './components/**/*.{js,ts,jsx,tsx,md,mdx}',
  ],
  theme: {
    typography: require('./typography'),
    extend: {
      colors: {
        // Tapítise core palette
        forest: {
          deep: '#122A1E',
          dark: '#1A3B2B',
          medium: '#2D5540',
          light: '#4C7059',
        },
        cream: {
          base: '#E8DFC8',
          light: '#F4EFE2',
          dark: '#D9CEB4',
        },
        earth: {
          amber: '#C88238',
          'amber-dark': '#8A531F',
          'amber-light': '#E3A45E',
        },
        charcoal: '#181C19',
        sand: '#D2C5A7',
        muted: '#8C826B',
        success: {
          DEFAULT: '#285A3A',
          light: '#DCE8DD',
        },
        warning: {
          DEFAULT: '#C87A28',
          light: '#F3E1C8',
        },
        error: {
          DEFAULT: '#8B2E2E',
          light: '#F0D9D4',
          soft: '#E3B1AA',
        },
        info: {
          DEFAULT: '#3B5B6D',
          light: '#DCE4E8',
        },

        // Warm neutral scale (replaces cold grays)
        gray: {
          50: '#FAF6EC',
          100: '#F4EFE2',
          200: '#E8DFC8',
          300: '#D2C5A7',
          400: '#B3A88C',
          500: '#8C826B',
          600: '#6F6858',
          700: '#4A4B42',
          800: '#2E322C',
          900: '#181C19',
          950: '#0F1210',
        },

        // Primary maps to the forest scale so legacy `primary-*` utilities
        // automatically inherit the brand instead of the old blue.
        primary: {
          50: '#F4EFE2',
          100: '#E8DFC8',
          200: '#D2C5A7',
          300: '#A9B9A7',
          400: '#6E8C77',
          500: '#4C7059',
          600: '#1A3B2B',
          700: '#122A1E',
          800: '#0E2117',
          900: '#091A11',
        },

        // Semantic tails used by legacy components
        green: {
          50: '#EEF3EA',
          100: '#DCE8DD',
          400: '#4C7059',
          700: '#285A3A',
          800: '#1E442C',
        },
        red: {
          50: '#F8EDEA',
          100: '#F0D9D4',
          200: '#E3B1AA',
          300: '#D08E85',
          400: '#B86B61',
          600: '#8B2E2E',
          700: '#722525',
          800: '#5A1D1D',
        },
        yellow: {
          50: '#F8F0E3',
          100: '#F3E1C8',
          400: '#DCA05A',
          600: '#C87A28',
          700: '#A96828',
          800: '#7E4E1D',
        },
        blue: {
          50: '#EDF1F3',
          100: '#DCE4E8',
          400: '#6E8A99',
          500: '#3B5B6D',
          600: '#3B5B6D',
        },
        indigo: {
          25: '#F4EFE2',
          100: '#E8DFC8',
          600: '#1A3B2B',
        },
        purple: {
          50: '#F4EFE2',
        },
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'Cambria', 'Times New Roman', 'serif'],
        body: ['"Plus Jakarta Sans"', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'sans-serif'],
        sans: ['"Plus Jakarta Sans"', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'sans-serif'],
        serif: ['Fraunces', 'Georgia', 'Cambria', 'Times New Roman', 'serif'],
      },
      borderRadius: {
        none: '0px',
        sm: '3px',
        DEFAULT: '3px',
        md: '6px',
        lg: '6px',
        xl: '12px',
        '2xl': '12px',
        '3xl': '16px',
        full: '9999px',
      },
      boxShadow: {
        'sm': '0 2px 4px rgba(24, 28, 25, 0.08)',
        'soft': '0 2px 4px rgba(24, 28, 25, 0.08)',
        'woodcut': '3px 3px 0px #181C19',
        'woodcut-lg': '5px 5px 0px #181C19',
        'woodcut-amber': '3px 3px 0px #C88238',
        'woodcut-inset': 'inset 2px 2px 0px rgba(24, 28, 25, 0.12)',
      },
      letterSpacing: {
        brand: '0.15em',
      },
      screens: {
        mobile: '100px',
        // => @media (min-width: 100px) { ... }
        tablet: '640px', // 391
        // => @media (min-width: 640px) { ... }
        pc: '769px',
        // => @media (min-width: 769px) { ... }
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/line-clamp'),
  ],
}
