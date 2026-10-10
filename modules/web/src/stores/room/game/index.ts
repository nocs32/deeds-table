import type { GamePhase, GameSnapshot } from '@deeds-table/protocol';
import { makeAutoObservable } from 'mobx';
import type { Translate } from '../../locale';
import type { TableSend } from '../types';
import { RoomGameSettingsStore } from './settings';

export interface RoomGameDeps {
  t: Translate;
  send: TableSend;
}

// The game as you see it: its phase (the state) and the settings. Only the lobby for now: the
// turns, the dice, buying, rent, letters and the newspaper come with the rules (spec §12, M1). The
// table runs the game; this only shows it and asks.
export class RoomGameStore {
  state: GamePhase = 'lobby';
  readonly settings: RoomGameSettingsStore;

  constructor(deps: RoomGameDeps) {
    this.settings = new RoomGameSettingsStore({ t: deps.t, send: deps.send, isEditable: () => this.state === 'lobby' });
    makeAutoObservable(this, {}, { autoBind: true });
  }

  get isLobby(): boolean {
    return this.state === 'lobby';
  }

  receive(game: GameSnapshot): void {
    this.state = game.phase;
    this.settings.receive(game.settings);
  }
}
