import React from 'react';
import { Container, Form, Button, Message, Header } from 'semantic-ui-react';
import { setUser } from '../store/reducers/user';
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
    const enteredPin = event.target.pin.value.toLowerCase();
    const enteredName = event.target.name.value;
    await this.setState({ errors: [] });
    if (enteredPin === '') {
      this.addError('Please make sure to enter a pin.');
    }
    if (enteredName === '') {
      this.addError('Please make sure to enter a name.');
    }

    if (this.state.errors.length === 0) {
      //check if the entered pin code exists
      const gameRef = db.collection('games').doc(enteredPin);
      const docExists = await gameRef.get().then(async doc => {
        if (doc.exists && !(doc.data().currentStage === 'waitingForPlayers')) {
          this.addError(`This game (${enteredPin}) is already in progress.`);
        }
        return doc.exists;
      });

      if (this.state.errors.length === 0) {
        if (docExists) {
          db.runTransaction(async t => {
            const trans = await t.get(gameRef);
            if (trans.data().playerCount === 10) {
              this.addError(`Number of players can't exceed 10`);
            } else {
              const playersRef = db
                .collection('games')
                .doc(enteredPin)
                .collection('players');
              const player = (await t.get(playersRef.doc(enteredName))).data()
              if (player) {
                this.addError(
                  `A player with the same name (${enteredName}) already joined. Please choose a different name.`
                );
              } else {
                 t.set(
                  db
                    .collection('games')
                    .doc(enteredPin)
                    .collection('players')
                    .doc(enteredName),
                  {
                    name: enteredName,
                  }
                );
                t.update(gameRef, {
                  playerCount: trans.data().playerCount
                    ? trans.data().playerCount + 1
                    : 1,
                });
                this.props.setUser(enteredName, enteredPin);
                this.props.history.push(`/${enteredPin}`);
              }
            }
          });
        } else {
          this.addError(
            `There is no game matching this pin (${enteredPin}). Please enter a different pin.`
          );
        }
      }
    }
  };

  addError = async message => {
    if (!this.state.errors.includes(message)) {
      await this.setState({
        errors: [...this.state.errors, message],
      });
    }
  };

  render() {
    return (
      <Container className="centered-child">
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
            <Header>PIN:</Header>
            <input name="pin" maxLength="4" />
          </Form.Field>
          <Form.Field>
            <Header>Name:</Header>
            <input name="name" maxLength="12" />
          </Form.Field>
          <Button type="submit" color="blue" size="huge">
            Join!
          </Button>
        </Form>
      </Container>
    );
  }
}

const mapDispatch = dispatch => ({
  setUser: (name, gamePin) => dispatch(setUser(name, gamePin)),
});

export default connect(
  null,
  mapDispatch
)(withRouter(PlayerLogin));
