import React from 'react';
import { connect } from 'react-redux';
import RightSide from '../../components/game/RightSide';
import LeftSide from '../../components/game/LeftSide';
import Grid from './Grid';
import { Paragraph, FlexContainer } from '../../components/helpers/Common';
import global from '../../styles/global';

export const Game = ({ party, player, game, winner }) => (
  <div
    style={{
      width: '100%',
      paddingRight: '10%',
      paddingLeft: '10%',
      paddingTop: '20px',
      paddingBottom: '20px',
      display: 'flex'
    }}
  >
    <LeftSide party={party} player={player} game={game} />
    <Grid />
    <RightSide
      players={party.players.filter(
        currentPlayer => player.socketId !== currentPlayer.socketId
      )}
    />
  </div>
);

export const mapStateToGameProps = ({ party, player, game }) => ({
  party,
  player,
  game
});

export default connect(mapStateToGameProps)(Game);
