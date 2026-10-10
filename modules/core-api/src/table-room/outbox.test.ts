import { defaultGameSettings, type GameLength, type TableEvents } from '@deeds-table/protocol';
import { expect, test } from 'vitest';
import { TableRoomFeed } from './feed.js';
import { TableRoomOutbox } from './outbox.js';
import type { TableRoomView } from './view.js';

interface Sent {
  to: string;
  type: keyof TableEvents;
  message: unknown;
}

interface Harness {
  outbox: TableRoomOutbox;
  feed: TableRoomFeed;
  sent: Sent[];
  state: { length: GameLength };
}

const ana = { id: 'a', name: 'Ana', color: 'teal' } as const;

const createOutbox = (): Harness => {
  const sent: Sent[] = [];
  const state: Harness['state'] = { length: 60 };
  let lines = 0;
  const feed = new TableRoomFeed({ now: () => 0, createId: () => `line-${++lines}`, maxItems: 50 });

  const outbox = new TableRoomOutbox({
    feed,
    view: () => ({ members: [], game: { phase: 'lobby', settings: { ...defaultGameSettings, length: state.length } } }) satisfies TableRoomView,
    now: () => 0,
    send: (to, type, message) => sent.push({ to, type, message }),
  });

  return { outbox, feed, sent, state };
};

const kinds = (sent: readonly Sent[]): Array<{ to: string; type: string }> => sent.map(({ to, type }) => ({ to, type }));

test('sync sends one browser everything it may see', () => {
  const { outbox, sent } = createOutbox();

  outbox.sync('a');

  expect(kinds(sent)).toEqual([
    { to: 'a', type: 'view' },
    { to: 'a', type: 'feed' },
  ]);
});

test('nothing goes to a browser before it syncs; then its view only when it changed, and new feed lines', () => {
  const { outbox, feed, sent, state } = createOutbox();

  outbox.flush();
  expect(sent).toEqual([]);

  outbox.sync('a');
  outbox.flush();
  expect(kinds(sent)).toHaveLength(2);

  sent.length = 0;
  feed.message(ana, 'hello');
  state.length = 'unlimited';
  outbox.flush();

  expect(kinds(sent)).toEqual([
    { to: 'a', type: 'view' },
    { to: 'a', type: 'feed' },
  ]);
});

test('nothing personal goes out after forget', () => {
  const { outbox, feed, sent } = createOutbox();

  outbox.sync('a');
  outbox.flush();
  outbox.forget('a');
  sent.length = 0;
  feed.message(ana, 'anyone there?');
  outbox.flush();

  expect(sent).toEqual([]);
});
