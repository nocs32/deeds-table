# Deeds

A property-trading board game in the spirit of Monopoly, but our own (spec D1, D3), set in **Drizzleton**, a busy, slightly damp Victorian city drawn as a paper theatre by day:
- share a table by URL, add bots if you're short, roll, buy streets, rent rooms to lodgers, trade by letter, go bankrupt, and read about it in **The Daily Drizzle**;
- the board is a flat illustrated paper theatre with 3D dice rolling across it (D8), and the city in its middle is alive (D41). The table is thrown away about 10 minutes after everyone leaves.

It's the sixth sibling of Felt Table (`../felt-table-jigsaw`), Scribble Table (`../drawing-game`), Telephone Table (`../telephone-table`), Wild Table (`../wild-table`) and Bluff Table (`../bluff-table`): same stack, same house rules, same way of working. It's its own project, copied from Bluff Table (spec D7, §10.1): fixes to shared parts get copied between the projects by hand. The full spec is in `.scratch/SPEC.md`. Read §0 "Decisions so far" before planning any feature: *Decided* items are settled, *Proposed* ones wait for the user's yes.

The look is set (D40): `.scratch/look-sketches.html`, also the private artifact https://claude.ai/artifact/LdvLoF1s7dqHC5HHNiNWNC (`.scratch/look-sketches-v1.html` and `-v2.html` are the earlier rounds). **Port its drawing code** rather than starting over: `person()`, `house()`, `win()`, `shop()`, the scene boxes, all 40 squares and the corners (`BOARD`, `boardSquare()`, `fullBoard()`), the city in the middle (`cityByDay()`, `boardCentre()`), the portraits (`portrait()`, `CAST`), the deed card, the letter, the tenants and the newspaper. Its palette and fonts are already the design tokens (`modules/web/panda/tokens.ts`).

## How we work
Setup commit first (M0, done), then each phase gets its own branch and PR (spec D33, §12). Stop for the user's review before each PR, and ask before merging.
1. **Web UI** (`feat/web-ui`), on local MobX stores against the demo table. **It opens with the board, the portraits and the lobby** (spec §9.1), reviewed together before the rest is built. The **phone layout** (the user leans landscape, like the siblings, §9.7) and the **portrait builder** (§7.1) are designed here, and the UI gets its polish here too. Then turns and the dice, buying and auctions, rent, tenants, mortgages, letters, the Debtors' Prison, the cards, debt and bankruptcy, both endings and the newspaper, the bots (§6.1, layers 1–2), the how-to-play, English and Ukrainian.
2. **The living city** (`feat/living-city`): the centre scene as layers, and everything in §8.1. Reviewed on its own: it's the showpiece (D41, D42).
3. **Backend, and connecting the UI to it** (`feat/live-tables`): the rules on the server, private letters, bots at live tables (layer 3).
4. **CI** (`feat/ci`). The workflow (`.github/workflows/ci.yml`) came with the setup commit: lint, typecheck, the engine and core-api tests, and the production build, on every PR and push to `main`.
5. **Hosting** (in `../tables-host`): a `deeds` service, a Caddy site, the tunnel's route for **deeds.timnox.dev**, and a card in the library page (D32).

**The budget is about 3 days, not the siblings' ~6 hours** (D42). Go big on five areas: **animations, sounds, simulations** (the living city and the engine's bot games), **UI and graphics**. Plan the milestones for it.

**Verify end to end in the built-in browser.** Mute the game's sounds in test tabs (`deedsTable.sound.setOn(false)` from the console), and shut down any headless browser you launch. Check every screen on a phone held sideways (812 × 375); after changing the emulated size, reload the tab so the layout watcher sees it.

**Every feature explains itself on screen** (spec D28). People join by link mid-evening and never read docs: every square says what it does when you point at it, buttons say what they cost ("Buy Raven Row for £260, you'll have £740 left"), every setting and rule has one line on screen where it's used, and the how-to-play is one click away (D26). Check it in every UI review.

**Never use Monopoly's name, board, street names, card texts, art or mascot, and no "-opoly" names** (spec D3), in either language, in the UI, the how-to-play or the README. No real brands either. The rules themselves are free to use; prices and texts are written fresh.

**Goofy and light** (D4, D38). Drizzleton is an ordinary, busy, slightly damp Victorian city; ghosts and vampires are rare surprises, not the theme. **Tenants are people** (D39): a lodger, two lodgers, a family, a full house, a grand hotel; now and then a ghost or a vampire moves in instead (looks only, same rent).

**Monocles** (D25): a monocle is always available on any portrait, as its own switch that never takes the accessory slot.

**No host** (D21): everyone changes the settings, anyone presses start, no roles. **Private link tables only** (D20).

**English and Ukrainian** (D15): Drizzleton is **Мрякоград**, the newspaper **«Щоденна мряка»** (D5). Jokes, card texts and street names get proper Ukrainian puns, written with the user, never literal translations. Money is pounds, £ (D30, Proposed).

