import React from 'react';
import { Container, Header } from 'semantic-ui-react';
import { updateStage } from './../../../utils/';

export const BoardUpNow = () => {
  // const gameRef = this.props.gameRef;
  // const game = await gameRef.get();
  // const players = await gameRef
  //   .collection('players')
  //   .where('turnOrder', '==', game.data().inHotSeat)
  //   .get();
  //   this.setState({ hotSeatName: players.docs[0].data().name });
  // window.setTimeout(updateStage, 30000);

  const name = 'Anna';

  return (
    <Container textAlign="center">
      <Header>{name} is in the hot seat!</Header>
    </Container>
  );
};

export default BoardUpNow;
