import type { GameSnapshot, MemberSnapshot } from '@deeds-table/protocol';
import type { TableRoomGame } from './game.js';
import type { TableRoomMember } from './members.js';

// What the table looks like from outside: the shared view, the same for everyone. Letters' offers
// and notes will never go through here: only their two players see them (spec D29, §10.4).

export interface TableRoomView {
  members: MemberSnapshot[];
  game: GameSnapshot;
}

export interface TableRoomViewParts {
  members: readonly TableRoomMember[];
  game: Pick<TableRoomGame, 'phase' | 'settings'>;
}

export const tableView = ({ members, game }: TableRoomViewParts): TableRoomView => ({
  members: members.map(({ id, name, color, connected, bot }) => ({ id, name, color, connected, bot })),
  game: { phase: game.phase, settings: game.settings },
});
