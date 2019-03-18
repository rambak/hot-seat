import React from 'react';
import { Header, Button, List, Container } from 'semantic-ui-react';

// const hardcodedPin = 'ABCD';

// const hardcodedPlayers = [
//   { name: 'Matti' },
//   { name: 'Rimma' },
//   { name: 'Anna' },
// ];

const Board00WaitingForPlayers = props => {
  const pin = props.pin;
  const players = props.players;

  return (
    <Container textAlign="center">
      <Header as="h1" textAlign="center">
        Game PIN: {pin}
      </Header>
      <p>Go to {window.location.hostname}/login to join!</p>
      <List bulleted>
        <List.Description>Players who are already here:</List.Description>
        {players.map(player => (
          <List.Item>{player.name}</List.Item>
        ))}
      </List>
      <Button>Start!</Button>
    </Container>
  );
};

export default Board00WaitingForPlayers;
