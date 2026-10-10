import { styled } from 'styled-system/jsx';

// The lobby: a column of printed cards on each side, the same width so the board stays centred
// between them. Only the cards, the board and the controls take clicks.
export const RoomLobbyRoot = styled('div', {
  base: {
    '--side': '300px',
    position: 'absolute',
    inset: '0',
    zIndex: '2',
    display: 'grid',
    gridTemplateColumns: 'var(--side) minmax(0, 1fr) var(--side)',
    gap: '22px',
    padding: '18px',
    paddingInline: '20px',
    pointerEvents: 'none',
    xl: { '--side': '330px', gap: '30px', padding: '24px' },
  },
  variants: {
    // One column of cards on the right, the board to its left.
    compact: {
      true: { '--side': '300px', gridTemplateColumns: 'minmax(0, 1fr) var(--side)', gap: '12px', padding: '10px', paddingLeft: '68px', xl: { '--side': '320px', gap: '12px', padding: '10px', paddingLeft: '68px' } },
      false: {},
    },
  },
  defaultVariants: { compact: false },
});

export const RoomLobbySide = styled('div', {
  base: {
    display: 'flex',
    flexDirection: 'column',
    gap: '22px',
    minHeight: '0',
    marginBlock: '-10px',
    paddingBlock: '10px',
    paddingInline: '8px',
    marginInline: '-8px',
    overflowY: 'auto',
    overscrollBehavior: 'contain',
    scrollbarWidth: 'thin',
    scrollbarColor: '{colors.gold.deep} transparent',
    pointerEvents: 'auto',
    '& > section:nth-child(2)': { animationDelay: '0.08s' },
    '& > section:nth-child(3)': { animationDelay: '0.16s' },
  },
  variants: {
    side: {
      left: { gridColumn: '1', gridRow: '1' },
      right: { gridColumn: '-2 / -1', gridRow: '1' },
    },
  },
});

// The middle: the board.
export const RoomLobbyMiddle = styled('div', {
  base: { gridColumn: '2', gridRow: '1', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', minWidth: '0' },
  variants: {
    compact: {
      true: { gridColumn: '1' },
      false: {},
    },
  },
  defaultVariants: { compact: false },
});

export const RoomLobbyHint = styled('p', {
  base: { fontSize: '12.5px', fontStyle: 'italic', lineHeight: '1.4', color: 'print.muted', '@media (max-height: 540px)': { fontSize: '13.5px' } },
});

export const RoomLobbyPlayersList = styled('ul', {
  base: { display: 'grid', gap: '6px' },
});

// A seat on the list: a strip of paper with an ink rule under it, yours marked with a gilt edge.
export const RoomLobbyPlayersItemRoot = styled('li', {
  base: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    minHeight: '54px',
    paddingBlock: '7px',
    paddingLeft: '10px',
    paddingRight: '4px',
    borderRadius: '4px',
    border: '1.5px solid',
    borderColor: 'paper.line',
    bg: 'print.raised',
    animation: 'dialogIn 0.3s ease-out',
  },
  variants: {
    me: {
      true: { borderColor: 'paper.ink', boxShadow: 'inset 4px 0 0 {colors.gold.base}' },
      false: {},
    },
  },
});

export const RoomLobbyPlayersText = styled('span', {
  base: { display: 'grid', flex: '1', minWidth: '0' },
});

export const RoomLobbyPlayersName = styled('span', {
  base: { fontFamily: 'display', fontSize: '15px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' },
});

export const RoomLobbyPlayersNote = styled('span', {
  base: { fontSize: '12px', fontStyle: 'italic', color: 'print.muted' },
});

// The free seats: an empty, dashed strip that seats a bot.
export const RoomLobbyPlayersAdd = styled('button', {
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    width: '100%',
    height: '46px',
    borderRadius: '4px',
    border: '2px dashed',
    borderColor: 'print.soft',
    color: 'print.muted',
    fontWeight: '800',
    fontSize: '14px',
    cursor: 'pointer',
    transition: 'background-color 0.12s ease, color 0.12s ease, border-color 0.12s ease',
    _hover: { borderColor: 'paper.ink', color: 'paper.ink', bg: 'print.hover' },
    _focusVisible: { outline: '3px solid', outlineColor: 'accent.ring', outlineOffset: '2px' },
    '& svg': { width: '18px', height: '18px', strokeWidth: '2.5' },
  },
});

export const RoomLobbyPlayersFoot = styled('footer', {
  base: { display: 'grid', gap: '10px', paddingTop: '14px', borderTop: '2px solid', borderColor: 'paper.ink' },
});

// The switches: one that's on shows on a lawn-green tint.
export const RoomLobbyGameSwitches = styled('ul', {
  base: { display: 'grid', gap: '4px', marginInline: '-6px' },
});

export const RoomLobbyGameSwitch = styled('li', {
  base: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '4px',
    '& > :first-child': { flex: '1', minWidth: '0' },
    paddingBlock: '10px',
    paddingInline: '10px',
    borderRadius: '4px',
    border: '1.5px solid',
    borderColor: 'transparent',
    transition: 'background-color 0.15s ease, border-color 0.15s ease',
  },
  variants: {
    on: {
      true: { bg: 'rgba(93, 138, 60, 0.12)', borderColor: 'lawn.base' },
      false: {},
    },
  },
});

// The board's place between the cards: the largest square that fits.
export const RoomLobbyBoardRoot = styled('div', {
  base: { flex: '1', display: 'grid', placeItems: 'center', width: '100%', minHeight: '0', containerType: 'size' },
});

// A sheet of board paper, cut out, with a ruled border inside its edge like the board's.
export const RoomLobbyBoardSheet = styled('div', {
  base: {
    display: 'grid',
    placeItems: 'center',
    width: 'min(100cqw, 100cqh)',
    aspectRatio: '1',
    borderRadius: '4px',
    border: '2.5px solid',
    borderColor: 'paper.ink',
    bg: 'paper.board',
    bgImage: 'radial-gradient(ellipse at 30% 20%, rgba(255, 255, 255, 0.35), transparent 60%)',
    boxShadow: 'inset 0 0 0 10px {colors.paper.board}, inset 0 0 0 11.5px {colors.paper.line}, 0 18px 34px -10px rgba(0, 0, 0, 0.8), 0 4px 10px rgba(0, 0, 0, 0.4)',
    containerType: 'size',
    animation: 'dialogIn 0.35s ease-out',
  },
});

// The title on its crimson banner with notched ends and a gilt rule inside, as in the sketches.
export const RoomLobbyBoardBanner = styled('div', {
  base: {
    position: 'relative',
    display: 'grid',
    justifyItems: 'center',
    gap: '1.2cqw',
    width: '72cqw',
    paddingBlock: '4.4cqw 3.6cqw',
    bg: 'banner.base',
    clipPath: 'polygon(0 0, 100% 0, 96.5% 50%, 100% 100%, 0 100%, 3.5% 50%)',
    _before: { content: '""', position: 'absolute', inset: '1.8cqw 4.8cqw', border: '1.5px solid', borderColor: 'gold.leaf', pointerEvents: 'none' },
  },
});

export const RoomLobbyBoardSubtitle = styled('span', {
  base: { fontSize: 'max(9px, 2.3cqw)', fontWeight: '800', letterSpacing: '0.24em', textTransform: 'uppercase', color: 'gold.sign', textAlign: 'center' },
});

export const RoomLobbyBoardTitle = styled('span', {
  base: { fontFamily: 'display', fontSize: '15cqw', lineHeight: '1', color: 'paper.card' },
});
