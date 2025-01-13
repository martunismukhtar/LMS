import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'color-dark1':"#dee4ee",
        'color-dark2':"#8a99af",
        'color-dark':"#333a48",        
        background: "var(--background)",
        foreground: "var(--foreground)",
        'primary': '#007BFF',
        'secondary': '#E6E6E6',
        'tertiary': '#F8F8F8',
        'quaternary': '#F8F8F8',
        'dark': '#333a48',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'fade-out': 'fadeOut 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
      },
      
    },
  },
  plugins: [],
} satisfies Config;
