import React from 'react';
import { Container, Form, Button, Message, Header } from 'semantic-ui-react';
import { setUser } from '../../store/reducers/user';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { db } from '../../config/fbConfig';
import GamePinInput from './GamePinInput';
import NameInput from './NameInput';

class LoginPage extends React.Component {
  constructor() {
    super();
    this.state = {
      errors: [],
      loggedIn: false,
      enteredName: '',
      enteredPin: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    if (this.props.type === 'specificGameLogin') {
      this.setState({
        enteredPin: this.props.pin,
        enteredName: this.props.self,
      });
    }
  }

  handleChange(e, { name, value }) {
    this.setState({ [name]: value });
  }

  addError = async message => {
    if (!this.state.errors.includes(message)) {
      await this.setState({
        errors: [...this.state.errors, message],
      });
    }
  };

  onSubmit = async event => {
    event.preventDefault();
    let { enteredName, enteredPin } = this.state;
    enteredPin = enteredPin.toLowerCase();
    const gameRef = db.collection('games').doc(enteredPin);
    await this.setState({ errors: [] });

    //checking pin on loginPage
    if (this.props.type === 'loginPage') {
      //first check if they entered a pin
      if (enteredPin.length < 4) {
        this.addError('Please make sure to enter a four-letter pin.');
      }

      if (this.state.errors.length === 0) {
        //check if the entered pin code exists
        await gameRef.get().then(async doc => {
          if (
            doc.exists &&
            !(doc.data().currentStage === 'waitingForPlayers')
          ) {
            this.addError(`This game (${enteredPin}) is already in progress.`);
          } else if (!doc.exists) {
            this.addError(
              `There is no game matching this pin (${enteredPin}). Please enter a different pin.`
            );
          }
        });
      }
    }

    //checking name has been entered on both pages
    if (enteredName === '') {
      this.addError('Please make sure to enter a name.');
    }

    //Transaction to check player count is not greater than 10 and that no player with that name is already in the game before adding player to game
    if (this.state.errors.length === 0) {
      db.runTransaction(async t => {
        const trans = await t.get(gameRef);
        if (trans.data().playerCount === 10) {
          this.addError(`Number of players can't exceed 10`);
        } else {
          const playersRef = db
            .collection('games')
            .doc(enteredPin)
            .collection('players');
          const player = (await t.get(playersRef.doc(enteredName))).data();
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

            if (this.props.type === 'loginPage') {
              this.props.history.push(`/${enteredPin}`);
            }
          }
        }
      });
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
        {this.props.type === 'specificGameLogin' && (
          <Header className="title">Join game {this.state.enteredPin}</Header>
        )}
        <Form onSubmit={this.onSubmit}>
          {this.props.type === 'loginPage' && (
            <GamePinInput
              pin={this.state.enteredPin}
              handleChange={this.handleChange}
            />
          )}
          <NameInput
            name={this.state.enteredName}
            handleChange={this.handleChange}
          />
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
)(withRouter(LoginPage));
