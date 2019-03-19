import React from 'react';
import { Header, Button, List, Container } from 'semantic-ui-react';
import { db } from '../../../config/fbConfig';

export const BoardWaiting = ({ players, updateStage, pin, gameRef }) => {
  const startGame = gameRef => {
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

        batch.commit();
      });

    updateStage(gameRef, 'waitingForPlayers');
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
          <List.Item key={player.name}>{player.name}</List.Item>
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

export default BoardWaiting;
