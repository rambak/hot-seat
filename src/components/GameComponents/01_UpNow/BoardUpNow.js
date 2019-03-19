import React from 'react';
import { Container, Header } from 'semantic-ui-react';

export const BoardUpNow = props => {
  if (props.players[0].turnOrder === undefined) {
    return <div>loading</div>;
  }

  const player = props.players.find(player => {
    return player.turnOrder === props.inHotSeat;
  });

  const name = player.name;
  window.setTimeout(() => props.updateStage(), 10000);

  return (
    <Container textAlign="center">
      <Header>{name} is in the hot seat!</Header>
    </Container>
  );
};

export default BoardUpNow;
