import React from 'react';
import { Container, Header } from 'semantic-ui-react';
import { styles, setTimer } from '../../../utils/timer'

export const BoardUpNow = props => {
  if (props.players[0].turnOrder === undefined) {
    return <div>loading</div>;
  }

  const player = props.players.find(player => {
    return player.turnOrder === props.inHotSeat;
  });

  let timeRemainingInSeconds = setTimer()
  if (timeRemainingInSeconds === 0) props.updateStage()

  const name = player.name;

  return (
    <Container textAlign="center">
      <Header>{name} is in the hot seat!</Header>
      <div style={styles.circle}>
      <div style={styles.count}>{timeRemainingInSeconds}</div>
      </div>
    </Container>
  );
};

export default BoardUpNow;
