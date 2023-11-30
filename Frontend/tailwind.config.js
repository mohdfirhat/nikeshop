/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,tsx}"],
  theme: {
    fontFamily: {
      logo: ["Futura"],
    },
    extend: {},
  },
  plugins: [require("daisyui")],
};
