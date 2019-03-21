import React from 'react';
import { Container, Header } from 'semantic-ui-react';

export const PlayerUpNow = ({ selfName, inHotSeatName }) => {
  return (
    <Container textAlign="center">
      {inHotSeatName === selfName ? (
        <>
          <Header>YOU</Header>
          <Header>are in the hot seat!</Header>
        </>
      ) : (
        <>
          <Header>{inHotSeatName}</Header>
          <Header>is in the hot seat!</Header>
        </>
      )}
    </Container>
  );
};

export default PlayerUpNow;
