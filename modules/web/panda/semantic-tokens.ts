import { defineSemanticTokens } from '@pandacss/dev';

// Dark only. Names say what a colour is for; values come from tokens.ts.
export const semanticTokens = defineSemanticTokens({
  colors: {
    // The room's own surfaces: fog, gilt trim, pale lettering.
    chrome: {
      app: { value: '{colors.fog.deep}' },
      bar: { value: '{colors.fog.base}' },
      fg: { value: '#D9D4C6' },
      fgStrong: { value: '#E9E4D6' },
      hover: { value: 'rgba(233, 228, 214, 0.08)' },
      border: { value: 'rgba(216, 164, 60, 0.22)' },
      field: { value: '{colors.fog.deep}' },
    },
    bg: {
      surface: { value: '{colors.fog.shade}' },
      subtle: { value: '{colors.fog.mist}' },
      muted: { value: '{colors.fog.haze}' },
      hover: { value: 'rgba(233, 228, 214, 0.07)' },
      overlay: { value: 'rgba(10, 13, 14, 0.8)' },
    },
    fg: {
      default: { value: '#E9E4D6' },
      muted: { value: '#A9ADA3' },
      subtle: { value: '#7E847C' },
    },
    border: {
      subtle: { value: 'rgba(216, 164, 60, 0.12)' },
      default: { value: 'rgba(216, 164, 60, 0.24)' },
      strong: { value: 'rgba(216, 164, 60, 0.4)' },
    },
    // Printed matter's own: paper, ink, rules.
    print: {
      bg: { value: '{colors.paper.card}' },
      raised: { value: '{colors.paper.bright}' },
      sunk: { value: '{colors.paper.aged}' },
      ink: { value: '{colors.paper.ink}' },
      muted: { value: '{colors.paper.muted}' },
      soft: { value: '{colors.paper.soft}' },
      rule: { value: '{colors.paper.line}' },
      hover: { value: 'rgba(43, 36, 32, 0.07)' },
    },
    accent: {
      default: { value: '{colors.gold.base}' },
      text: { value: '#E6B964' },
      tint: { value: 'rgba(216, 164, 60, 0.16)' },
      // Keyboard focus: a lamp-gold glow, which shows on the fog and on paper alike.
      ring: { value: '#F0A63A' },
    },
    danger: { value: '{colors.stamp.base}' },
    presence: { online: { value: '{colors.status.online}' } },
  },
  shadows: {
    floating: { value: '0 0 0 1px rgba(216, 164, 60, 0.18), 0 10px 28px rgba(0, 0, 0, 0.65)' },
    // A piece cut out of paper, like a paper theatre's (spec §8): a thin cream border round its ink
    // edge, a faint line where it was cut, and a soft shadow on what's behind (the sketches' `cut`).
    cutout: { value: '0 0 0 4px {colors.paper.card}, 0 0 0 5.5px rgba(43, 36, 32, 0.35), 0 18px 34px -10px rgba(0, 0, 0, 0.8), 0 4px 10px rgba(0, 0, 0, 0.4)' },
    // The same, smaller, for the room's chips and buttons.
    cutoutSmall: { value: '0 0 0 2.5px {colors.paper.card}, 0 0 0 3.5px rgba(43, 36, 32, 0.35), 0 4px 10px rgba(0, 0, 0, 0.45)' },
  },
});
