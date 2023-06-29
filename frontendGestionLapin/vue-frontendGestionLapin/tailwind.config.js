/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    fontFamily: {
      poppins: ["Poppins", "sans-serif"],
      milky: ["Milky Nice", "sans-serif"],
      montsserat: ["Montserrat", "sans-serif"],
    },
    colors: {
      primary: "#F5F5F5",
      secondary: "#1BC16D",
      secondaryhover : '#43CE8B',
      other: "#24A9E2",
      hoverboard: "#F6F9FC",
    },
    extend: {},
  },
  plugins: [require("flowbite/plugin")],
};

