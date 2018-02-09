import { combineReducers } from "redux";

import board from "./board";
import pieces from "./pieces";
import score from "./score";
import mods from "./mods";

export default combineReducers({
  board,
  pieces,
  score,
  mods
});
