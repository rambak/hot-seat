import React from 'react';
import { Container, Header, Button } from 'semantic-ui-react';

export const BoardGameOver = ({ players, gameRef }) => {
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
    // const answersRef = gameRef.collection('answers')
    gameRef.update({
      currentStage: 'waitingForPlayers',
    });
  };

  const winnerText =
    winner.playerName.length > 1
      ? `Winners: ${winner.playerName.join(', ')}`
      : `Winner: ${winner.playerName[0]}`;

  return (
    <Container textAlign="center" style={{ paddingTop: '27vh' }}>
      <Header className="title">GAME IS OVER</Header>
      <Header className="question">{winnerText}</Header>
      <Button onClick={playAgain}>Play Again</Button>
    </Container>
  );
};

export default BoardGameOver;
