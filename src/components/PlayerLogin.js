import React from 'react';
import { Container, Form, Button, Message } from 'semantic-ui-react';
import { setUser } from '../store/reducers/user';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import firebase, { db, auth } from '../config/fbConfig';

class PlayerLogin extends React.Component {
  constructor() {
    super();
    this.state = {
      errors: [],
    };
  }

  onSubmit = async event => {
    event.preventDefault();
    const enteredPin = event.target.pin.value.toLowerCase();
    const enteredName = event.target.name.value;
    await this.setState({ errors: [] });
    if (enteredPin === '') {
      await this.setState({
        errors: [...this.state.errors, 'Please make sure to enter a pin.'],
      });
    }
    if (enteredName === '') {
      await this.setState({
        errors: [...this.state.errors, 'Please make sure to enter a name.'],
      });
    }

    if (this.state.errors.length === 0) {
      //check if the entered pin code exists
      const gameRef = db.collection('games').doc(enteredPin);

      const docExists = await gameRef.get().then(async doc => {
        if (
          doc.exists &&
          !(
            doc.data().currentStage === 'waitingForPlayers' ||
            doc.data().currentStage === 'waitingForPlayersNew'
          )
        ) {
          await this.setState({
            errors: [
              ...this.state.errors,
              `This game (${enteredPin}) is already in progress.`,
            ],
          });
        }
        return doc.exists;
      });

      if (this.state.errors.length === 0) {
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

          if (playerNameExists) {
            await this.setState({
              errors: [
                ...this.state.errors,
                `A player with the same name (${enteredName}) already joined. Please choose a different name.`,
              ],
            });
          } else {
            auth
              .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
              .then(() => {
                return auth.signInAnonymously();
              })

              .then(function(cred) {
                return cred.user.updateProfile({ displayName: enteredName });
              })
              .catch(function(error) {
                console.log(error);
              });

            await db
              .collection('games')
              .doc(enteredPin)
              .collection('players')
              .doc(enteredName)
              .set({
                name: enteredName,
              });
            this.props.history.push(`/${enteredPin}`);
          }
        } else {
          await this.setState({
            errors: [
              ...this.state.errors,
              `There is no game matching this pin (${enteredPin}). Please enter a different pin.`,
            ],
          });
        }
      }
    }
  };

  render() {
    return (
      <Container textAlign="center" style={{ paddingTop: '5vh' }}>
        {this.state.errors.length > 0 && (
          <Message negative>
            <Message.Header>We encountered an error</Message.Header>
            <Message.List>
              {this.state.errors.map((error, idx) => {
                return <Message.Item key={idx}>{error}</Message.Item>;
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
  setUser: name => dispatch(setUser(name)),
});

export default connect(
  null,
  mapDispatch
)(withRouter(PlayerLogin));
