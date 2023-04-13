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
    },
    colors: {
      primary: "#F5F5F5",
      secondary: "#43425D",
      other: "#24A9E2",
      hoverboard: "#F6F9FC",
    },
    extend: {},
  },
  plugins: [require("flowbite/plugin")],
};

