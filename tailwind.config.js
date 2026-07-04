/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
        serif: ["Cormorant Garamond", "Georgia", "serif"]
      },
      colors: {
        brand: {
          ink: "#17211D",
          deep: "#1F3D35",
          green: "#29584C",
          gold: "#B88A44",
          soft: "#F7F3EA",
          line: "#D9D0BE"
        }
      },
      boxShadow: {
        line: "0 18px 55px rgba(23,33,29,0.10)"
      }
    }
  },
  plugins: []
};
