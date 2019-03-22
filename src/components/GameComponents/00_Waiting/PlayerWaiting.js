import React from 'react';
import { Container, Header } from 'semantic-ui-react';

export const PlayerWaiting = () => {
  return (
    <Container textAlign="center" style={{ paddingTop: '30vh' }}>
      <Header className="title">Waiting for the game to start!</Header>
    </Container>
  );
};

export default PlayerWaiting;
