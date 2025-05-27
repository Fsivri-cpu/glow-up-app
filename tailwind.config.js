/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        blushPink: '#F8E1E7',
        plumPurple: '#B56DA5',
        charcoal: '#333333',
        mediumGray: '#666666',
        softGray: '#999999',
      },
      fontFamily: {
        manrope: ['Manrope'],
        inter: ['Inter'],
        'inter-semibold': ['Inter-SemiBold'],
      },
    },
  },
  plugins: [],
}

