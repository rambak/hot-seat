import React from 'react';
import {
  Button,
  Container,
  Header,
  Image,
  Card,
  Divider,
  Segment,
  Grid,
} from 'semantic-ui-react';
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
    <Container className="centered-child" textAlign="center">
      <Header className="title">Welcome to Hot Seat!</Header>
      <Card.Group centered>
        <Grid stackable reversed="mobile" columns="equal">
          <Grid.Column only="mobile">
            To host a game please use a device with a larger screen such as a
            tablet or a laptop.
          </Grid.Column>
          <Grid.Column only="computer tablet">
            <Card className="homepage">
              <Card.Content>
                <Card.Header>Hosts</Card.Header>
                <Divider />
                <Segment basic>
                  <Image centered src="/images/monitor-100.png" />
                  <Divider />
                  [Placeholder] If you are a host click here [Placeholder]
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
                  <Divider />
                  [Placeholder] If you are a player click here [Placeholder]
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
      <Image src="../.././hotseat.png" className="hotseat" />
    </Container>
  );
};

export default HomePage;
