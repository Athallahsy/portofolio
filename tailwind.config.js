/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        space: ['Poppins', 'sans-serif'],
        raleway: ['Raleway', 'sans-serif'],
      },
      animation: {
        float: "float 3s ease-in-out infinite", // key: float, value: animation-string
        'bounce-slow': 'bounce 5s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
    },
  },
  plugins: [],
};
