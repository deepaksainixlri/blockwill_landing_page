module.exports = {
  content: ["./pages/*.{html,js}", "./index.html", "./js/*.js"],
  theme: {
    extend: {
      colors: {
        primary: "#4a148c", // Deep purple for institutional trust and luxury
        "primary-light": "#7b1fa2", // Medium purple for supporting elements
        accent: "#e8eaf6", // Light purple-tinted white for CTAs and conversion moments
        background: "#ffffff", // Pure white for clean luxury canvas
        surface: "#f8f9fa", // Off-white for cards and forms
        "text-primary": "#2d2d2d", // Dark gray for high contrast
        "text-secondary": "#6c757d", // Medium gray for secondary text
        success: "#7c4dff", // Purple-tinted success for brand consistency
        warning: "#9c27b0", // Purple warning for brand consistency
        error: "#e91e63", // Pink error for softer feel
        border: "#e1e5e9", // Light gray for minimal borders
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
        playfair: ['Playfair Display', 'serif'],
      },
      fontWeight: {
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
      },
      boxShadow: {
        'cta': '0 4px 12px rgba(74, 20, 140, 0.15)',
        'card': '0 2px 8px rgba(74, 20, 140, 0.08)',
        'cta-hover': '0 6px 16px rgba(74, 20, 140, 0.25)',
      },
      transitionDuration: {
        '250': '250ms',
      },
      transitionTimingFunction: {
        'ease-in-out': 'ease-in-out',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}