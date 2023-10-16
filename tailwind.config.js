/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/App.vue",
    "./src/components/*.vue",
    "./src/components/**/*.vue",
    "./src/ui_components/*.vue"
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["night"]
  }
}

