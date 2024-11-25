import type { Config } from 'tailwindcss';
import { purple } from 'tailwindcss/colors';


const config = {
  darkMode: ['class'],
  content: ['./app/**/*.{ts,vue}', './public/*.svg'],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '0.7rem',
    },
    extend: {
      colors: {
        primary: purple,
      },
    },
  },
} satisfies Config;

export default config;
