import { RESPONSE_RANKINGS_LIST } from '../../actionsTypes';

const ranking = (state = [], action) => {
  switch (action.type) {
    case RESPONSE_RANKINGS_LIST:
      return action.ranking;

    default:
      return state;
  }
};

export default ranking;
