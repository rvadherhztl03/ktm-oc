/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/*.{js,ts,jsx,tsx,mdx}',
    './ordercloud/braintree/*/*.{js,ts,jsx,tsx,mdx}',
    './ordercloud/components/**/*.{js,ts,jsx,tsx,mdx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
        'lg-for-pdp': '1200px',
        'xl-for-pdp': '1380px',
      },
      colors: {
        transparent: 'transparent',
        primary: '#f60',
      },
      backgroundColor: {
        primary: '#f60',
      },
      borderColor: {
        primary: '#f60',
        before: 'transparent #f60 transparent transparent',
      },
      borderWidth: {
        before: '24px 23px 21px 0',
      },
      fontFamily: {
        cust: ['Oswald'],
      },
      boxShadow: {
        header: 'inset 0px 60px 20px -14px rgba(0, 0, 0, 0.8)',
      },
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '24px',
      },
      screens: {
        sm: '100%',
        md: '100%',
        lg: '1280px',
        xl: '1642px',
        '2xl': '1642px',
      },
    },
  },
  plugins: [],
}
