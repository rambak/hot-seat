import React from 'react';
import { Container, Header } from 'semantic-ui-react';

export const PlayerUpNow = ({ self, inHotSeatName }) => {
  return (
    <Container textAlign="center">
      {inHotSeatName === self.name ? (
        <Header>You are in the hot seat!</Header>
      ) : (
        <Header>{inHotSeatName} is in the hot seat!</Header>
      )}
    </Container>
  );
};

export default PlayerUpNow;
