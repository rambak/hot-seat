import React, { useEffect } from 'react';
import { Table, Container, Header, Label, Image } from 'semantic-ui-react';

export const Scores = ({ players, inHotSeatName, updateStage, gameRef }) => {
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
      <Table
        basic="very"
        celled
        collapsing
        compact
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
    </Container>
  );
};

export default Scores;
