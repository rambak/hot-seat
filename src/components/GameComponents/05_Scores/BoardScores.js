import React, { useEffect } from 'react';
import { Table, Icon, Container, Header } from 'semantic-ui-react';
import { Timer } from '../../../utils/timer';

export const BoardScores = ({
  players,
  inHotSeatName,
  updateStage,
  gameRef,
}) => {
  let highScore = 0;
  players.forEach(player => {
    if (player.score > highScore) {
      highScore = player.score;
    }
  });

  useEffect(() => {
    gameRef.update({ voteCount: 0 });
    gameRef
      .collection('answers')
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          gameRef
            .collection('answers')
            .doc(doc.id)
            .delete();
        });
      });
  }, []);

  return (
    <Container className="centered-child">
      <Header className="title">Scores</Header>
      <Table
        basic="very"
        celled
        collapsing
        padded="very"
        size="large"
        className="scores"
      >
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell />
            <Table.HeaderCell>
              <h1>Player</h1>
            </Table.HeaderCell>
            <Table.HeaderCell>
              <h1>Score</h1>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {players
            .sort((player1, player2) => {
              if (player1.score > player2.score) return -1;
              else if (player1.score < player2.score) return 1;
              return 0;
            })
            .map(player => (
              <Table.Row key={player.name}>
                <Table.Cell>
                  {player.name === inHotSeatName && (
                    <Icon name="fire" size="huge" />
                  )}
                  {player.score === highScore && (
                    <Icon name="winner" size="huge" />
                  )}
                </Table.Cell>
                <Table.Cell>{player.name}</Table.Cell>
                <Table.Cell>{player.score}</Table.Cell>
              </Table.Row>
            ))}
        </Table.Body>
      </Table>
      <Timer updateStage={updateStage} time={30} />
    </Container>
  );
};

export default BoardScores;
