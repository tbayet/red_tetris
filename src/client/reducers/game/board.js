import {
  GAME_BOARD_DELETE_LINES,
  GAME_PIECES_PIECE_MOVE,
  GAME_BOARD_UPDATE,
  GAME_LOSE,
  PARTY_LEFT,
  GAME_HAS_FOCUS,
  GAME_LOSE_FOCUS,
  GAME_END,
  PARTY_START_SUCCESS
} from '../../../actionsTypes';
import {
  gridFusion,
  checkLines,
  testCollision,
  gridZero,
  deleteLinesF
} from './utils';
import { notifyGridUpdate } from '../../actions/game/board';

export const boardInitialState = () => ({
  grid: gridZero(10, 20),
  ending: false,
  end: false,
  lines: null,
  winner: null,
  focus: false,
  hasFocusedOnce: false
});

const board = (state = { ...boardInitialState() }, action) => {
  switch (action.type) {
    case GAME_BOARD_UPDATE:
      return {
        ...state,
        ...action.board
      };

    case GAME_BOARD_DELETE_LINES: {
      if (state.lines !== null) {
        const newGrid = deleteLinesF(state.grid, state.lines);
        return {
          ...state,
          grid: newGrid,
          lines: null
        };
      }

      return state;
    }

    case GAME_LOSE: {
      return {
        ...state,
        ending: true,
        lines: null
      };
    }

    case PARTY_LEFT:
      return boardInitialState();

    case PARTY_START_SUCCESS: {
      return {
        ...state,
        grid: gridZero(10, 20)
      };
    }

    case GAME_END:
      return boardInitialState();

    case GAME_HAS_FOCUS:
      return {
        ...state,
        hasFocusedOnce: true,
        focus: true
      };

    case GAME_LOSE_FOCUS:
      return {
        ...state,
        focus: false
      };

    default:
      return state;
  }
};

export default board;
