/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        inversa: {
          dark: '#0B0F19',
          card: '#151D2F',
          cardHover: '#1B253B',
          border: '#243048',
          cyan: '#06B6D4',
          blue: '#3B82F6',
          green: '#22C55E',
          red: '#EF4444',
          muted: '#94A3B8',
          subtle: '#64748B'
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        cinzel: ['"Cinzel"', 'serif'],
        syne: ['Syne', 'sans-serif'],
        outfit: ['Outfit', 'sans-serif'],
        grotesk: ['"Space Grotesk"', 'sans-serif']
      },
      boxShadow: {
        'glow-cyan': '0 0 25px -5px rgba(6, 182, 212, 0.3)',
        'glow-blue': '0 0 25px -5px rgba(59, 130, 246, 0.3)',
        'glow-green': '0 0 25px -5px rgba(34, 197, 94, 0.3)',
        'card-elevated': '0 10px 30px -10px rgba(0, 0, 0, 0.7)'
      }
    },
  },
  plugins: [],
}
