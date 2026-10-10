import { observer } from 'mobx-react-lite';
import type { ReactElement } from 'react';
import { useRootStore } from '../../../stores/use-root-store';
import { GameCard, SettingChoice, SettingSwitch } from '../../../ui';
import { RoomLobbyGameSwitch, RoomLobbyGameSwitches } from './styled-components';

// How a game runs (spec §5.15): how long it lasts (D9), and auctions (D11). Each says in one line
// what it does (spec D28). Anyone may change them (D21).
export const RoomLobbyGame = observer(function RoomLobbyGame(): ReactElement {
  const { locale, room } = useRootStore();
  const { settings } = room.game;

  return (
    <GameCard title={locale.t('lobby.game')} subtitle={locale.t('lobby.gameSubtitle')}>
      <SettingChoice
        label={settings.lengthLabel}
        hint={settings.lengthHint}
        options={settings.lengthViews}
        value={settings.lengthId}
        disabled={!settings.isEditable}
        surface="print"
        onChange={settings.chooseLength}
      />
      <RoomLobbyGameSwitches>
        {settings.switchViews.map((view) => (
          <RoomLobbyGameSwitch key={view.name} on={view.on}>
            <SettingSwitch label={view.label} hint={view.hint} checked={view.on} disabled={!settings.isEditable} surface="print" onChange={(on) => settings.setSwitch(view.name, on)} />
          </RoomLobbyGameSwitch>
        ))}
      </RoomLobbyGameSwitches>
    </GameCard>
  );
});
