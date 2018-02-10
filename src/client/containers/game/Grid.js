import React from "react";
import { connect } from "react-redux";
import styled, { keyframes } from "styled-components";
import Square from "../../components/game/Square";

// import Pieces from '../../components/game/Pieces';
import { Tetri, Bomb } from "../../components/game/Tetri";
import gameStyle from "../../styles/gameStyle";
import globalStyle from "../../styles/global";
import { deleteTnt } from "../../reducers/game/utils";
import {
  rotatePiece,
  movePiece,
  updatePlayer,
  claimPiece
} from "../../actions/game/pieces";
import { deleteLines, endParty } from "../../actions/game/board";
import { updateBoard } from "../../actions/game/board";
import { setMod } from "../../actions/game/mods";

const Calque = ({ board, piece }) => {
  if (board.end === true) {
    return (
      <div
        style={{
          ...gameStyle.calque,
          textAlign: "center",
          marginTop: "35vh",
          fontSize: "5vh",
          fontFamily: globalStyle.font.family.game,
          color: "white"
        }}
      >
        YOU LOOSE
      </div>
    );
  } else if (!piece) {
    return <div />;
  } else {
    return (
      <div style={gameStyle.calque}>
        <Tetri position={piece} tetri={piece.grid} />
      </div>
    );
  }
};

export const Grid = ({
  party,
  board,
  pieces,
  mods,
  rotateit,
  endGame,
  tntExplode
}) => {
  const grid = board.grid.map((line, i) => {
    const cols = line.map((col, j) => {
      return <Square color={col} key={j} />;
    });

    if (mods) {
      switch (mods.type) {
        case "bomb": {
          return (
            <div style={{ ...gameStyle.line, position: "relative" }} key={i}>
              {i === mods.y ? (
                <div style={gameStyle.bomb.explode(mods.x, mods.y, 0)} />
              ) : (
                <div />
              )}
              <div
                style={gameStyle.bomb.explode(
                  mods.x,
                  mods.y,
                  i === mods.y ? 2 : 1
                )}
              />
              {cols}
            </div>
          );
          break;
        }

        case "tnt": {
          let tnt = [];
          if (Math.abs(mods.y - i) <= 3) {
            line.map((col, j) => {
              if (Math.abs(mods.y - i) + Math.abs(mods.x - j) <= 3)
                tnt.push(
                  <div key={i + "" + j} style={gameStyle.tnt.explode(j)}>
                    <div style={gameStyle.tnt.anim}>
                      <div style={gameStyle.tnt.base1} />
                      <div style={gameStyle.tnt.base2} />
                      <div style={gameStyle.tnt.circle} />
                    </div>
                  </div>
                );
            });
          }
          return (
            <div style={{ ...gameStyle.line, position: "relative" }} key={i}>
              {tnt}
              {cols}
            </div>
          );
        }

        default:
          break;
      }
    }

    if (board.lines && board.lines.indexOf(i) !== -1) {
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

  if (pieces.piece === null && board.ending && board.lines === null) {
    endGame(board);
  }

  if (mods.type === "tnt") tntExplode(board.grid, mods);

  return (
    <div
      tabIndex={"0"}
      onKeyDown={e => rotateit(e, pieces.piece, board)}
      style={gameStyle.grid}
    >
      <Calque board={board} piece={pieces.piece} />
      {grid}
    </div>
  );
};

export const mapStateToGridProps = ({
  party,
  game: { board, pieces, mods }
}) => ({
  party,
  board,
  pieces,
  mods
});

export const mapDispatchToGridProps = dispatch => {
  const tntExplode = (grid, mod) => {
    setTimeout(() => {
      dispatch(
        updateBoard({
          grid: deleteTnt(mod, grid)
        })
      );
      dispatch(setMod(null));
    }, 600);
  };

  const rotateit = (event, piece, board) => {
    if (board.end || board.ending || piece === null) return;

    switch (event.keyCode) {
      case 39: // RIGHT
        dispatch(movePiece(1));
        event.stopPropagation();
        event.preventDefault();
        break;
      case 37: // LEFT
        dispatch(movePiece(-1));
        event.stopPropagation();
        event.preventDefault();
        break;
      case 40: // DOWN
        dispatch(movePiece(0));
        event.stopPropagation();
        event.preventDefault();
        break;
      case 32: // SPACE
        break;
      case 38:
      case 68: // UP or D
        dispatch(rotatePiece(1));
        event.stopPropagation();
        event.preventDefault();
        break;
      case 65: // A
        dispatch(rotatePiece(-1));
        event.stopPropagation();
        event.preventDefault();
        break;
      case 69: // E
        endGame(board);
        event.stopPropagation();
        event.preventDefault();
        break;
      default:
        break;
    }
  };

  const endGame = board => {
    dispatch(endParty({ ...board, ending: false }));
  };

  return { rotateit, endGame, tntExplode };
};

export default connect(mapStateToGridProps, mapDispatchToGridProps)(Grid);
