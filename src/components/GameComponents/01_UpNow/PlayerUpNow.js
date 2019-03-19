import React from 'react';
import { Container, Header } from 'semantic-ui-react';

export const PlayerUpNow = props => {
  if (props.players[0].turnOrder === undefined) {
    return <div>loading</div>;
  }

  const player = props.players.find(player => {
    return player.turnOrder === props.inHotSeat;
  });

  const name = player.name;
  return (
    <Container textAlign="center">
      {name === props.self.name ? (
        <Header>You are in the hot seat!</Header>
      ) : (
        <Header>{name} is in the hot seat!</Header>
      )}
    </Container>
  );
};

export default PlayerUpNow;
