import React from 'react';
import { Header, Button, List, Container } from 'semantic-ui-react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { db } from '../../../config/fbConfig';
import { startGame } from '../../../utils/';
import { withRouter } from 'react-router-dom';

export const BoardWaiting = props => {
  const pin = props.match.params.pin;
  const gameRef = db.collection('games').doc(pin);
  const playersRef = gameRef.collection('players');
  const playersCollection = useCollection(playersRef);

  return (
    <Container textAlign="center">
      <Header as="h1" textAlign="center">
        Game PIN: {pin}
      </Header>
      <p>Go to {window.location.hostname}/login to join!</p>
      <List bulleted>
        <List.Description>Players who are already here:</List.Description>
        {playersCollection.value &&
          playersCollection.value.docs.map(player => (
            <List.Item key={player.data().name}>{player.data().name}</List.Item>
          ))}
      </List>
      <Button
        onClick={() => startGame(gameRef)}
        // disabled={players.length < 3}
      >
        Start!
      </Button>
    </Container>
  );
};

export default withRouter(BoardWaiting);
