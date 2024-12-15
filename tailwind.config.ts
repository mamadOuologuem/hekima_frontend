import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';
import tailwindAnimatePlugin from 'tailwindcss-animate';

const config: Config = {
  darkMode: ['class'],
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        tertiary: {
          DEFAULT: 'hsl(var(--tertiary))',
          foreground: 'hsl(var(--tertiary-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))'
        }
      },
      keyframes: {
        'appearing-svg-path': {
          from: { 'stroke-dashoffset': 'var(--start-dashoffset)' },
          to: { 'stroke-dashoffset': 'var(--end-dashoffset, 0)' }
        }
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      }
    }
  },
  plugins: [
    tailwindAnimatePlugin,
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          'highlighted-text': (value) => {
            return {
              display: 'inline',
              border: `1px solid ${value}`,
              borderRadius: '0.5rem',
              backgroundColor: value,
              boxShadow: `0.5rem 0 0 ${value},-0.5rem 0 0 ${value}`,
              boxDecorationBreak: 'clone',
              transform: 'translateX(0.25em)'
            };
          }
        },
        { values: flattenColorPalette(theme('colors')) }
      );
    })
  ]
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const flattenColorPalette = (colors: Record<string, any>): Record<string, string> =>
  Object.assign(
    {},
    ...Object.entries(colors ?? {}).flatMap(([color, values]) =>
      typeof values == 'object'
        ? Object.entries(flattenColorPalette(values)).map(([number, hex]) => ({
            [color + (number === 'DEFAULT' ? '' : `-${number}`)]: hex
          }))
        : [{ [`${color}`]: values }]
    )
  );

export default config;
