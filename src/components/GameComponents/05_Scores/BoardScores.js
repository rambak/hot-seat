import React from 'react';
import { Scores } from '..';
import { Container, Header } from 'semantic-ui-react';

export const BoardScores = ({
  players,
  inHotSeatName,
  updateStage,
  gameRef,
}) => {
  setTimeout(() => {
    updateStage();
  }, 10000);
  return (
    <Container className="centered-child">
      <Header className="title">Scores</Header>
      <Scores
        players={players}
        inHotSeatName={inHotSeatName}
        updateStage={updateStage}
        gameRef={gameRef}
      />
    </Container>
  );
};

export default BoardScores;
