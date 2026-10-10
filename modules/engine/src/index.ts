// Public API of the game engine: pure logic, no DOM, no Node, shared by the server, the demo table
// and the how-to-play (spec §10.3). The board, the rules, the bots and the simulations come in M1.
export { botNames, pickBotName } from './bot-names.js';
export { createRandom, randomBetween, shuffle } from './random.js';
export { applySettings, settingChanges, type SettingChange } from './settings.js';
