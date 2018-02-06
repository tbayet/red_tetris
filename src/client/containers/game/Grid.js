import React from 'react';
import { connect } from 'react-redux';
import styled, { keyframes } from 'styled-components';
import Square from '../../components/game/Square';

// import Pieces from '../../components/game/Pieces';
import { Tetri, Bomb } from '../../components/game/Tetri';
import gameStyle from '../../styles/gameStyle';
import { rotatePiece, movePiece, updatePlayer, deleteLines, claimPiece } from '../../actions/player';

export const Grid = ({ party, player, rotateit, endGame, requestPiece }) => {
  const grid = player.grid.map((line, i) => {
    const cols = line.map((col, j) => {
      return <Square color={col} key={j} />;
    });

    if (player.lines && player.lines.indexOf(i) !== -1) {
      console.log('LINE');
      return (
        <div style={gameStyle.line} key={i}>
          <div style={gameStyle.lineDestroying} />
          {cols}
        </div>
      );
    } else
      return (
        <div style={gameStyle.line} key={i}>
          {cols}
        </div>
      );
  });

  const Calque = () => {
    if (!player.piece) return <div />;
    if (player.end === true)
      return (
        <div
          style={{
            ...gameStyle.calque,
            textAlign: 'center',
            marginTop: '35vh',
            fontSize: '5vh',
            color: 'white',
          }}
        >
          YOU LOOSE
        </div>
      );

    return (
      <div style={gameStyle.calque}>
        <Tetri position={player.piece} tetri={player.piece.grid} />
        <Bomb position={{ x: 5, y: 2 }} />
      </div>
    );
  };

  if (player.piece === null) {
    setTimeout(() => {
      if (player.ending && player.lines === null) endGame(player);
      else requestPiece(party);
    }, 500);
  }

  return (
    <div tabIndex={'0'} onKeyDown={e => rotateit(e, player)} style={gameStyle.grid}>
      <Calque />
      {grid}
    </div>
  );
};

export const mapStateToGridProps = state => {
  return {
    party: state.party,
    player: state.player,
  };
};

export const mapDispatchToGridProps = dispatch => {
  const rotateit = (event, player) => {
    event.stopPropagation();
    event.preventDefault();

    if (player.end || player.ending || player.piece === null) return;

    switch (event.keyCode) {
    case 39: // RIGHT
      dispatch(movePiece(1));
      break;
    case 37: // LEFT
      dispatch(movePiece(-1));
      break;
    case 40: // DOWN
      dispatch(movePiece(0));
      break;
    case 32: // SPACE
      break;
    case 38:
    case 68: // UP or D
      dispatch(rotatePiece(player, 1));
      break;
    case 65: // A
      dispatch(rotatePiece(player, -1));
      break;
    case 69: // E
      endAnimation(player);
      break;
    default:
      break;
    }
  };

  const endGame = player => {
    if (player.ending) {
      // endgame
      console.log('YEP');

      // Claim Force Piece
      endAnimation({ ...player, ending: false, end: true });
    }
  };

  const requestPiece = party => {
    dispatch(deleteLines());
    dispatch(claimPiece(party._id));
  };

  //  watch(player.end, () => endAnimation());

  const endAnimationSub = (player, grid, y) => {
    let x = 0;
    let interval = setInterval(function() {
      grid[y][x++] = 8;
      dispatch(updatePlayer({ ...player, grid }));
      if (x == grid[0].length) clearInterval(interval);
      if (x == grid[0].length && y < 0) {
        // Message de DEFAITE
      }
    }, 50);
  };

  const endAnimation = player => {
    let grid = [...player.grid];
    let y = grid.length - 1;
    let interval = setInterval(function() {
      endAnimationSub(player, grid, y);
      y--;
      if (y < 0) clearInterval(interval);
    }, 250);
  };

  return { rotateit, endAnimation, endGame, requestPiece };
};

export default connect(mapStateToGridProps, mapDispatchToGridProps)(Grid);
