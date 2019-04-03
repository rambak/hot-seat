import React from 'react';
import { useDocument, useCollection } from 'react-firebase-hooks/firestore';
import { db } from '../config/fbConfig';
import { connect } from 'react-redux';
import { Header, Container } from 'semantic-ui-react';
import ReturnToLoginButton from './ReturnToLoginButton';
import {
  PlayerWaiting,
  PlayerUpNow,
  PlayerQuestion,
  PlayerVoting,
  PlayerResults,
  PlayerScores,
  PlayerGameOver,
} from '../components/GameComponents';
import Login from './LoginComponents/LoginPage';

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
          <ReturnToLoginButton />
        </Container>
      );
    }
    switch (currentStage) {
      case 'waitingForPlayers':
        if (!isLoggedIn || userCurrentGamePin !== pin) {
          return <Login pin={pin} self={self} type="specificGameLogin" />;
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
            <ReturnToLoginButton />
          </Container>
        );
    }
  };

  //Styling Based on Role in Game
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

  //Return Statement
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
