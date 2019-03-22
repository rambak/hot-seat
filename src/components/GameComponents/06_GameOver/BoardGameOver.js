import React from 'react';
import { Container, Header, Divider, Button } from 'semantic-ui-react';

export const BoardGameOver = ({ players, gameRef }) => {
  let winner = {
    highScore: 0,
    playerName: []
  }
  players.forEach(player => {
    if (player.score > winner.highScore) {
      winner.highScore = player.score;
      winner.playerName = [...winner.playerName, player.name]
    }
  });

  const playAgain = () => {
    // const answersRef = gameRef.collection('answers')
    gameRef.update({
      currentStage: "waitingForPlayers"
    })
  }

  const winnerText = winner.playerName.length > 1 ?
  `Winners: ${winner.playerName.split(', ')}` :
  `Winner: ${winner.playerName[0]}`

  return (
    <Container textAlign="center" style={{ paddingTop: '27vh' }}>
      <Header className="title">GAME IS OVER</Header>
      <Header className="question" >{winnerText} score: {winner.highScore}</Header>
      <Button  onClick={playAgain}>Play Again</Button>
    </Container>
  );
};

export default BoardGameOver;
