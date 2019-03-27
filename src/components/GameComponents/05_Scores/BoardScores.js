import React, { useEffect } from 'react';
import { Table, Container, Header, Label, Image } from 'semantic-ui-react';
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
    <Container>
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
              <Label size="massive">Player</Label>
            </Table.HeaderCell>
            <Table.HeaderCell textAlign="center">
              <Label size="massive">Score</Label>
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
              <Table.Row
                key={player.name}
                className={player.score === highScore ? 'high-score' : 'score'}
              >
                <Table.Cell textAlign="right">
                  {player.score === highScore && (
                    <Image
                      floated="right"
                      size="tiny"
                      src="/images/trophy-100.png"
                    />
                  )}
                </Table.Cell>
                <Table.Cell>
                  <h1>{player.name}</h1>
                </Table.Cell>
                <Table.Cell textAlign="center">
                  <Label circular>{player.score}</Label>
                </Table.Cell>
              </Table.Row>
            ))}
        </Table.Body>
      </Table>
      <Timer updateStage={updateStage} time={5} />
    </Container>
  );
};

export default BoardScores;
