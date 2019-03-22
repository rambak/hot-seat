import React from 'react';
import { Header, Container } from 'semantic-ui-react';

export const PlayerScores = props => {
  return (
    <Container textAlign="center" style={{ paddingTop: '30vh' }}>
      <Header className="title">The round is over and scores have been tallied!</Header>
    </Container>
  )
};

export default PlayerScores;
