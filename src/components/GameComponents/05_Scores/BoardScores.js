import React from 'react';
import { Table, Icon } from 'semantic-ui-react';

export const BoardScores = props => {
  const players = props.players;

  const inHotSeatName = players.find(player => {
    return player.turnOrder === props.inHotSeat;
  }).name;

  let highScore = 0;
  players.forEach(player => {
    if (player.score > highScore) {
      highScore = player.score;
    }
  });

  return (
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
  );
};

export default BoardScores;
