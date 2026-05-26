/** @type {import('tailwindcss').Config} */
const config = {
  content: [],
  theme: {
    extend: {
      fontFamily: {
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'var(--font-serif)', 'Georgia', 'serif'],
      },
      colors: {
        'wedding-cream': '#FFF8DC',
        'wedding-gold': '#D4AF37',
        'wedding-red': '#C41E3A',
        'wedding-dark': '#1C0A00',
        'wedding-pink': '#D4688A',
        'wedding-blush': '#FFB7C5',
        'wedding-green': '#4A7C59',
        'wedding-brown': '#8B7355',
        'wedding-sepia': '#F5ECD7',
        'wedding-maroon': '#8B1A1A',
        'wedding-gold-dark': '#C9A84C',
        'wedding-light-gold': '#E8D5A3',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        kenBurns: {
          '0%': { transform: 'scale(1) translate(0, 0)' },
          '50%': { transform: 'scale(1.1) translate(-2%, -1%)' },
          '100%': { transform: 'scale(1) translate(0, 0)' },
        },
        flipDown: {
          '0%': { transform: 'rotateX(0deg)' },
          '100%': { transform: 'rotateX(-90deg)' },
        },
        flipUp: {
          '0%': { transform: 'rotateX(90deg)' },
          '100%': { transform: 'rotateX(0deg)' },
        },
        petalFall: {
          '0%': { transform: 'translateY(-10px) rotate(0deg)', opacity: '0' },
          '10%': { opacity: '1' },
          '100%': { transform: 'translateY(100vh) rotate(360deg)', opacity: '0' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.8)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        drawPath: {
          '0%': { strokeDashoffset: '1000' },
          '100%': { strokeDashoffset: '0' },
        },
        bounce: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
      },
      animation: {
        float: 'float 3s ease-in-out infinite',
        shimmer: 'shimmer 3s linear infinite',
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'ken-burns': 'kenBurns 20s ease-in-out infinite',
        'flip-down': 'flipDown 0.5s ease-in forwards',
        'flip-up': 'flipUp 0.5s ease-out forwards',
        'petal-fall': 'petalFall 5s linear infinite',
        'slide-in-left': 'slideInLeft 0.5s ease-out forwards',
        'scale-in': 'scaleIn 0.4s ease-out forwards',
        'draw-path': 'drawPath 2s ease-out forwards',
        bounce: 'bounce 1.5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