**UI:** nothing tilted, everything straight and consistent. A slight perspective on the board itself is a separate question, checked on the board (§8).

**Sounds:** real CC0 recordings from Freesound, credited, never synthesized. The music box (D22) is off by default.

**Infrastructure in plain words:** the user is new to backends (and knows Docker and tooling), so explain servers, tunnels and networking plainly.

## Scribble Table's word lists stay secret
The user plays Scribble Table, so knowing its words would spoil it. Nothing in this game is secret from the user, and Deeds has no word lists, but one rule guards the sibling's: **never open, decode or print** `../drawing-game/modules/core-api/src/words/word-list.b64`, and never show a word from it anywhere.

## Layout
- `modules/web`: frontend. Vite + React 19 + TypeScript, Panda CSS, MobX, Ark UI, i18next (English and Ukrainian). React Three Fiber, drei and three stay in the dependencies **for the dice only** (spec §10.2): the board, the portraits, the deeds, the letters and the newspaper are SVG drawn by code (`src/art`, from M1).
  - **Today (M0)** the room is the lobby without a game: the top bar (the Deeds mark, the table's link, who's here, sound, language, Share), "At the table" (`features/room/lobby`: everyone's initial in their seat colour, add or send away a bot, copy the invite link), "The game" (the game length as a choice of 30 / 60 / 90 minutes or Unlimited, and the auctions switch, each with its line), a sheet of board paper with the title banner where the board goes, the floating chat, the reactions dock, and phones held sideways.
  - **The design tokens** (`panda/tokens.ts`) are the sketches': the fog round the board, paper and ink, gilt, the pillar-box red stamp, the lawn green, the title's crimson banner, the six seat dyes (teal, wine, mustard, navy, moss, plum) and the eight group colours. Two families of surfaces: the room (fog, gilt trim) and printed matter (paper with an ink edge, cut out like a paper theatre's pieces, `shadows.cutout`). Fonts (D40): **Yeseva One** for names and prices (one weight: `fontSynthesis: none` keeps it from a fake bold), **Alegreya Sans** for everything you read, **Caveat** for handwriting; all three cover Cyrillic.
  - The settings card's length choice is `ui/setting/choice.tsx` (Ark's SegmentGroup), beside the slider and the switch.
- `modules/core-api`: backend. Node + Express 5 + Colyseus 0.18 (live tables), one process on :2572. `table-room/` wires the parts: members, the feed, rate limits, the lifecycle, the bots' seats in the lobby, the game (`game.ts`: the lobby and its settings for now), and the outbox (after every change, each synced browser gets its own `view`, then new feed lines; each browser has its own copy so the letters' private parts can join it, D29).
- `modules/protocol`: the shared contract. Intent schemas, server events, error codes, the settings (`game.ts`: `gameLengths`, `gameSwitches`, `defaultGameSettings`).
- `modules/engine`: pure game logic, shared by both apps (spec §10.3). Today the seeded random generator, the settings, and the bots' names (the agreed cast, D35). The board and prices, dice, rent, tenants, mortgages, auctions, letters, debt and bankruptcy, both endings, the bots and the simulations come in M1.
- `eslint.config.mjs` + `eslint-rules/`: the house lint rules for every module.
- `.scratch/`: the kickoff, the spec, the sketches and notes, ignored by git.

