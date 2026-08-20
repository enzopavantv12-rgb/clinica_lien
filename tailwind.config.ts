import type { Config } from 'tailwindcss';

/**
 * Design system derivado do manual de identidade visual oficial da Lien.
 * Os valores da paleta foram conferidos contra os preenchimentos do PDF
 * (#9C1782 / #037D99 nos swatches — arredondamento de float do PDF).
 * NAO alterar sem atualizar o manual.
 */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Paleta oficial do manual
        magenta: {
          DEFAULT: '#9C1781',
          light: '#F0B6F2',
        },
        teal: {
          DEFAULT: '#037E99',
          light: '#68C0D4',
        },
        brandgray: '#E1E1E1',
        // Neutros derivados (autorizados para texto/fundo, por acessibilidade)
        ink: {
          DEFAULT: '#1A1420',
          muted: '#5A5260',
        },
        cream: '#FAF8F6',
      },
      fontFamily: {
        sans: ['Poppins', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // Escala do prompt mestre (mobile -> desktop via clamp)
        tag: ['0.75rem', { lineHeight: '1.2', letterSpacing: '0.18em' }],
        'tag-lg': ['0.8125rem', { lineHeight: '1.2', letterSpacing: '0.18em' }],
        h1: ['2.125rem', { lineHeight: '1.08', letterSpacing: '-0.02em' }],
        'h1-lg': ['3.75rem', { lineHeight: '1.08', letterSpacing: '-0.02em' }],
        h2: ['1.75rem', { lineHeight: '1.15', letterSpacing: '-0.015em' }],
        'h2-lg': ['2.75rem', { lineHeight: '1.15', letterSpacing: '-0.015em' }],
        h3: ['1.1875rem', { lineHeight: '1.25', letterSpacing: '-0.01em' }],
        'h3-lg': ['1.4375rem', { lineHeight: '1.25', letterSpacing: '-0.01em' }],
        sub: ['1rem', { lineHeight: '1.55' }],
        'sub-lg': ['1.1875rem', { lineHeight: '1.55' }],
        body: ['0.9375rem', { lineHeight: '1.65' }],
        'body-lg': ['1.0625rem', { lineHeight: '1.65' }],
        stat: ['2.75rem', { lineHeight: '1', letterSpacing: '-0.03em' }],
        'stat-lg': ['4rem', { lineHeight: '1', letterSpacing: '-0.03em' }],
        legend: ['0.8125rem', { lineHeight: '1.5' }],
        'legend-lg': ['0.875rem', { lineHeight: '1.5' }],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      boxShadow: {
        // Sombras suaves e difusas. Nunca duras. Nunca sobre o logo.
        soft: '0 8px 32px rgba(26, 20, 32, 0.06)',
        lift: '0 14px 44px rgba(26, 20, 32, 0.10)',
      },
      maxWidth: {
        prose: '62ch',
      },
      transitionTimingFunction: {
        brand: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
} satisfies Config;
