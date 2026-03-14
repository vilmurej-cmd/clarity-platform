import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        clarity: {
          blue: { DEFAULT: '#3B82F6', light: '#60A5FA', dark: '#2563EB' },
          teal: { DEFAULT: '#14B8A6', light: '#5EEAD4' },
          amber: '#F59E0B',
          rose: '#FB7185',
          green: '#10B981',
        },
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
        sans: ['var(--font-jakarta)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
