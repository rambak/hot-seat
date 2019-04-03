import React, { useState } from 'react';
import { Container, Header, Button, Transition } from 'semantic-ui-react';
import Confetti from 'reactfitti';
import { Scores } from '..';

export const BoardGameOver = ({
  players,
  gameRef,
  setQuestions,
  inHotSeatName,
}) => {
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
      currentStage: 'waitingForPlayers',
    });

    const playersRef = gameRef.collection('players');
    players.forEach(player => {
      playersRef.doc(player.name).delete();
    });
  };

  const winnerText =
    winner.playerName.length > 1 ? (
      <>
        <Header className="title">It's a Tie!</Header>
        <Header>Winners:</Header>
        <Header>{winner.playerName.join(' and ')}</Header>
      </>
    ) : (
      `Winner: ${winner.playerName[0]}`
    );

  const [showConfetti, setShowConfetti] = useState(true);

  setTimeout(() => setShowConfetti(false), 3000);

  return (
    <Container className="game-over" textAlign="center">
      {showConfetti && <Confetti numberOfElements={1500} />}
      <Header className="title">GAME IS OVER</Header>
      <Header className="winners">{winnerText}</Header>
      <Scores
        players={players}
        inHotSeatName={inHotSeatName}
        gameRef={gameRef}
      />
      <div>
        <Scores
          players={players}
          inHotSeatName={inHotSeatName}
          gameRef={gameRef}
        />
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
            className="game-over"
            style={{ margin: 'auto' }}
          >
            Play Again
          </Button>
        </Transition>
      </div>
    </Container>
  );
};

export default BoardGameOver;
