import { gameLimits } from '@deeds-table/protocol';
import { makeAutoObservable } from 'mobx';
import type { Translate } from '../locale';
import type { PlayerView, RoomPresenceStore } from './presence';
import type { TableSend } from './types';

export interface RoomSeatsDeps {
  t: Translate;
  presence: RoomPresenceStore;
  send: TableSend;
  // Bots sit down and get up only in the lobby (spec §4.2).
  isLobby: () => boolean;
}

// The table's six seats (spec D13): how many are taken, and the bots in them. Whether there are
// enough players to start comes with the start button, and where each seat sits with the board.
export class RoomSeatsStore {
  readonly #deps: RoomSeatsDeps;

  constructor(deps: RoomSeatsDeps) {
    this.#deps = deps;
    makeAutoObservable(this, {}, { autoBind: true });
  }

  get taken(): number {
    return this.#deps.presence.count;
  }

  get max(): number {
    return gameLimits.maxPlayers;
  }

  get isFull(): boolean {
    return this.taken >= this.max;
  }

  get canAddBot(): boolean {
    return this.#deps.isLobby() && !this.isFull;
  }

  get canRemoveBots(): boolean {
    return this.#deps.isLobby();
  }

  get bots(): PlayerView[] {
    return this.#deps.presence.bots;
  }

  get countLabel(): string {
    return this.#deps.t('lobby.seatsTaken', { taken: this.taken, max: this.max });
  }

  addBot(): void {
    if (this.canAddBot) this.#deps.send('addBot', {});
  }

  removeBot(id: string): void {
    if (this.canRemoveBots) this.#deps.send('removeBot', { memberId: id });
  }
}
