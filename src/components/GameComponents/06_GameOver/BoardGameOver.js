import React from 'react';
import { Container, Header, Divider, Button } from 'semantic-ui-react';

export const BoardGameOver = ({ players, gameRef }) => {
  let winner = {
    highScore: 0,
    playerName: ''
  }
  players.forEach(player => {
    if (player.score > winner.highScore) {
      winner.highScore = player.score;
      winner.playerName = player.name
    }
  });

  const playAgain = () => {
    // const answersRef = gameRef.collection('answers')
    gameRef.update({
      currentStage: "waitingForPlayers"
    })
  }

  return (
    <Container>
      <Header>GAME IS OVER</Header>
      <Divider />
      <Header>Winner: {winner.playerName} (score: {winner.highScore}</Header>
      <Button  onClick={playAgain}>Play Again</Button>
    </Container>
  );
};

export default BoardGameOver;
