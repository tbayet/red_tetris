import chai from "chai";
import { expect } from "chai";
import equalJSX from "chai-equal-jsx";
import React from "react";
import { shallow } from "enzyme";
import sinon, { assert } from "sinon";

// PlayerForm
import {
  PlayerForm,
  mapStateToPlayerFormProps,
  mapDispatchToPlayerFormProps
} from "../../../src/client/containers/forms/PlayerForm";

import {
  PLAYER_UPDATE,
  updatePlayer,
  PLAYER_SAVE,
  savePlayer
} from "../../../src/client/actions/player";

const assertEqualShallowElements = (firstElem, secondElem) => {
  firstElem.getElement().should.equal(secondElem.getElement());
};

const assertNotEqualShallowElements = (firstElem, secondElem) => {
  firstElem.getElement().should.not.equal(secondElem.getElement());
};

describe("PlayerForm", () => {
  const PLAYER = {
    nickname: "test"
  };
  describe("PlayerForm component", () => {
    it("should render as expected", () => {
      const output = shallow(<PlayerForm player={PLAYER} />);
      output.should.matchSnapshot();
    });
    it("should trigger changeNickname on typing into the input", done => {
      const event = { target: { value: "yolo" } };
      const changeNickname = (event, player) => {
        event.should.equal(event);
        done();
      };
      const output = shallow(
        <PlayerForm player={PLAYER} changeNickname={changeNickname} />
      );
      output.find("#nicknameInput").simulate("change", event);
    });
    it("should trigger saveNickname on clicking the save button", () => {
      const event = { target: { value: "yolo" } };
      const saveNickname = (event, player) => {
        event.should.equal(event);
        done();
      };
      const output = shallow(
        <PlayerForm player={PLAYER} saveNickname={saveNickname} />
      );
      output.find("#submitButton").simulate("click", event);
    });
  });
  describe("mapStateToPlayerProps", () => {
    it("should map player to PlayerForm props", () => {
      const state = {
        state: {
          player: PLAYER
        }
      };
      const playerFormProps = mapStateToPlayerFormProps(state);

      playerFormProps.should.be.deep.equal({
        player: PLAYER
      });
    });
  });
  describe("mapDispatchToPlayerFormProps", () => {
    it("should map changeNickname and saveNickname functions to PlayerForm props", () => {
      const dispatch = () => {};
      const playerFormProps = mapDispatchToPlayerFormProps(dispatch);

      expect(playerFormProps.saveNickname).to.exist;
      expect(playerFormProps.changeNickname).to.exist;
    });
    describe("changeNickname", () => {
      it("should dispatch updatePlayer action", done => {
        const player = { nickname: "toto" };
        const event = { target: { value: "tata" } };
        const playerAction = updatePlayer(player);
        const dispatch = playerAction => {
          expect(playerAction.player.nickname).to.deep.equal(
            event.target.value
          );
          done();
        };
        const playerFormProps = mapDispatchToPlayerFormProps(dispatch);

        playerFormProps.changeNickname(event, player);
      });
    });
    describe("saveNickname", () => {
      it("should prevent event propagation and dispatch savePlayer action", () => {
        const player = { nickname: "toto" };
        const event = { preventDefault: sinon.spy() };
        const playerAction = savePlayer(player);
        const dispatch = playerAction => {
          expect(playerAction).to.deep.equal({ type: PLAYER_SAVE, player });
        };
        const playerFormProps = mapDispatchToPlayerFormProps(dispatch);

        playerFormProps.saveNickname(event, player);
        sinon.assert.called(event.preventDefault);
      });
    });
  });
});