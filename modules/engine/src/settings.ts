// The table's settings (spec §5.15): a change from anyone at the table (D21).
import { gameLengths, gameSwitches, type GameLength, type GameSettings, type GameSettingsPatch, type GameSwitch } from '@deeds-table/protocol';

const isGameLength = (value: unknown): value is GameLength => (gameLengths as readonly unknown[]).includes(value);

export const applySettings = (current: GameSettings, patch: GameSettingsPatch): GameSettings => ({
  length: isGameLength(patch.length) ? patch.length : current.length,
  switches: { ...current.switches, ...patch.switches },
});

// One change, as the feed line that announces it.
export type SettingChange = { type: 'length'; length: GameLength } | { type: 'switch'; name: GameSwitch; on: boolean };

// What differs, in a fixed order: the length, then the switches (one feed line each).
export const settingChanges = (before: GameSettings, after: GameSettings): SettingChange[] => [
  ...(before.length === after.length ? [] : [{ type: 'length', length: after.length } satisfies SettingChange]),
  ...gameSwitches.filter((name) => before.switches[name] !== after.switches[name]).map((name): SettingChange => ({ type: 'switch', name, on: after.switches[name] })),
];
