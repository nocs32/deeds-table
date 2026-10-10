import { defaultGameSettings, gameLengths, gameSwitches, type GameLength, type GameSettings, type GameSwitch, type GameSwitches } from '@deeds-table/protocol';
import { makeAutoObservable } from 'mobx';
import type { Translate } from '../../locale';
import type { TableSend } from '../types';

export interface RoomGameSettingsDeps {
  t: Translate;
  send: TableSend;
  // Settings change only between games (spec §5.15).
  isEditable: () => boolean;
}

// One of the game's lengths as the lobby's choice shows it: its id for the choice ('30', '60', '90'
// or 'unlimited'), and its label.
export interface LengthView {
  id: string;
  label: string;
}

// A switch as the lobby's card shows it: its name, one line saying what it does (spec D28), and
// whether it's on.
export interface SwitchView {
  name: GameSwitch;
  label: string;
  hint: string;
  on: boolean;
}

// The lobby's settings card (spec §5.15). Values come from the table; a choice or a switch shows
// at once and sends straight away, and the table confirms it with everyone. Anyone at the table may
// change them (D21).
export class RoomGameSettingsStore {
  length: GameLength = defaultGameSettings.length;
  switches: GameSwitches = { ...defaultGameSettings.switches };
  readonly #deps: RoomGameSettingsDeps;

  constructor(deps: RoomGameSettingsDeps) {
    this.#deps = deps;
    makeAutoObservable(this, {}, { autoBind: true });
  }

  get isEditable(): boolean {
    return this.#deps.isEditable();
  }

  get lengthLabel(): string {
    return this.#deps.t('lobby.length');
  }

  get lengthViews(): LengthView[] {
    return gameLengths.map((length) => ({ id: String(length), label: this.#deps.t(`lengths.${length}.short`) }));
  }

  // The picked length's id in the choice.
  get lengthId(): string {
    return String(this.length);
  }

  // What the picked length means, in one line (spec D9).
  get lengthHint(): string {
    return this.#deps.t(`lengths.${this.length}.hint`);
  }

  get switchViews(): SwitchView[] {
    const { t } = this.#deps;

    return gameSwitches.map((name) => ({ name, label: t(`switches.${name}.name`), hint: t(`switches.${name}.hint`), on: this.switches[name] }));
  }

  receive(settings: GameSettings): void {
    this.length = settings.length;
    this.switches = settings.switches;
  }

  // Shows the new length at once; the table confirms it with everyone.
  chooseLength(id: string | null): void {
    const length = gameLengths.find((candidate) => String(candidate) === id);

    if (length === undefined || length === this.length) return;

    this.length = length;
    this.#deps.send('updateSettings', { length });
  }

  setSwitch(name: GameSwitch, on: boolean): void {
    const patch: Partial<GameSwitches> = {};

    patch[name] = on;
    this.switches = { ...this.switches, ...patch };
    this.#deps.send('updateSettings', { switches: patch });
  }
}
