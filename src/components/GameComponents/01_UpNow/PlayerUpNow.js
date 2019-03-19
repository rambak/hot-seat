import React from 'react';
import { connect } from 'react-redux';
import { Container, Header } from 'semantic-ui-react';

export const PlayerUpNow = props => {
  // const player = props.players.find(player => {
  //   return player.data().order === props.inHotSeat;
  // });

  // const name = player.data().name;
  const name = 'PLACEHOLDER';
  return (
    <Container textAlign="center">
      {/* {name === props.myName ? (
        <Header>You are in the hot seat!</Header>
      ) : ( */}
      <Header>{name} is in the hot seat!</Header>
      {/* )} */}
    </Container>
  );
};

const mapStateToProps = state => {
  return {
    myName: state.user.name,
  };
};

export default connect(mapStateToProps)(PlayerUpNow);
