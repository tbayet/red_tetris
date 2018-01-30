import {
  PARTY_GET,
  PARTY_SAVE,
  PARTY_ADD,
  PARTY_UPDATE,
  PARTY_JOIN,
  PARTY_LEAVE
} from "../../actionsTypes";

export const getParty = () => {
  return {
    type: PARTY_GET
  };
};

export const saveParty = party => {
  return {
    type: PARTY_SAVE,
    party
  };
};

export const addParty = party => {
  return {
    type: PARTY_ADD,
    party
  };
};

export const joinParty = (party, player) => {
  return {
    type: PARTY_JOIN,
    party,
    player
  };
};

export const leaveParty = () => {
  return {
    type: PARTY_LEAVE
  };
};

export const updateParty = party => {
  return {
    type: PARTY_UPDATE,
    party
  };
};
