import React from 'react';
import { Container, Header } from 'semantic-ui-react';
import { Timer } from '../../../utils/timer';

export const BoardUpNow = ({ inHotSeatName, updateStage }) => {
  return (
    <Container textAlign="center">
      <Header>{inHotSeatName} is in the hot seat!</Header>
      <Timer updateStage={updateStage} time={10} />
    </Container>
  );
};

export default BoardUpNow;
