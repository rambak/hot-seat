import React from 'react';
import { connect } from 'react-redux';
import { Container, Header } from 'semantic-ui-react';

export const PlayerUpNow = () => {
  return <div>PLAYER UP NOW COMPONENT</div>;

  // render() {
  //   //TODO: retrieve the name of current person in the hot seat
  //   const name = 'Anna';

  //   return (
  //     <Container textAlign="center">
  //       {/* Change to say "You are in the hot seat if the name matches the player's name" */}
  //       <Header>Player screen: {name} is in the hot seat!</Header>
  //     </Container>
  //   );
  // }
};

const mapStateToProps = state => {
  return {
    myName: state.user.name,
  };
};

export default connect(mapStateToProps)(PlayerUpNow);