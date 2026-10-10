import { observer } from 'mobx-react-lite';
import type { ReactElement } from 'react';
import { useRootStore } from '../../../stores/use-root-store';
import { RoomLobbyBoardBanner, RoomLobbyBoardRoot, RoomLobbyBoardSheet, RoomLobbyBoardSubtitle, RoomLobbyBoardTitle } from './styled-components';

// Where the board of Drizzleton goes (spec §8, §9.1): for now a sheet of board paper with the title
// banner from the look sketches. The board itself, ported from the sketches, comes in M1.
export const RoomLobbyBoard = observer(function RoomLobbyBoard(): ReactElement {
  const { t } = useRootStore().locale;

  return (
    <RoomLobbyBoardRoot>
      <RoomLobbyBoardSheet>
        <RoomLobbyBoardBanner>
          <RoomLobbyBoardSubtitle>{t('board.subtitle')}</RoomLobbyBoardSubtitle>
          <RoomLobbyBoardTitle>Deeds</RoomLobbyBoardTitle>
        </RoomLobbyBoardBanner>
      </RoomLobbyBoardSheet>
    </RoomLobbyBoardRoot>
  );
});
