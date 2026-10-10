import { observer } from 'mobx-react-lite';
import type { ReactElement } from 'react';
import { useRootStore } from '../../../stores/use-root-store';
import { RoomLobbyBoard } from './board';
import { RoomLobbyGame } from './game';
import { RoomLobbyPlayers } from './players';
import { RoomLobbyMiddle, RoomLobbyRoot, RoomLobbySide } from './styled-components';

// While people gather (spec §4.2, §9.1): who's at the table on the left, the game's settings on the
// right, and the board between them. On a phone held sideways the cards share one column beside the
// board. Your portrait and its builder join the right-hand column with the portraits (M1).
export const RoomLobby = observer(function RoomLobby(): ReactElement {
  const { isCompact } = useRootStore().ui.layout;

  return (
    <RoomLobbyRoot compact={isCompact}>
      {!isCompact && (
        <RoomLobbySide side="left">
          <RoomLobbyPlayers />
        </RoomLobbySide>
      )}
      <RoomLobbyMiddle compact={isCompact}>
        <RoomLobbyBoard />
      </RoomLobbyMiddle>
      <RoomLobbySide side="right">
        {isCompact && <RoomLobbyPlayers />}
        <RoomLobbyGame />
      </RoomLobbySide>
    </RoomLobbyRoot>
  );
});
