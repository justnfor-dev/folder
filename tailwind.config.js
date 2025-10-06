/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#F8FAFB',
        panel: '#FFFFFF',
        ink: '#0F172A',
        muted: '#64748B',
        line: '#E6E8EC',
        brand: '#111827',
        accent: '#CE6428',
        success: '#16A34A',
        warning: '#F59E0B',
        danger: '#DC2626',
        info: '#2563EB',
      },
      fontFamily: {
        sans: ['ui-sans-serif', '-apple-system', 'SF Pro', 'Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'card': '1rem',
      },
    },
  },
  plugins: [],
};
