import React from 'react';
import { Header, Button, List, Container } from 'semantic-ui-react';
import { db } from '../../config/fbConfig';

// const hardcodedPin = 'ABCD';

// const hardcodedPlayers = [
//   { name: 'Matti' },
//   { name: 'Rimma' },
//   { name: 'Anna' },
// ];

const Board00WaitingForPlayers = props => {
  const pin = props.pin;
  const players = props.players;
  const gameRef = props.gameRef;

  const startGame = () => {
    gameRef
      .collection('players')
      .get()
      .then(function(players) {
        const batch = db.batch();

        players.docs.forEach(function(player, idx) {
          batch.update(player.ref, {
            score: 0,
            turnOrder: idx,
          });
        });

        batch.update(gameRef, {
          inHotSeat: 0,
          currentStage: 'upNow',
        });

        batch.commit();
      });
  };

  return (
    <Container textAlign="center">
      <Header as="h1" textAlign="center">
        Game PIN: {pin}
      </Header>
      <p>Go to {window.location.hostname}/login to join!</p>
      <List bulleted>
        <List.Description>Players who are already here:</List.Description>
        {players.map(player => (
          <List.Item>{player.name}</List.Item>
        ))}
      </List>
      <Button
        onClick={startGame}
        // disabled={players.length < 3}
      >
        Start!
      </Button>
    </Container>
  );
};

export default Board00WaitingForPlayers;
