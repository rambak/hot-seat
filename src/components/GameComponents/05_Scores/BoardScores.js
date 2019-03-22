import React, { useEffect } from 'react';
import { Table, Icon } from 'semantic-ui-react';
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
    gameRef.update({ answerCount: 0, voteCount: 0 });
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
    <>
      <Table basic="very" celled collapsing>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell />
            <Table.HeaderCell>Player</Table.HeaderCell>
            <Table.HeaderCell>Score</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {players.map(player => (
            <Table.Row key={player.name}>
              <Table.Cell>
                {player.name === inHotSeatName && <Icon name="fire" />}
                {player.score === highScore && <Icon name="winner" />}
              </Table.Cell>
              <Table.Cell>{player.name}</Table.Cell>
              <Table.Cell>{player.score}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <Timer updateStage={updateStage} time={10} />
    </>
  );
};

export default BoardScores;
