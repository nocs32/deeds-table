---
paths:
  - "modules/core-api/**"
---

# Core API rules (`modules/core-api`)

Node + Express 5 for HTTP, and Colyseus 0.18 for the live multiplayer rooms. These rules come on top of the lint rules in `eslint.config.mjs` and follow the same ideas as the web rules: thin edges, small named units, and logic in small state machines.

**Colyseus specifics:**
- One process serves both: `new Server({ transport: new WebSocketTransport(), express: (app) => … })` in `src/index.ts`. Colyseus answers `/matchmake/*` and the WebSocket upgrades; everything else falls through to Express. No Redis (one process).
- Room classes extend Colyseus `Room<{ client }>`. Class fields like `maxClients` and `autoDispose` are fine (Colyseus re-installs its accessors in `__init`).
- **No Schema state** (spec D29, §10.4). The room sends each person their own messages, through `TableRoomOutbox` (the shapes are `TableEvents` in the protocol): `view` (the table as that person sees it, sent when it changed) and `feed`; `reaction` and `error` go straight out. With the game come the events everyone sees (`rolled`, `moved`, `bought`, `rent`…) and each person's own part of the view. Messages arrive in order, which state patches don't promise. A browser gets nothing until it sends `sync`.
- **Almost everything is public, but letters aren't:** an open letter's offer and its note go only to its two players, and the note never to anyone else, even once accepted (D29). The decks' order and the next dice are never sent. With M2, a room test records every message each player and a spectator get and checks it (spec §11), as Bluff Table's `no-peeking.test.ts` does.
- Message handlers follow rule 3 through the room's `#on(type, handle)`: valibot schema from the protocol, then the rate limit, then one call. Don't pass a schema to Colyseus's own `onMessage`/`validate`: a failed check there disconnects the sender. Refusals go back as an `error` event (`{ code }`).
- Join options are checked in `onJoin`; a refused join throws `ServerError` with the typed code as its message.
- Tests: unit tests per part (`*.test.ts` next to it) and room tests through a real server with `@colyseus/testing`: the lobby (`index.test.ts`, port 2596), and with the game the letters' privacy check (port 2597). Run `pnpm --filter @deeds-table/core-api test`.

## 1. Names follow the owner
A unit that belongs to another starts with its owner's name:
- `TableRoom` → `TableRoomGame` → `TableRoomGameClock`
- `TableRoom` → `TableRoomLetters`

Shared building blocks are named for what they are: `logger`, `limits`.

## 2. One unit per file
- One class, one router or one handler group per file.
- Files and folders are kebab-case, named after what they hold: `table-room-letters.ts` (`TableRoomLetters`), `health-router.ts` (`healthRouter`). The lint rule `local/kebab-case-filenames` enforces it.
- A unit with sub-units becomes a folder: `index.ts` holds the main unit, and each sub-unit gets a short-named file next to it (`table-room/index.ts`, `table-room/letters.ts`).

## 3. Edges are thin
This is the backend version of "components only render". Express route handlers and live message handlers do exactly three things:
1. Validate the input with the shared schema.
2. Call **one** method on a service or room class.
3. Send the result, or a typed error.

No game rules, storage or calculations inside handlers.

## 4. Logic lives in small state-machine classes
- **Composed rooms** (spec §10.3). A room is built from small classes, each owning one concern: the game (`TableRoomGame`: today the lobby and its settings; with M2 its seats, turns, the turn clock and the game clock), the letters (`TableRoomLetters`, open letters and their private notes), the bots (`TableRoomBots`), members, feed/chat, lifecycle (the 10-minute empty timer), rate limits, the outbox. `TableRoom` only wires them together.
- **Explicit states.** Each class has a fixed set of states:
  - room lifecycle: `'active' | 'emptyGrace' | 'closed'`;
  - the game: `lobby → game → game end → (Play again) lobby`; within a turn, `roll → move → square → free actions → end`, with an auction, a debt or the Debtors' Prison in between.
- **Transitions** are methods named after events: `join`, `leave`, `start`, `roll`, `buy`, `bid`, `send`, `accept`, `expire`. An invalid transition is rejected with a typed error code.
- **Pure game logic** (the board and prices, dice and movement, every square's effect, the decks, rent, tenants and mortgages, auctions, letters' checks and swaps, debt and bankruptcy, net worth and both endings, the bots' choices) lives in the shared engine module and has no I/O.
- **Tests.** Each state-machine class has unit tests for its transitions, including the rejected ones.

## 5. The server decides; clients only ask
- **Intents, not results.** Clients send intents such as `roll` or `buy`, and the server works out the result: it rolls the dice and shuffles the cards (D29). Never accept a finished result from a client, like "I rolled a double" or "the rent was £10".
- **Validate everything.** Check every message and request body against its schema:
  - reject unknown fields;
  - clamp numbers to sane ranges;
  - check the sender is allowed (only the player whose turn it is rolls, buys or ends the turn; a deed offered in a letter must be the sender's own; only the bidders still in an auction bid).
- **Limits in one place.** Rate limits and size caps are constants in a single `limits.ts` (spec §10.5).

## 6. Every piece of memory has an owner
- **No database.** Tables, decks, deeds and letters live in memory.
- **Cleanup.** Every `Map`, timer and interval belongs to a class that clears it in `dispose()`.
- **No module-level mutable state**, except the composition root (`src/index.ts`), which creates the long-lived instances.

## 7. Config, errors and logs
- **Config:** environment variables are read and validated once in `src/config.ts`. Nothing else reads `process.env`.
- **Errors:** use typed error codes shared with the web app, like `'WRONG_PHASE'` or `'RATE_LIMITED'`. Never use raw strings.
- **Logs:** log through `src/logger.ts` with context such as `roomId` and `sessionId`. No `console.log` anywhere else. Never log a letter's note, the decks' order or the next dice.

## 8. One shared contract
- Intent schemas, server events, error codes and name rules live in `@deeds-table/protocol`. Both apps import them. Never redefine them in core-api.
- Changing an intent's or an event's shape bumps `tableProtocolVersion`.

## Folder example
```
src/
├─ index.ts                 composition root: config, logger, Express, Colyseus, listen
├─ config.ts
├─ logger.ts
├─ limits.ts
├─ errors/                  ApiErrorException, errorMiddleware, notFoundMiddleware
├─ health/index.ts          healthRouter (/api/health)
└─ table-room/
   ├─ index.ts              TableRoom: wires the parts to Colyseus
   ├─ members.ts            TableRoomMembers (+ member-names.ts: the names it hands out)
   ├─ feed.ts               TableRoomFeed
   ├─ game.ts               TableRoomGame: the lobby and its settings (a folder with M2: seats, turns, clocks)
   ├─ bots.ts               TableRoomBots: lobby seats (with M2: playing them, standing in)
   ├─ view.ts               the shared view (each person's own part is added in the outbox)
   ├─ outbox.ts             TableRoomOutbox (what each person is sent, and when)
   ├─ rate-limits.ts        TableRoomRateLimits
   ├─ lifecycle.ts          TableRoomLifecycle
   ├─ error.ts              TableRoomError (a typed refusal)
   └─ *.test.ts             (test-table.ts: the parts together; test-room.ts: a real room;
                             index.test.ts the lobby on 2596)
```
