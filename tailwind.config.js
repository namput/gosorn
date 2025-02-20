/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Sarabun", "sans-serif"], // ✅ เนื้อหาใช้ Sarabun
        heading: ["Prompt", "sans-serif"], // ✅ หัวข้อใช้ Prompt
      },
    },
  },
  plugins: [],
};
