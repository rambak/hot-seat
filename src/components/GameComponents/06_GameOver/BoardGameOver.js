import React, { useState } from 'react';
import { Container, Header, Button, Transition } from 'semantic-ui-react';
import Confetti from 'reactfitti';

export const BoardGameOver = ({ players, gameRef, setQuestions }) => {
  let winner = {
    highScore: 0,
    playerName: [],
  };
  players.forEach(player => {
    if (player.score === winner.highScore) {
      winner.playerName = [...winner.playerName, player.name];
    } else if (player.score > winner.highScore) {
      winner.highScore = player.score;
      winner.playerName = [player.name];
    }
  });

  const playAgain = () => {
    setQuestions({
      currentQuestion: null,
      prevQuestions: {},
    });

    gameRef.set({
      currentStage: 'waitingForPlayersNew',
    });

    const playersRef = gameRef.collection('players');

    players.forEach(player => {
      playersRef.doc(player.name).delete();
    });
    // playersRef.get().then(snapchot => {
    //   snapchot.forEach(doc => {
    //     playersRef.doc(doc.name).delete();
    //   })
    // })
  };

  const winnerText =
    winner.playerName.length > 1 ? (
      <>
        <Header className="question" style={{ padding: '0' }}>
          It's a Tie!
        </Header>
        <Header className="question" style={{ padding: '0' }}>
          Winners:
        </Header>
        <Header className="question" style={{ padding: '0' }}>
          {winner.playerName.join(' and ')}
        </Header>
      </>
    ) : (
      `Winner: ${winner.playerName[0]}`
    );

  const [showConfetti, setShowConfetti] = useState(true);

  setTimeout(() => setShowConfetti(false), 3000);

  return (
    <Container
      className="game-over"
      textAlign="center"
      style={{ paddingTop: '20vh' }}
    >
      {showConfetti && <Confetti numberOfElements={1500} />}
      <Header className="title">GAME IS OVER</Header>
      <Header className="question" style={{ padding: '0' }}>
        {winnerText}
      </Header>
      <Transition
        className="centered-parent"
        animation="browse"
        duration={250}
        visible={!showConfetti}
        unmountOnHide
      >
        <Button
          color="blue"
          size="massive"
          onClick={playAgain}
          className="centered-child"
        >
          Play Again
        </Button>
      </Transition>
    </Container>
  );
};

export default BoardGameOver;
