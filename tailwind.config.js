/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: '#11151E',
        secondary_beix: '#FFE598',
        secondary_green: '#D6FC51'
      },
      fontFamily: {
        mregular: ['MavenPro-Regular', 'sans-serif'],
        mmedium: ['MavenPro-Medium', 'sans-serif'],
        msemi: ['MavenPro-SemiBold', 'sans-serif'],
        mbold: ['MavenPro-Bold', 'sans-serif'],
        mbextraold: ['MavenPro-ExtraBold', 'sans-serif'],
        mblack: ['MavenPro-Black', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

