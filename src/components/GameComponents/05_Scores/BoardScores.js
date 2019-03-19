import React from 'react';
import { Table, Icon } from 'semantic-ui-react';

const hardCodedPlayers = [
  { name: 'Rimma', score: 5, turnOrder: 0 },
  { name: 'Anna', score: 5, turnOrder: 1 },
  { name: 'Matti', score: 5, turnOrder: 2 },
  { name: 'Mark', score: 10, turnOrder: 3 },
];

export const BoardScores = props => {
  const players = props.players;

  const inHotSeatName = hardCodedPlayers.find(player => {
    return player.turnOrder === props.inHotSeat;
  }).name;

  let highScore = 0;
  hardCodedPlayers.forEach(player => {
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
