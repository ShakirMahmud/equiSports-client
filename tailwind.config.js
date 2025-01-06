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
        lightBg: '#f4f7f6', // Soft mint-gray background
        darkBg: '#1a2634', // Deep navy dark background

        // Secondary Backgrounds (Card Backgrounds)
        lightCard: '#ffffff', // Crisp white card background
        darkCard: '#273444', // Soft charcoal dark card background

        // Text colors
        lightText: '#2c3e50', // Rich dark blue-gray text
        darkText: '#e6e6e6', // Soft light gray text

        // Button colors
        lightBtn: '#4a90e2', // Vibrant blue button
        darkBtn: '#5bc0de', // Soft cyan button
        lightBtnHover: '#357abd', // Deeper blue hover
        darkBtnHover: '#39b3d7', // Lighter cyan hover
        darkBtnText: '#ffffff', // White text for dark mode buttons

        // Accent and Subtitle colors
        accentColor: '#f39c12', // Warm orange accent
        subtitleText: '#7f8c8d', // Soft gray for subtitles
        priceText: '#e74c3c', // Vibrant red for prices
        cardBorder: '#bdc3c7', // Light gray border

        // Navigation and Footer Backgrounds
        navLightBg: '#ecf0f1', // Light gray-white
        navDarkBg: '#2c3e50', // Deep blue-gray
        footerLightBg: '#f8f9fa', // Very light gray
        footerDarkBg: '#233240', // Slightly lighter than main dark bg
      },
    },
  },
  plugins: [daisyui],
  darkMode: 'class',
};