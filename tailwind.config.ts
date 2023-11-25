import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{js,jsx,ts,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary': 'rgb(14 165 233)',
      },
    },
  },
  plugins: [],
}
export default config;
