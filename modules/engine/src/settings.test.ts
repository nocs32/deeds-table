import { defaultGameSettings } from '@deeds-table/protocol';
import { expect, test } from 'vitest';
import { pickBotName } from './bot-names.js';
import { applySettings, settingChanges } from './settings.js';

test('the game starts at an hour, with auctions on', () => {
  expect(defaultGameSettings).toEqual({ length: 60, switches: { auctions: true } });
});

test('a patch changes only what it names, switches included', () => {
  expect(applySettings(defaultGameSettings, { length: 'unlimited' })).toEqual({ ...defaultGameSettings, length: 'unlimited' });
  expect(applySettings(defaultGameSettings, {})).toEqual(defaultGameSettings);
  expect(applySettings(defaultGameSettings, { switches: { auctions: false } }).switches).toEqual({ auctions: false });
});

test('a length that is not one of the four is ignored', () => {
  expect(applySettings(defaultGameSettings, { length: 45 as never }).length).toBe(60);
});

test('changes are listed in a fixed order: the length, then the switches', () => {
  const after = applySettings(defaultGameSettings, { switches: { auctions: false }, length: 30 });

  expect(settingChanges(defaultGameSettings, after)).toEqual([
    { type: 'length', length: 30 },
    { type: 'switch', name: 'auctions', on: false },
  ]);

  expect(settingChanges(after, after)).toEqual([]);
});

test('bots get the first free name, then a numbered one', () => {
  expect(pickBotName(new Set())).toBe('Lord Pennypinch');
  expect(pickBotName(new Set(['Lord Pennypinch', 'Lady Prunella']))).toBe('Count Bartholomew');

  const everyone = new Set(['Lord Pennypinch', 'Lady Prunella', 'Count Bartholomew', 'Mr Grimsby', 'Miss Featherwick', 'Sir Reginald Fogg', 'Lord Pennypinch 2']);

  expect(pickBotName(everyone)).toBe('Lord Pennypinch 3');
});
