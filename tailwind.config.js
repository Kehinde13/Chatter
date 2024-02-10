/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        blackBG: "rgba(0,0,0,0.8)",
        banner: "rgb(255, 192, 23)",
      },
      fontFamily: {
        title: `gt-super, Georgia, cambria, Times New Roman, Times, serif:`,
        texts: `sohne, Helvitica Neue, Helvitica, Arial, sans-serif`,
      },
      gridTemplateColumns: {
        card: "repeat(auto-fit, minmax(280px, 1fr)"
      },
    },
  },
  plugins: [],
}

