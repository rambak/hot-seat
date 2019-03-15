import React, { Component } from 'react';
import { Button, Container, Header } from 'semantic-ui-react';
import { db } from '../config/fbConfig';
import { connect } from 'react-redux';
import { setBoard } from '../store/reducers/user';

const generate = () => {
  const alphabet = [
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z',
  ];
  const randomIdx = () => {
    return Math.floor(Math.random() * alphabet.length + 0);
  };

  let pincode = '';
  for (let i = 0; i < 4; i++) {
    pincode += alphabet[randomIdx()];
  }

  return pincode;
};

export class HomePage extends Component {
  generatePinCode = async () => {
    let gamePinCode = generate();

    const allPinCodes = [];
    await db
      .collection('games')
      .get()
      .then(querySnapshot => {
        querySnapshot.docs.forEach(doc => {
          allPinCodes.push(doc.id);
        });
      });

    while (allPinCodes.includes(gamePinCode)) {
      gamePinCode = generate();
    }

    db.collection('games')
      .doc(gamePinCode)
      .set({
        currentStage: 'waitingForPlayers',
      })
      .then(function() {
        console.log('Document successfully written!');
      })
      .catch(function(error) {
        console.error('Error writing document: ', error);
      });

    this.props.setBoard();
    this.props.history.push(`/game/${gamePinCode}`);
  };

  render() {
    return (
      <Container textAlign="center">
        <Header>Welcome, to Hot Seat Game!</Header>
        <Button
          onClick={() => {
            this.generatePinCode();
          }}
        >
          Start a new Game
        </Button>
        <Button>Enter a Game</Button>
      </Container>
    );
  }
}

const mapDispatch = dispatch => ({
  setBoard: () => dispatch(setBoard()),
});

export default connect(
  null,
  mapDispatch
)(HomePage);
