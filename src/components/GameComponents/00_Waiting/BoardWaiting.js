import React from 'react';
import { Header, Button, Container } from 'semantic-ui-react';
import { db } from '../../../config/fbConfig';
import { GridRow } from './GridRow';

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
    <Container className="centered-child">
      <Header style={{ fontSize: '10vh', color: 'black' }}>
        Game pin:{' '}
        <span style={{ fontSize: '10vh' }} className="question">
          {pin}
        </span>
      </Header>
      <Header style={{ fontSize: '4vh', margin: '-2vh' }}>
        Go to <span className="question">{window.location.hostname}/login</span>{' '}
        to join!
      </Header>
      <Header style={{ fontSize: '7vh', color: 'black', marginTop: '-1vh' }}>
        Players
      </Header>
      {GridRow(players, true)}
      <Button
        style={{ margin: '25px' }}
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
