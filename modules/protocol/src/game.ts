// The game's phases, settings and limits (spec §4, §5.15).

// Only the lobby for now: the game's own phases come with the rules (spec §10.3).
export const gamePhases = ['lobby'] as const;

export type GamePhase = (typeof gamePhases)[number];

// How long a game lasts (spec D9): 30, 60 or 90 minutes, after which the richest landlord wins, or
// the classic game, played until one landlord is left.
export const gameLengths = [30, 60, 90, 'unlimited'] as const;

export type GameLength = (typeof gameLengths)[number];

// The lobby's switches (spec §5.15): auctions now (D11, on by default), the house rules later (D14).
export const gameSwitches = ['auctions'] as const;

export type GameSwitch = (typeof gameSwitches)[number];

export type GameSwitches = Record<GameSwitch, boolean>;

export interface GameSettings {
  length: GameLength;
  switches: GameSwitches;
}

// A change from someone at the table: the length, and any of the switches.
export type GameSettingsPatch = Partial<Pick<GameSettings, 'length'>> & { switches?: Partial<GameSwitches> };

export const gameLimits = {
  // 2 to 6 players (D13), people or bots: the game starts once two seats are filled (spec §4.2).
  minPlayers: 2,
  maxPlayers: 6,
} as const;

// An hour, with auctions on (D35, D11).
export const defaultGameSettings: GameSettings = {
  length: 60,
  switches: { auctions: true },
};
