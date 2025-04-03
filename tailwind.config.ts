
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			// Font family
			fontFamily: {
				'manrope': ['Manrope', 'sans-serif'],
			},
			// Custom spacing values
			spacing: {
				'xs': '4px',
				'sm': '8px',
				'md': '16px',
				'lg': '24px',
				'xl': '32px',
			},
			// Custom border radius values
			borderRadius: {
				'sm': '6px',
				'md': '12px',
				'lg': '20px',
				'full': '999px',
			},
			// Font sizes and line heights
			fontSize: {
				'body-2': ['14px', {
					lineHeight: '20px',
					fontWeight: '400',
				}],
				'body-3': ['16px', {
					lineHeight: '24px',
					fontWeight: '500',
				}],
				'body-4': ['18px', {
					lineHeight: '28px',
					fontWeight: '600',
				}],
				'heading-4': ['18px', {
					lineHeight: '24px',
					fontWeight: '400',
				}],
				'heading-5': ['24px', {
					lineHeight: '32px',
					fontWeight: '500',
				}],
				'heading-6': ['32px', {
					lineHeight: '40px',
					fontWeight: '700',
				}],
			},
			// Custom colors
			colors: {
				// Brand colors
				'primary': '#E04A0B',
				'secondary': '#FEA721',
				'accent': '#678598',
				'info': '#2B3E4F',
				
				// Status colors
				'success': '#4CAF50',
				'error': '#F44336',
				'warning': '#FFC107',
				
				// Neutral colors
				'background': {
					DEFAULT: '#FFFFFF',
					dark: '#121212',
				},
				'text': {
					DEFAULT: '#111111',
					dark: '#EDEDED',
				},
				'surface': '#F7EBD5',
				'border': {
					DEFAULT: '#E0E0E0',
					dark: '#2C2C2C',
				},
				'disabled': '#A0A0A0',
				'card': {
					DEFAULT: '#F7EBD5',
					dark: '#1E1E1E',
				},
				
				// Keep shadcn system colors using HSL
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
