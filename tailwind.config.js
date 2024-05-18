/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    boxShadow: {
      invoice: "0 10px 10px -10px rgba(72, 84, 159, 0.1)",
      filter: "0 10px 20px 0 rgba(72, 84, 159, 0.25)",
      darkInvoice: "0 10px 10px -10px rgba(72, 84, 159, 0.1)",
      darkFilter: " 0 10px 20px 0 rgba(0, 0, 0, 0.25)",
    },
    colors: {
      green: "rgba(51, 214, 159, 0.06)",
      orange: "rgba(255, 143, 0, 0.06)",
      black: "rgba(55, 59, 83, 0.06)",
      grey: "rgba(223, 227, 250, 0.06)",
    },
  },
  darkMode: "class",
  plugins: [],
};
