/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        // Game-specific colors
        game: {
          primary: '#6366f1', // Indigo
          secondary: '#8b5cf6', // Violet
          accent: '#06b6d4', // Cyan
          success: '#10b981', // Emerald
          warning: '#f59e0b', // Amber
          danger: '#ef4444', // Red
          xp: '#fbbf24', // Amber for XP
          level: '#3b82f6', // Blue for levels
          badge: '#f59e0b', // Amber for badges
        },
        world: {
          basics: '#10b981', // Emerald - World 1
          advanced: '#3b82f6', // Blue - World 2
          mastery: '#8b5cf6', // Violet - World 3
          creative: '#f59e0b', // Amber - World 4
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
        'level-up': {
          '0%': { transform: 'scale(1) rotate(0deg)', opacity: '1' },
          '50%': { transform: 'scale(1.2) rotate(180deg)', opacity: '0.8' },
          '100%': { transform: 'scale(1) rotate(360deg)', opacity: '1' },
        },
        'xp-gain': {
          '0%': { transform: 'translateY(0px)', opacity: '1' },
          '100%': { transform: 'translateY(-50px)', opacity: '0' },
        },
        'badge-unlock': {
          '0%': { transform: 'scale(0) rotate(-180deg)', opacity: '0' },
          '50%': { transform: 'scale(1.2) rotate(0deg)', opacity: '1' },
          '100%': { transform: 'scale(1) rotate(0deg)', opacity: '1' },
        },
        'quest-complete': {
          '0%': { transform: 'scale(1)', boxShadow: '0 0 0 0 rgba(34, 197, 94, 0.7)' },
          '70%': { transform: 'scale(1.05)', boxShadow: '0 0 0 10px rgba(34, 197, 94, 0)' },
          '100%': { transform: 'scale(1)', boxShadow: '0 0 0 0 rgba(34, 197, 94, 0)' },
        },
        'floating': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'level-up': 'level-up 0.8s ease-in-out',
        'xp-gain': 'xp-gain 1s ease-out forwards',
        'badge-unlock': 'badge-unlock 0.6s ease-out',
        'quest-complete': 'quest-complete 2s ease-out',
        'floating': 'floating 3s ease-in-out infinite',
      },
      backgroundImage: {
        'gradient-game': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'gradient-world-1': 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
        'gradient-world-2': 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
        'gradient-world-3': 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
        'gradient-world-4': 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
      },
      fontFamily: {
        game: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}