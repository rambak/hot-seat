import React from 'react';
import { Container, Form, Button, Message, Header } from 'semantic-ui-react';
import firebase, { auth } from '../../../config/fbConfig';
import PlayerWaiting from './PlayerWaiting';

class PlayerLogin extends React.Component {
  constructor() {
    super();
    this.state = {
      errors: [],
      loggedIn: false,
    };
  }

  onSubmit = async event => {
    event.preventDefault();
    const enteredName = event.target.name.value;
    await this.setState({ errors: [] });
    if (enteredName === '') {
      await this.setState({
        errors: [...this.state.errors, 'Please make sure to enter a name.'],
      });
    }

    if (this.state.errors.length === 0) {
      //check if the entered pin code exists
      const { gameRef } = this.props;

      const docExists = await gameRef.get().then(async doc => doc.exists);

      if (this.state.errors.length === 0) {
        if (docExists) {
          const playersRef = gameRef.collection('players');

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

            await playersRef.doc(enteredName).set({
              name: enteredName,
            });
            this.setState({ loggedIn: true });
          }
        } else {
          await this.setState({
            errors: [
              ...this.state.errors,
              `There is no game matching this pin (${
                this.props.pin
              }). Please enter a different pin.`,
            ],
          });
        }
      }
    }
  };

  render() {
    if (this.state.loggedIn) return <PlayerWaiting />;
    else
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
          <Header as="h2">Play game {this.props.pin} again</Header>
          <Form onSubmit={this.onSubmit}>
            <Form.Field>
              <Header as="h1">Name:</Header>
              <input name="name" />
            </Form.Field>
            <Button type="submit" color="blue" size="huge">Join!</Button>
          </Form>
        </Container>
      );
  }
}

export default PlayerLogin;
