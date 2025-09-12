// tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // --- Colors from Style Guide (Section 2: Primary colors) ---
        // Logo Dark Blue: Used for logo on white/black backgrounds
        'logo-dark-blue': {
          DEFAULT: '#3B396D',
          // Add lighter/darker shades here if needed for hover, gradients, etc.
          // 50: '#f0f0f7',
          // 100: '#d9d8e6',
          900: '#1a1931',
        },
        // Background Deep Blue: Used for backgrounds, only with white logo
        'background-deep-blue': {
          DEFAULT: '#1D1B3A',
          // Add lighter/darker shades here if needed
        },
        // White (listed in style guide)
        'white': {
          DEFAULT: '#FFFFFF',
        },
        // Note: The style guide specifies *never* using Logo Dark Blue and Background Deep Blue together.
      },
      fontFamily: {
        // --- Typography from Style Guide (Section 3: Typography) ---
        // Use 'Outfit' as the primary sans-serif font for all text (headlines, body)
        sans: ['Outfit', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
        // Keep serif if you use it for specific elements
        serif: ['Georgia', 'Cambria', 'Times New Roman', 'Times', 'serif'],
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        marqueeLeft: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        marqueeRight: {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 1s ease-out',
        slideUp: 'slideUp 0.8s ease-out',
        'marquee-left': 'marqueeLeft 40s linear infinite',
        'marquee-right': 'marqueeRight 40s linear infinite',
      }
    },
  },
  plugins: [],
}