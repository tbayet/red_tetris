import { PLAYER_UPDATE, PLAYER_SAVE, PLAYER_GET } from '../../actionsTypes';

const getPlayer = () => {
  const playerItem = localStorage.getItem('player');
  if (playerItem) return playerItem;

  return '';
};

const player = (state = {}, action) => {
  switch (action.type) {
    case PLAYER_UPDATE: {
      if (action.player.nickname)
        localStorage.setItem('player', action.player.nickname);

      return {
        ...state,
        ...action.player
      };
    }

    case PLAYER_GET: {
      return {
        ...state,
        nickname: getPlayer()
      };
    }

    default: {
      return state;
    }
  }
};

export default player;
