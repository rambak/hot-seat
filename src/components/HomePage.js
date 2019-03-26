import React, { useState } from 'react';
import {
  Button,
  Container,
  Header,
  Image,
  Card,
  Divider,
  Segment,
  Grid,
  Label,
} from 'semantic-ui-react';
import { db } from '../config/fbConfig';
import InstructionsModal from './InstructionsModal';

const HomePage = props => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);

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
    console.log('I GOT HERE');

    do {
      pin = generate();
      console.log('Pin', pin);
      gameExists = await db
        .collection('games')
        .doc(pin)
        .get()
        .then(doc => {
          return doc.exists;
        });
      console.log('gameExists', gameExists);
    } while (gameExists);
    console.log('I GOT TO PIN', pin);

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
    <>
      <Container className="centered-child" textAlign="center">
        <InstructionsModal modalOpen={modalOpen} handleClose={handleClose} />
        <Header className="title">Welcome to Hot Seat!</Header>
        <Label
          onClick={handleOpen}
          content="How to Play"
          circular
          color="blue"
          size="big"
        />
        <br />
        <br />
        <Card.Group centered>
          <Grid stackable reversed="mobile" columns="equal">
            <Grid.Column>
              <Card className="homepage">
                <Card.Content>
                  <Card.Header>Hosts</Card.Header>
                  <Divider />
                  <Segment basic>
                    <Image centered src="/images/monitor-100.png" />
                  </Segment>
                </Card.Content>
                <Button className="button" onClick={generatePin}>
                  Host a game
                </Button>
              </Card>
            </Grid.Column>
            <Grid.Column>
              <Card className="homepage">
                <Card.Content>
                  <Card.Header>Players</Card.Header>
                  <Divider />
                  <Segment basic>
                    <Image centered src="/images/smartphone-tablet-100.png" />
                  </Segment>
                </Card.Content>
                <Button
                  onClick={() => {
                    props.history.push('/login');
                  }}
                >
                  Join a game
                </Button>
              </Card>
            </Grid.Column>
          </Grid>
        </Card.Group>
        {/* <Image src="../.././hotseat.png" className="hotseat" /> */}
      </Container>
    </>
  );
};

export default HomePage;
