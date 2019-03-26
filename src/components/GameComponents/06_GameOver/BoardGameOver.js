import React from 'react';
import { Container, Header, Button } from 'semantic-ui-react';

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
    winner.playerName.length > 1
      ? `Its a Tie!${'\n'}Winners: ${winner.playerName.join(' and ')}`
      : `Winner: ${winner.playerName[0]}`;

  return (
    <Container textAlign="center" className="centered-child">
      <Header className="title">GAME IS OVER</Header>
      <Header className="question">{winnerText}</Header>
      <Button onClick={playAgain}>Play Again</Button>
    </Container>
  );
};

export default BoardGameOver;
