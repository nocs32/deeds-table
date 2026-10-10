import { defineTokens } from '@pandacss/dev';

// Drizzleton by day, as a paper theatre (spec §8, D40): the colours of the approved look sketches
// (`.scratch/look-sketches.html`). Two families of surfaces, used the same way everywhere:
// - the room itself (the top bar, the dock, the chat): the foggy slate of the style board's page,
//   with gilt trim and pale lettering;
// - printed matter (the lobby's cards, popovers, the status card, and with the game the deeds, the
//   letters and the newspaper): cream paper with an ink edge, cut out like a paper theatre's pieces,
//   and a pillar-box red stamp for danger.
// The drawings take their colours from here too (`src/art/palette.ts`).
export const tokens = defineTokens({
  fonts: {
    // Everything you read (spec D40): covers Cyrillic.
    body: { value: '"Alegreya Sans", ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif' },
    // Names and prices: the street names, the deeds, the masthead, headings and buttons.
    display: { value: '"Yeseva One", Georgia, serif' },
    // Handwriting: letters' notes, signatures, a P.S.
    hand: { value: '"Caveat Variable", "Caveat", "Comic Sans MS", cursive' },
    mono: { value: 'ui-monospace, "SF Mono", Menlo, Consolas, monospace' },
    emoji: { value: '"Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif' },
  },
  colors: {
    // The fog round the board, from the darkest corner to the panels' edges.
    fog: {
      deep: { value: '#111618' },
      base: { value: '#161C1E' },
      shade: { value: '#1F2729' },
      mist: { value: '#26323A' },
      haze: { value: '#303B3C' },
    },
    // Paper: the cards, the deeds and the board, aged paper, the rules and folds, and the ink.
    paper: {
      card: { value: '#F5EAD0' },
      bright: { value: '#FBF4E2' },
      aged: { value: '#EADBB6' },
      stain: { value: '#E6D3AA' },
      board: { value: '#EFE2C2' },
      line: { value: '#C9B48A' },
      ink: { value: '#2B2420' },
      muted: { value: '#6B5A45' },
      soft: { value: '#9A8668' },
    },
    // Gilt: the portraits' frames, the decks' borders, the signs' lettering.
    gold: {
      deep: { value: '#A6742A' },
      base: { value: '#D8A43C' },
      light: { value: '#F7DC8E' },
      leaf: { value: '#E2B041' },
      sign: { value: '#F3DC9A' },
    },
    // The pillar-box red of the stamps, the flags and danger.
    stamp: {
      deep: { value: '#8E3029' },
      base: { value: '#C2463C' },
      hot: { value: '#D24A4A' },
      ink: { value: '#B8433A' },
    },
    // The park's lawns: a switch that's on.
    lawn: {
      deep: { value: '#3F6A2E' },
      base: { value: '#5D8A3C' },
      light: { value: '#8FAE6B' },
    },
    // The title's banner: the crimson cartouche with "Deeds" on it.
    banner: {
      base: { value: '#9B3B4E' },
      deep: { value: '#7A2E3E' },
    },
    // One colour per seat, worn as the portrait's coat and the token's tint (spec §7.1).
    player: {
      teal: { value: '#2F7F78' },
      wine: { value: '#9B3B4E' },
      mustard: { value: '#D39A2A' },
      navy: { value: '#3A4F8F' },
      moss: { value: '#5D8A3C' },
      plum: { value: '#7A4F8F' },
    },
    // The eight colour groups' bands (spec §5.1), from the board in the sketches.
    group: {
      slums: { value: '#8B5E3C' },
      chimney: { value: '#5F9BC0' },
      market: { value: '#C05A8A' },
      teatime: { value: '#EF8A32' },
      theatres: { value: '#C8372F' },
      graveyard: { value: '#E5B83A' },
      science: { value: '#4F9A52' },
      heights: { value: '#33479A' },
    },
    status: {
      online: { value: '#6FBF5A' },
    },
  },
});
