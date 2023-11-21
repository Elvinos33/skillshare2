import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'text': '#020203',
        'background': '#ffffff',
        'primary': '#006aff',
        'secondary': '#6aa4ec',
        'accent': '#5c7ead',
      },  
    },
  },
  plugins: [],
}
export default config
