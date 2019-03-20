import React from 'react';
import { Container, Header } from 'semantic-ui-react';

export const BoardUpNow = ({ inHotSeatName, updateStage }) => {
  window.setTimeout(() => updateStage(), 0);

  return (
    <Container textAlign="center">
      <Header>{inHotSeatName} is in the hot seat!</Header>
    </Container>
  );
};

export default BoardUpNow;
