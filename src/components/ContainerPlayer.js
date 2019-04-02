import React from 'react';
import { db } from '../config/fbConfig';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { useDocument, useCollection } from 'react-firebase-hooks/firestore';
import {
  PlayerWaiting,
  PlayerUpNow,
  PlayerQuestion,
  PlayerVoting,
  PlayerResults,
  PlayerScores,
  PlayerGameOver,
} from '../components/GameComponents';
import PlayerPlayAgainLogin from './GameComponents/00_Waiting/PlayerPlayAgainLogin';
import { Header, Container, Button } from 'semantic-ui-react';

export const ContainerPlayer = props => {
  const { self, isLoggedIn, userCurrentGamePin } = props;
  const pin = props.match.params.pin;

  //Game Information
  let currentStage = '';
  let inHotSeat = null;
  const gameRef = db.collection('games').doc(pin);
  const gameDoc = useDocument(gameRef);
  if (gameDoc.value) {
    try {
      currentStage = gameDoc.value.data().currentStage;
      inHotSeat = gameDoc.value.data().inHotSeat;
    } catch (error) {
      currentStage = '';
    }
  }

  //Player Information
  const players = [];
  const playersRef = gameRef.collection('players');
  const playersCol = useCollection(playersRef);
  if (playersCol.value) {
    playersCol.value.docs.forEach(player => {
      players.push({ ...player.data() });
    });
  }

  const determinePlayerComponent = currentStage => {
    if (
      (!isLoggedIn || userCurrentGamePin !== pin) &&
      !['gameOver', 'waitingForPlayers', ''].includes(currentStage)
    ) {
      return (
        <Container textAlign="center" className="centered-child">
          <Header className="title">Game is currently in session</Header>
          <Button as={Link} to="/login" size="huge" color="orange">
            Return to Login Page
          </Button>
        </Container>
      );
    }
    switch (currentStage) {
      case 'waitingForPlayers':
        if (!isLoggedIn || userCurrentGamePin !== pin) {
          return (
            <PlayerPlayAgainLogin gameRef={gameRef} pin={pin} self={self} />
          );
        } else {
          return <PlayerWaiting />;
        }
      case 'upNow':
        return <PlayerUpNow selfName={self} inHotSeatName={inHotSeat.name} />;
      case 'question':
        return (
          <PlayerQuestion
            name={self}
            inHotSeatName={inHotSeat.name}
            gameRef={gameRef}
          />
        );
      case 'voting':
        return (
          <PlayerVoting
            selfName={self}
            gameRef={gameRef}
            inHotSeatName={inHotSeat.name}
          />
        );
      case 'results':
        return <PlayerResults />;
      case 'scores':
        return <PlayerScores />;
      case 'gameOver':
        return <PlayerGameOver />;
      default:
        return (
          <Container textAlign="center" className="centered-child">
            <Header className="title">
              There was a problem joining this game
            </Header>
            <Button as={Link} to="/login" size="huge" color="orange">
              Return to Login Page
            </Button>
          </Container>
        );
    }
  };

  document.body.classList.add('player');

  if (
    !gameDoc.loading &&
    !playersCol.loading &&
    !['', 'waitingForPlayers', 'scores', 'gameOver'].includes(currentStage)
  ) {
    if (self === inHotSeat.name) {
      document.body.classList.remove('player');
      document.body.classList.add('inHotSeat');
    }
  }
  if (!gameDoc.loading && !playersCol.loading && currentStage === 'scores') {
    document.body.classList.remove('inHotSeat');
    document.body.classList.add('player');
  }

  return gameDoc.loading || playersCol.loading ? (
    <div>loading</div>
  ) : (
    determinePlayerComponent(currentStage)
  );
};

const mapState = state => ({
  self: state.user.name,
  isLoggedIn: state.user.isLoggedIn,
  userCurrentGamePin: state.user.currentGame,
});

export default connect(mapState)(ContainerPlayer);
