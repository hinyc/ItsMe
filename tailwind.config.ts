import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        me: {
          main: '#e7e5e4',
          point: '#e7e5e4',
          highlight: '#ff5f00',
          focus: '#0085ff',
          disabled: '#b3b3b3'
        }
      }
    }
  }
} satisfies Config;
