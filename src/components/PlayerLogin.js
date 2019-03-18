import React from 'react';
import { Container, Form, Button, Message } from 'semantic-ui-react';
import { getUser } from '../store/reducers/user';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { db } from '../config/fbConfig';

class PlayerLogin extends React.Component {
  constructor() {
    super();
    this.state = {
      errors: [],
    };
  }

  onSubmit = async event => {
    event.preventDefault();
    const enteredPin = event.target.pin.value;
    const enteredName = event.target.name.value;
    this.setState({ errors: [] });
    //check if the entered pin code exists
    const gameRef = db.collection('games').doc(enteredPin);

    const docExists = await gameRef.get().then(doc => {
      return doc.exists;
    });

    if (docExists) {
      const playersRef = db
        .collection('games')
        .doc(enteredPin)
        .collection('players');

      const playerNameExists = await playersRef
        .where('name', '==', enteredName)
        .get()
        .then(function(querySnapshot) {
          return querySnapshot.docs.length > 0;
        });

      console.log(playerNameExists);

      if (playerNameExists) {
        this.setState({
          errors: [
            ...this.state.errors,
            `A player with the same name (${enteredName}) already joined. Please choose a different name.`,
          ],
        });
      } else {
        console.log('Entering the game :)');
        db.collection('games')
          .doc(enteredPin)
          .collection('players')
          .doc(enteredName)
          .set({
            name: enteredName,
          });
        this.props.getUser(enteredName, enteredPin);
        this.props.history.push(`/game/${enteredPin}`);
      }
    } else {
      this.setState({
        errors: [
          ...this.state.errors,
          `There is no game matching this pin (${enteredPin}). Please enter a different pin.`,
        ],
      });
    }
  };

  render() {
    return (
      <Container textAlign="center">
        {this.state.errors.length > 0 && (
          <Message negative>
            <Message.Header>We encountered an error</Message.Header>
            <Message.List>
              {this.state.errors.map(error => {
                return <Message.Item>{error}</Message.Item>;
              })}
            </Message.List>
          </Message>
        )}
        <Form onSubmit={this.onSubmit}>
          <Form.Field>
            <label>PIN:</label>
            <input name="pin" />
          </Form.Field>
          <Form.Field>
            <label>Name:</label>
            <input name="name" />
          </Form.Field>
          <Button type="submit">Join!</Button>
        </Form>
      </Container>
    );
  }
}

const mapDispatch = dispatch => ({
  getUser: (name, pin) => dispatch(getUser(name, pin)),
});

export default connect(
  null,
  mapDispatch
)(withRouter(PlayerLogin));
