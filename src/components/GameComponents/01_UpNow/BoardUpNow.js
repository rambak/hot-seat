import React from 'react';
import { Container, Header } from 'semantic-ui-react';
import { styles, setTimer } from '../../../utils/timer';

export const BoardUpNow = ({ inHotSeatName, updateStage }) => {
  let timeRemainingInSeconds = setTimer(5);

  if (timeRemainingInSeconds === 0) updateStage();

  return (
    <Container textAlign="center">
      <Header>{inHotSeatName} is in the hot seat!</Header>
      <div style={styles.circle}>
        <div style={styles.count}>{timeRemainingInSeconds}</div>
      </div>
    </Container>
  );
};

export default BoardUpNow;
