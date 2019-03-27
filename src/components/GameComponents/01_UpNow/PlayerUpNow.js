import React from 'react';
import { Container, Header } from 'semantic-ui-react';

export const PlayerUpNow = ({ selfName, inHotSeatName }) => {
  return (
    <Container textAlign="center" className="centered-child">
      {inHotSeatName === selfName ? (
        <>
          <Header style={{ fontSize: '6em' }} className="inHotSeat">YOU</Header>
          <Header as='h1'>are in the hot seat!</Header>
        </>
      ) : (
        <>
          <Header style={{ fontSize: '6em' }} className="question">{inHotSeatName}</Header>
          <Header as='h1'>is in the hot seat!</Header>
        </>
      )}
    </Container>
  );
};

export default PlayerUpNow;
