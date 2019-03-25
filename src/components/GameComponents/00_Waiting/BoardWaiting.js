import React from 'react';
import { Header, Button, List, Container } from 'semantic-ui-react';
import { db } from '../../../config/fbConfig';

export const BoardWaiting = ({
  players,
  updateStage,
  pin,
  gameRef,
  questions,
}) => {
  const startGame = async gameRef => {
    await gameRef
      .collection('players')
      .get()
      .then(async function(players) {
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
                isAnswered: false,
              },
            });
          }
        }

        await batch.commit();
      });

    updateStage();
  };

  return (
    <Container textAlign="center" style={{ paddingTop: '5vh' }}>
      <Header className="title">Game PIN: {pin}</Header>
      <Header style={{ fontSize: '4vh' }}>
        Go to {window.location.hostname}/login to join!
      </Header>
      <List>
        <List.Description as="h2">Players</List.Description>

        {players.map(player => (
          <List.Item
            style={{ fontSize: '4vh' }}
            className="players"
            key={player.name}
          >
            {player.name}
          </List.Item>
        ))}
      </List>
      <Button
        onClick={() => startGame(gameRef)}
        disabled={players.length === 0}
        // disabled={players.length < 3}
      >
        Start!
      </Button>

      {/* <Header>Instructions:</Header>
      <p>
        Each round one player will end up in the hot seat. There are two stages:
        QUESTION and VOTING.
        <br />
        QUESTION - The game will ask everyone to type in an answer to a question
        about the person in the hot seat. Use your device to answer. If you are
        in the hot seat, provide the correct answer. All other players, make
        your best guess.
        <br />
        VOTING - All answers will be displayed and among them is the answer from
        the player in the hot seat. Use your device to guess the correct answer
        and score points!
        <br />
        Enjoy the game, see how well your friends know you, and learn more about
        them!
      </p> */}
    </Container>
  );
};

export default BoardWaiting;
