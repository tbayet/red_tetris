import {LOCATION_CHANGE} from "../../actionsTypes";
import { ROOM_PARTY_LIST } from "../../roomsName";
import { joinRoom } from "../actions/room";
import { addParty, getParty, joinParty } from "../actions/party";
import { getParties} from "../actions/partyList";
import { savePlayer, getPlayer } from "../actions/player";

const roomHandler = (socket, action, dispatch, getState) => {
  if (action.type !== LOCATION_CHANGE) return;
  switch (action.payload.pathname) {
    case "/party-list":
      socket.emit("action", getParties());
      break;

    case "/": {
      if (action.payload.hash[0] === '#' && action.payload.hash.length > 1) {
        dispatch(getPlayer());
        dispatch(getParty());

        const state = getState().state;
        console.log("LIST: ", state.partyList);
        console.log(state);
        var player = state.player.nickname ? state.player : { nickname: 'Unknown' };
        console.log(player);
        var party = state.party;
        console.log("state.party:", party);
        if (!state.party.open) {
          const name = action.payload.hash.substring(1);
          party = state.partyList.find(e => (e.name === name));
          if (party === undefined) {
            console.log("new PARTY");
            party = {
              name: name,
              players: [player],
              size: 10,
            };
          }
          console.log("party auto created", party);
          dispatch(savePlayer(player));
          dispatch(addParty(party));
          //createRoom
        }
        else {
          console.log("dispatch join");
          dispatch(joinParty(party, player))
        }
        //io.emit(getParties);
      }
    }

    default:
      break;
  }
};

const socketIoMiddleWare = socket => ({ dispatch, getState }) => {
  dispatch(getParties());
  if (socket) socket.on("action", dispatch);
  return next => action => {
    roomHandler(socket, action, dispatch, getState);
    if (socket && action.type && action.type.indexOf("server/") === 0)
      socket.emit("action", action);
    return next(action);
  };
};

export default socketIoMiddleWare;
