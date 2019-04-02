import React from 'react';
import { Header, Container } from 'semantic-ui-react';
import { logOutUser } from '../../../store/reducers/user';
import { connect } from 'react-redux';

export const PlayerGameOver = props => {
  props.logOutUser();

  return (
    <Container className="centered-child">
      <Header className="title" textAlign="center">
        Game is over!
      </Header>
    </Container>
  );
};

const mapDispatch = dispatch => ({
  logOutUser: () => dispatch(logOutUser()),
});

export default connect(
  null,
  mapDispatch
)(PlayerGameOver);
