import React from 'react';
import { Header, Container } from 'semantic-ui-react';
import { auth } from '../../../config/fbConfig';

export const PlayerGameOver = props => {
  const user = auth.currentUser;
  if (user) {
    auth.signOut();
    user.delete().catch(function(error) {
      console.log(error.message);
    });
  }
  return (
    <Container className="centered-child">
      <Header className="title" textAlign="center">
        Game is over!
      </Header>
    </Container>
  );
};

export default PlayerGameOver;