## Still in Bluff Table, to bring over when the game needs it
M0 kept only what works without a game, as Bluff Table's own M0 did. Still in `../bluff-table` (spec §10.1):
- core-api: the clock (`table-room/game/clock.ts`, one deadline at a time), the seats with their holders and stand-ins (`game/seats.ts`: a bot after two timeouts in a row or a dropped connection), the match and its pace (`game/match.ts`), bots playing seats and standing in (`bots.ts`'s `drive`, `standInWaitMs`), the hand-moved test clock (`test-table.ts`'s `createTestTimers`) and the no-peeking room test (`no-peeking.test.ts`: the pattern for letters' privacy).
- engine: the simulations harness (`game/simulate.ts`), the thinking bot's personalities (`bots.ts`), the rule book's worked examples (`examples.ts`).
- web: the character builder's pattern (`stores/room/character.ts`: parts lists, presets, a random roll, the colour picker and `dress`), the faces' pattern (`stores/room/game/moods.ts`: moods set by events plus the wheel), the turn's stamp, chime and fuse (`stores/room/game/index.ts`, `turn.ts`), captions, the end-of-game summary, the rule book (`stores/rule-book`, `features/room/rule-book`: tabs, one scroll, worked examples, Try it), the notice line (`stores/ui/notice.ts`), springs (`utils/spring.ts`), the frame-rate watch and lighter graphics (`stores/graphics.ts`, for the living city on phones), and the Lucide icons dropped here (book, dices, help, bot, users, chevrons).

## Rules: read them before writing code
- **Before** creating or editing anything in `modules/web/**`, read `.claude/rules/web.md` and follow it.
- **Before** creating or editing anything in `modules/core-api/**`, read `.claude/rules/core-api.md` and follow it.
- These rules load automatically only once a matching file is opened. Read them first anyway, especially when creating new files.
- **Before calling a change done,** run `pnpm lint` and `pnpm typecheck` and fix what they report. Don't disable rules or add `eslint-disable` comments without asking.

**House lint rules** (enforced everywhere):
- **Size:** at most 40 lines per function (components included) and 300 lines per file. Blank lines and comments don't count.
- **Nested functions:** inside a function, only arrow functions. No nested `function` declarations or expressions, and no object or class methods.
- **Names:** camelCase for everything. PascalCase only for React components (which must render JSX) and for types and classes.
- **Return types:** required on every function that returns a value. Lambdas passed as arguments or JSX props are exempt.
- **Blank lines:** exactly one before and after every code block (functions, if, loops, switch, try, multi-line statements). `pnpm lint --fix` adds them.

## Commands
```bash
pnpm install
pnpm dev           # web on http://localhost:5178 + core-api on :2572 (Vite forwards /api, and /live for tables)
pnpm lint          # add --fix to auto-fix spacing
pnpm typecheck
pnpm test          # engine + core-api; one module: pnpm --filter @deeds-table/core-api test
pnpm demo          # web only, against the demo table (no server): for UI work
pnpm build         # production web build (CI runs lint, typecheck, test, build on every PR and push to main)
pnpm preview       # build, then serve it on 127.0.0.1:4178 with core-api, to check the production build
```

## Gotchas
- **Ports are 5178, 2572 and 4178** (web, core-api, preview), one above Bluff Table's (5177, 2571, 4177), so all six games can run at once. All are `strictPort`: a taken port fails loudly instead of moving. The room tests use 2596 (the lobby) and, with the game, 2597; the siblings' use 2591–2595.
- **Never stop the siblings' processes.** When a port is busy, check which project owns the process before touching it.
- **Hosting is the user's Raspberry Pi**, through `../tables-host` (D32): Docker, one container per game (its `game.Dockerfile` builds any sibling: the `modules/web`, `core-api`, `protocol`, `engine` layout, the `@deeds-table/*` scope, core-api's `src/index.ts` run with tsx on `CORE_API_PORT`), Caddy in front, one Cloudflare Tunnel. Keep that layout. The Pi is `ssh pi` by key: **ask before touching the Pi, DNS or the tunnel.** M4 adds the `deeds` service and **deeds.timnox.dev**. There's no `pnpm play` and no per-game tunnel here.
- **No payment card on any service.**
- **TypeScript is pinned to 6.0.** typescript-eslint doesn't support TypeScript 7 yet. Don't upgrade it.
- **pnpm workspaces:** the packages are listed in `pnpm-workspace.yaml`. Add a dependency with `pnpm --filter @deeds-table/<module> add <pkg>`.
- **pnpm's release-age guard:** pnpm refuses versions published in the last day. Pick the previous version instead of adding exceptions.
- **No shared Colyseus state** (spec §10.4): the room sends each person their own messages through the outbox. Almost everything is public, but an open letter's offer and note go only to its two players (D29), and the decks' order and the next dice are never sent. After joining or reconnecting, the browser asks for everything with `sync`.
- **The demo table**: `services/demo-table` plays the server's part in the browser, with sample players who sit down and say hello. `pnpm dev` plays at live tables on core-api (`services/live-table`, behind the same `TableClientService`); `pnpm demo` plays at the demo table. The top bar's **Demo** buttons add or remove a sample player.
- **Live tables live in core-api's memory:** `tsx watch` restarts core-api when you save a file there, and every table is gone. Open a new one. To play a live table alone, open its link in several tabs: each tab is its own person (its seat is kept in sessionStorage, so a reload gets it back).
- **A dropped connection** keeps its seat for 20 seconds (`limits.ts`).
- **The protocol version** (`tableProtocolVersion` in `protocol/src/table-messages.ts`) goes up whenever an intent or an event changes shape: an older tab is asked to reload.
- **Phones held sideways are "compact"** (`ui.layout`, under 900 px wide or 540 px tall): the lobby's cards share one column on the right of the board, the dock stands up as a rail on the left, the top bar drops the table's link. A phone held upright is asked to turn sideways, as in the siblings, until the phone layout is decided in M1 (§9.7).
- **Sounds** are CC0 recordings from Freesound, credited in `modules/web/src/assets/sounds/credits.md`. Today the chime and the fuse, kept from Bluff Table for the turn. New ones (§7.5: the dice, coins, the gavel, the bell…) come from Freesound too, cut to short mono 16-bit 48 kHz clips from the high-quality previews; downloading them needs the user's yes. Never synthesize sounds. Stores play them through `SoundsService.play` (and `loop` for the fuse).
- **Dev handle:** in development the root store is `window.deedsTable`, for checking state from the console or a test script, e.g. `deedsTable.room.game.settings.length` or `deedsTable.room.presence.count`.
