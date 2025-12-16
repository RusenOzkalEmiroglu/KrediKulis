/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.3s ease-in-out',
        slideUp: 'slideUp 0.4s ease-out',
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      colors: {
        // Ana Renkler
        primary: {
          DEFAULT: '#ff3d00', // Ana Marka Rengi (Turuncu)
          dark: '#ff3d00',    // Koyu Turuncu
          light: '#ff3d00',   // Açık Turuncu
        },
        secondary: {
          DEFAULT: '#1A1A1A', // Ana Kontrast (Siyah)
          light: '#333333',   // Yumuşak Siyah
          medium: '#777777',  // Orta Gri
        },
        // Fonksiyonel Renkler
        success: {
          DEFAULT: '#4CAF50', // Başarı Yeşili
        },
        warning: {
          DEFAULT: '#FFC107', // Uyarı Sarısı
        },
        destructive: {
          DEFAULT: '#F44336', // Hata Kırmızısı
        },
        info: {
          DEFAULT: '#2196F3', // Bilgi Mavisi
        },
        // Arka Plan Renkleri
        background: {
          DEFAULT: '#FFFFFF', // Birincil Arka Plan
          secondary: '#F5F5F5', // İkincil Arka Plan
        }
      },
      fontFamily: {
        heading: ['var(--font-montserrat)', 'Montserrat', 'sans-serif'],
        body: ['var(--font-open-sans)', 'Open Sans', 'sans-serif'],
        mono: ['var(--font-roboto-mono)', 'Roboto Mono', 'monospace'],
      },
      fontSize: {
        'h1': '32px',
        'h2': '24px',
        'h3': '20px',
        'h4': '18px',
        'body': '16px',
        'small': '14px',
        'xs': '12px',
      },
      fontWeight: {
        heading: '700',
        subheading: '600',
        body: '400',
        medium: '500',
      },
      borderRadius: {
        'card': '12px',
        'button': '8px',
        'input': '8px',
      },
      boxShadow: {
        'card': '0px 4px 12px rgba(0, 0, 0, 0.05)',
        'card-hover': '0px 6px 16px rgba(0, 0, 0, 0.08)',
        'dropdown': '0px 4px 12px rgba(0, 0, 0, 0.1)',
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1.5rem',
          sm: '2rem',
          md: '3rem',
          lg: '4rem',
        },
      },
      spacing: {
        'xs': '8px',
        'sm': '16px',
        'md': '32px',
        'lg': '48px',
      },
      lineHeight: {
        'heading': '1.2',
        'subheading': '1.4',
        'body': '1.6',
      },
      transitionDuration: {
        'default': '300ms',
        'slow': '500ms',
        'fast': '200ms',
      },
      backgroundImage: {
        'orange-gradient': 'linear-gradient(135deg, #ff3d00, #ff3d00)',
        'black-gradient': 'linear-gradient(135deg, #1A1A1A, #333333)',
      },
    },
  },
  plugins: [],
} 