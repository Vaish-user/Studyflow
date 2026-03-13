/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#4F46E5', // indigo-600
        },
        secondary: {
          DEFAULT: '#2563EB', // blue-600
        },
        accent: {
          DEFAULT: '#7C3AED', // purple-600
        },
      },
      fontFamily: {
        heading: ['Poppins', 'ui-sans-serif', 'system-ui'],
        body: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
      boxShadow: {
        soft: '0 10px 30px rgba(2, 6, 23, 0.10)',
      },
    },
  },
  plugins: [],
};

