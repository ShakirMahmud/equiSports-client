import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Background for Light and Dark Mode
        lightBg: '#fef7e5', // Light beige for Light Mode
        darkBg: '#2c3e50', // Dark blue-gray for Dark Mode

        // Secondary Backgrounds (Card Backgrounds)
        lightCard: '#ffffff', // White card background (Light Mode)
        darkCard: '#34495e', // Darker shade for cards (Dark Mode)

        // Text colors
        lightText: '#2d2d2d', // Dark text color for light mode
        darkText: '#ecf0f1', // Light off-white text color for dark mode

        // Button colors
        lightBtn: '#88d9e6', // Soft blue button color (Light Mode)
        darkBtn: '#a0d3f0', // Light blue button color (Dark Mode)
        lightBtnHover: '#72c1d0', // Hover color for light mode buttons
        darkBtnHover: '#85c0e0', // Hover color for dark mode buttons
        darkBtnText: '#1e1e1e', // Dark button text color (Dark Mode)

        // Accent and Subtitle colors
        accentColor: '#ff9a8b', // Soothing accent color for both modes
        subtitleText: '#8e8e8e', // Light opacity color for subtitles
        priceText: '#ffb84d', // Subtle orange for price text
        cardBorder: '#3a3a3a', // Dark border for cards in dark mode

        // Navigation and Footer Backgrounds
        navLightBg: '#f0f1f5', // Light background for nav in light mode (slightly darker than main bg)
        navDarkBg: '#253747', // Dark background for nav in dark mode (slightly darker than main bg)
        footerLightBg: '#f0f1f5', // Light background for footer in light mode
        footerDarkBg: '#253747', // Dark background for footer in dark mode
      },
    },
  },
  plugins: [daisyui],
  darkMode: 'class',
};
