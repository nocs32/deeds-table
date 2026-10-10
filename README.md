# Deeds

[![CI](https://github.com/nocs32/deeds-table/actions/workflows/ci.yml/badge.svg)](https://github.com/nocs32/deeds-table/actions/workflows/ci.yml)

A property-trading board game you play with friends in the browser, set in Drizzleton, a busy and slightly damp Victorian city drawn as a paper theatre.

- **Roll and buy:** hop round the 40 squares of Drizzleton and buy the streets you land on, from Puddle Lane to the Grand Glasshouse. Streets nobody buys go to auction.
- **Rent:** land on someone else's street and pay them. Own a whole colour group and the rent doubles; then move tenants in (a lodger, two lodgers, a family, a full house, a grand hotel) and it shoots up. Now and then a ghost or a vampire moves in instead.
- **Trade by letter:** offer streets and money in a Victorian letter, sealed and sent to another player, who accepts, declines or writes back.
- **Go bankrupt:** run out of money and you're out, a ghost in your own portrait frame. The game ends when the clock runs out (30, 60 or 90 minutes, and the richest landlord wins) or, in the classic unlimited game, when one landlord is left. Then The Daily Drizzle prints the front page.
- **Bots with personalities** fill empty seats, write letters in character and pull faces.
- **No accounts, no leftovers:** share the table link to play, in English or Ukrainian, on a computer or a phone. A table disappears about 10 minutes after the last person leaves.

It's a sibling of [Felt Table](https://github.com/nocs32/felt-table-jigsaw), the multiplayer jigsaw, [Scribble Table](https://github.com/nocs32/scribble-table), the drawing-and-guessing game, [Telephone Table](https://github.com/nocs32/telephone-table), the telephone drawing game, [Wild Table](https://github.com/nocs32/wild-table), the card game on a 3D table, and [Bluff Table](https://github.com/nocs32/bluff-table), the bluffing game in a saloon, and shares their stack and rules. It's our own game: the classic rules of property trading, with our own city, names, prices, cards and art.

> **Status:** the setup (M0). Tables open by link at live tables and at the demo table: who's at the table, bots in the lobby, the game's settings (its length and auctions), the chat and reactions, in English and Ukrainian, on computers and phones held sideways. The board, the portraits and the game itself come next (M1), then the living city in the middle of the board, the server's side of the rules, CI and hosting.

## Stack

| Part | Tech |
|---|---|
| Web (`modules/web`) | React 19, TypeScript, Vite, Panda CSS, MobX, Ark UI, i18next; the board drawn in SVG by code, and React Three Fiber for the 3D dice |
| API (`modules/core-api`) | Node.js, Express 5 and Colyseus 0.18 (run with `tsx`) |
| Shared | `modules/protocol` (the contract between the two) and `modules/engine` (pure game logic) |
| Tooling | pnpm workspaces, ESLint 10 + typescript-eslint, TypeScript 6.0 |

The server runs the game: it rolls the dice, shuffles the cards and checks every move. Almost everything at the table is public, but a letter's offer and note go only to the two players writing them. Tables live in the server's memory only, so there is no database.

## Getting started

**Requirements:** Node.js 24 (see `.nvmrc`) and pnpm 11+.

```bash
pnpm install
pnpm dev
```

`pnpm dev` starts both apps:

| App | URL |
|---|---|
| Web | http://localhost:5178 |
| API | http://localhost:2572 — the web dev server forwards `/api/*`, and `/live` for tables, to it |

Open the web URL to get a table, then share its link: everyone who opens it sits down at the same table. To try it alone, open the link in a few browser tabs.

`pnpm demo` runs the web app alone against a demo table in the browser, with no API: three sample players sit down with you and a fourth joins a little later. The **Demo** buttons in the top bar add or remove a sample player.

Saving a file in `modules/core-api` restarts the API, which clears every table: open a new one afterwards.

The ports sit one above Bluff Table's (5177 and 2571), and above the other siblings', so all six games can run at the same time.

## Scripts

| Command | What it does |
|---|---|
| `pnpm dev` | Runs the web app and the API with hot reload |
| `pnpm demo` | Runs the web app alone against the demo table (sample players, no server), for working on the UI |
| `pnpm lint` | Lints every module; `pnpm lint --fix` fixes spacing automatically |
| `pnpm typecheck` | Type-checks every module |
| `pnpm test` | Runs the engine and core-api tests; one module: `pnpm --filter @deeds-table/core-api test` |
| `pnpm build` | Builds the web app for production |
| `pnpm preview` | Builds, then serves the production build on http://127.0.0.1:4178 with the API, to check it before it goes live |

**CI:** GitHub Actions (`.github/workflows/ci.yml`) runs lint, typecheck, test and build on every pull request and every push to `main`.

## Hosting

Deeds will be hosted with its siblings on a Raspberry Pi, through [Tables Host](https://github.com/nocs32/tables-host): one Docker container per game behind Caddy and a single Cloudflare Tunnel, at **deeds.timnox.dev** (from M4). The Pi builds the game straight from this repository's `main`, so this repo needs no deployment files of its own.

## Project layout

```
modules/
├─ web/          React frontend
├─ core-api/     Express + Colyseus backend
├─ protocol/     shared contract: messages, events, error codes
└─ engine/       pure game logic, shared by both apps
eslint.config.mjs   house lint rules
eslint-rules/       custom lint rules used by the config
```

## Conventions

**Code style** (enforced by `pnpm lint`):
- **Size:** at most 40 lines per function (components included) and 300 lines per file.
- **Nested functions:** inside a function, only arrow functions.
- **Names:** camelCase. PascalCase only for React components and for types and classes.
- **Return types:** every function that returns a value declares its return type.
- **Blank lines:** one before and after every code block.

**Web**
- **Component names follow their parent:** `Room` → `RoomLobby` → `RoomLobbyGame`.
- **One component per `.tsx` file.** Components only render.
  - Logic lives in custom hooks and small MobX stores, which are modelled as state machines.
  - Styles live in `styled-components.ts` files written with Panda CSS.
- **Everything is drawn by code:** the board, the city, the portraits, the deeds, the letters and the newspaper. No downloaded art.
- **All UI text is translated** into English and Ukrainian. What players write is shown as typed, in whatever language they wrote it.

**API**
- **Thin handlers:** they validate, call one service, and respond.
- **Logic** lives in small state-machine classes.
- **The server decides:** browsers send intents (roll, buy, bid, send a letter) and never results.

**Sounds** are CC0 recordings from [Freesound](https://freesound.org), credited in `modules/web/src/assets/sounds/credits.md`. The music box is off by default.

**TypeScript** stays on **6.0** until typescript-eslint supports TypeScript 7.

## Environment variables

| Variable | Used by | Default |
|---|---|---|
| `CORE_API_PORT` | core-api | `2572` |
