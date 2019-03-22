import React from 'react';
import { Button, Container, Header, Image } from 'semantic-ui-react';
import { db } from '../config/fbConfig';

const HomePage = props => {
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

    let pin = '';
    for (let i = 0; i < 4; i++) {
      pin += alphabet[randomIdx()];
    }

    return pin;
  };

  const generatePin = async () => {
    let pin;
    let gameExists;

    do {
      pin = generate();
      gameExists = await db
        .collection('games')
        .doc(pin)
        .get()
        .then(doc => {
          return doc.exists;
        });
    } while (gameExists);

    db.collection('games')
      .doc(pin)
      .set({
        currentStage: 'waitingForPlayers',
      })
      .catch(function(error) {
        console.error('Error writing document: ', error);
      });

    props.history.push(`/${pin}/game-board`);
  };

  return (
    <Container textAlign="center" style={{ paddingTop: '20vh' }}>
      <Header className="title">Welcome to Hot Seat!</Header>
      <Button.Group>
      <Button  className = "button" onClick={generatePin}>Create a new Game</Button>
      <Button
        onClick={() => {
          props.history.push('/login');
        }}
      >
        Enter a Game
      </Button>
      </Button.Group>
      <Image src='../.././hotseat.png' className = "hotseat" />
    </Container>
  );
};

export default HomePage;
