import React from 'react';
import { Header, Button, List, Container } from 'semantic-ui-react';
import { db } from '../../../config/fbConfig';

export const BoardWaiting = ({ players, updateStage, pin, gameRef }) => {
  const startGame = async gameRef => {
    await gameRef
      .collection('players')
      .get()
      .then(function(players) {
        const batch = db.batch();

        for (let i = 0; i < players.docs.length; i++) {
          const player = players.docs[i];
          let nextPlayerName;
          if (i + 1 < players.docs.length) {
            nextPlayerName = players.docs[i + 1].data().name;
          } else {
            nextPlayerName = null;
          }

          batch.update(player.ref, {
            score: 0,
            turnOrder: i,
            nextPlayer: nextPlayerName,
          });

          if (i === 0) {
            batch.update(gameRef, {
              inHotSeat: {
                name: player.data().name,
                nextPlayer: nextPlayerName,
              },
            });
          }
        }

        batch.commit();
      });

    updateStage();
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
