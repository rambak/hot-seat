import React from 'react';
import { Container, Form, Button, Message, Header } from 'semantic-ui-react';
import PlayerWaiting from './PlayerWaiting';

class PlayerLogin extends React.Component {
  constructor() {
    super();
    this.state = {
      errors: [],
      loggedIn: false,
      enteredName: '',
    };
  }

  componentDidMount() {
    this.setState({ enteredName: this.props.self });
  }

  handleChange(event) {
    this.setState({ enteredName: event.target.value });
  }

  onSubmit = async event => {
    event.preventDefault();
    const { enteredName } = this.state;
    await this.setState({ errors: [] });
    if (enteredName === '') {
      await this.setState({
        errors: [...this.state.errors, 'Please make sure to enter a name.'],
      });
    }

    if (this.state.errors.length === 0) {
      const { gameRef } = this.props;

      if (this.state.errors.length === 0) {
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
          await playersRef.doc(enteredName).set({
            name: enteredName,
          });
          this.setState({ loggedIn: true });
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
              <input name="name" value={this.state.enteredName} />
            </Form.Field>
            <Button type="submit" color="blue" size="huge">
              Join!
            </Button>
          </Form>
        </Container>
      );
  }
}

export default PlayerLogin;
