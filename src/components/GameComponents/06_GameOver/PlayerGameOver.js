import React from 'react';
import { Header, Container } from 'semantic-ui-react';

export const PlayerGameOver = props => {
  return (
    <Container className="centered-child">
      <Header className="title" textAlign="center">
        Game is over!
      </Header>
    </Container>
  );
};

export default PlayerGameOver;
