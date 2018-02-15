import React from 'react';
import { connect } from 'react-redux';

import {
  FullSizeContainer,
  Input,
  Paragraph,
  FlexContainer,
  FlexSpacer,
  Button
} from '../../components/helpers/Common';
import { addParty, updateParty, saveParty } from '../../actions/party';
import global from '../../styles/global';

export const PartyForm = ({ party, player, createParty, changeParty }) => {
  return (
    <FullSizeContainer padding="20px">
      <Paragraph center size="20px" padding="20px" gameFont color="accent">
        Create a new Party
      </Paragraph>
      <FlexContainer flex>
        <FlexSpacer />
        <form onSubmit={e => createParty(e, party, player)}>
          <FlexContainer>
            <Input
              id="partyNameInput"
              placeholder="Party name..."
              name="partyName"
              value={party.name}
              required
              onChange={e => changeParty(e, party, 'name')}
            />
          </FlexContainer>
          <FlexContainer>
            <Input
              id="partySizeInput"
              type="number"
              placeholder="10"
              name="partySize"
              value={party.size}
              min="1"
              onChange={e => changeParty(e, party, 'size')}
            />
          </FlexContainer>
          <FlexContainer padding={global.padding.md}>
            <input
              id="partyWithBonusInput"
              type="checkbox"
              name="withBonus"
              checked={party.withBonus}
              onChange={e => changeParty(e, party, 'withBonus')}
            />
            <label
              htmlFor="partyWithBonusInput"
              style={{ color: global.color.accent, paddingLeft: '12px' }}
            >
              EXPLOSION MODE
            </label>
          </FlexContainer>
          <FlexContainer>
            <Button
              id="submitButton"
              type="submit"
              primary
              style={{ marginLeft: '20px' }}
            >
              CREATE PARTY
            </Button>
          </FlexContainer>
        </form>
        <FlexSpacer />
      </FlexContainer>
    </FullSizeContainer>
  );
};

export const mapStateToPartyFormProps = state => {
  return {
    party: state.party,
    player: state.player
  };
};

export const mapDispatchToPartyFormProps = dispatch => {
  const createParty = (event, party, player) => {
    event.preventDefault();
    const newParty = {
      ...party,
      players: []
    };
    dispatch(saveParty(newParty));
    dispatch(addParty(newParty, player));
  };
  const changeParty = (event, party, field) => {
    dispatch(
      updateParty({
        ...party,
        [field]:
          event.target.type === 'checkbox'
            ? event.target.checked
            : event.target.value
      })
    );
  };
  return { createParty, changeParty };
};

export default connect(mapStateToPartyFormProps, mapDispatchToPartyFormProps)(
  PartyForm
);
