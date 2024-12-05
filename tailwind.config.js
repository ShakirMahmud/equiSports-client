/** @type {import('tailwindcss').Config} */
const daisyui = (await import('daisyui')).default;

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
};
