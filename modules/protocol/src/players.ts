// The player palette, one colour per seat (spec D13): the six dyes of the look sketches, worn as the
// portrait's coat and the token's tint (spec §7.1). The server gives each newcomer a colour nobody
// at the table has yet.
export const playerColors = ['teal', 'wine', 'mustard', 'navy', 'moss', 'plum'] as const;

export type PlayerColor = (typeof playerColors)[number];

export const isPlayerColor = (value: string): value is PlayerColor => (playerColors as readonly string[]).includes(value);

export const personNameMaxLength = 32;

// A name as the table keeps it: single spaces, no spaces at the ends, at most 32 characters.
// An empty result means the name is rejected.
export const cleanPersonName = (text: string): string => text.replace(/\s+/gu, ' ').trim().slice(0, personNameMaxLength).trim();
