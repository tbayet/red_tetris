import { SERVER_PING } from "../actions/server";

const server = (state = {}, action) => {
  switch (action.type) {
    case SERVER_PING:
      return {};
    default:
      return state;
  }
};

export default server;