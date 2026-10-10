import type { TableEvents } from '@deeds-table/protocol';
import type { TableRoomFeed } from './feed.js';
import type { TableRoomView } from './view.js';

type TableRoomOutboxSend = <K extends keyof TableEvents>(memberId: string, type: K, message: TableEvents[K]) => void;

export interface TableRoomOutboxDeps {
  feed: TableRoomFeed;
  // The shared part of the table, the same for everyone.
  view: () => TableRoomView;
  now: () => number;
  send: TableRoomOutboxSend;
}

// What one browser has been sent so far.
interface TableRoomOutboxSeen {
  feedSeq: number;
  view: string;
}

// What goes out after every change (spec §10.4), to each browser that has asked with `sync` (so
// it's listening by then): its view when it changed, then the feed lines it hasn't had. Each
// browser gets its own copy, so the letters' private parts can join it later: an open letter goes
// only to its two players (D29).
export class TableRoomOutbox {
  readonly #seen = new Map<string, TableRoomOutboxSeen>();
  readonly #deps: TableRoomOutboxDeps;

  constructor(deps: TableRoomOutboxDeps) {
    this.#deps = deps;
  }

  // Everything again, for a browser that just joined or reconnected: the table and the chat.
  sync(memberId: string): void {
    const { feed, send } = this.#deps;
    const view = this.#deps.view();

    send(memberId, 'view', { now: this.#deps.now(), ...view });
    send(memberId, 'feed', { reset: true, items: feed.items });
    this.#seen.set(memberId, { feedSeq: feed.seq, view: JSON.stringify(view) });
  }

  // Their connection dropped or they left: nothing personal until they sync again.
  forget(memberId: string): void {
    this.#seen.delete(memberId);
  }

  flush(): void {
    const shared = this.#deps.view();

    this.#seen.forEach((seen, memberId) => this.#flushTo(memberId, seen, shared));
  }

  dispose(): void {
    this.#seen.clear();
  }

  #flushTo(memberId: string, seen: TableRoomOutboxSeen, view: TableRoomView): void {
    const { feed, send } = this.#deps;
    const text = JSON.stringify(view);
    const items = feed.since(seen.feedSeq);

    if (text !== seen.view) send(memberId, 'view', { now: this.#deps.now(), ...view });

    if (items.length > 0) send(memberId, 'feed', { reset: false, items });

    this.#seen.set(memberId, { feedSeq: feed.seq, view: text });
  }
}
