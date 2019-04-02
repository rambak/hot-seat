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

        const randomizedPlayers = Array(players.docs.length).fill(null);

        players.forEach(player => {
          let playerIdx;
          do {
            playerIdx = Math.floor(Math.random() * players.docs.length);
          } while (randomizedPlayers[playerIdx]);
          randomizedPlayers[playerIdx] = player.data().name;
        });

        for (let i = 0; i < randomizedPlayers.length; i++) {
          const player = randomizedPlayers[i];
          let nextPlayerName;
          if (i + 1 < randomizedPlayers.length) {
            nextPlayerName = randomizedPlayers[i + 1];
          } else {
            nextPlayerName = null;
          }

          batch.update(gameRef.collection('players').doc(player), {
            score: 0,
            nextPlayer: nextPlayerName,
          });

          if (i === 0) {
            batch.update(gameRef, {
              inHotSeat: {
                name: player,
                nextPlayer: nextPlayerName,
                isAnswered: false,
              },
            });
          }
        }
        await batch.commit();
      });

    //updateStage();
  };
  const padding =
    players.length > 7 ? { paddingTop: '1vh' } : { paddingTop: '7vh' };

  return (
    <Container textAlign="center" style={padding}>
      <Header
        style={{
          fontSize: '9vh',
          color: 'rgb(14, 60, 97)',
          textShadow: '1px 1px white',
        }}
      >
        Game pin: <span className="pin">{pin}</span>
      </Header>
      {players.length === 0 ? (
        <>
          <br />
          <br />
        </>
      ) : (
        ''
      )}
      <Header
        style={{
          fontSize: '6vh',
          margin: '-2vh',
          color: 'rgb(14, 60, 97)',
          textShadow: '1px 1px white',
        }}
      >
        Go to <span className="question">{window.location.hostname}/login</span>{' '}
        to join!
      </Header>
      <Header
        style={{
          fontSize: '7vh',
          color: 'rgb(14, 60, 97)',
          marginTop: '-3vh',
          textShadow: '1px 1px white',
        }}
      >
        Players
      </Header>
      {GridRow(players)}
      {players.length === 0 ? (
        <>
          <br />
          <br />
        </>
      ) : (
        ''
      )}
      <Button
        color="blue"
        size="massive"
        style={{ margin: '25px' }}
        onClick={() => startGame(gameRef)}
        // disabled={players.length === 0)}
        disabled={players.length < 3}
      >
        Start!
      </Button>
    </Container>
  );
};

export default BoardWaiting;
