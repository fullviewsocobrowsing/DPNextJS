module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        sky: {
          50: '#f0fbff',
          100: '#e6f6ff',
          200: '#bfefff',
          300: '#99e7ff',
          400: '#66d7ff',
          500: '#2fb8f0'
        }
      }
    }
  },
  plugins: [],
}
