import React from 'react';
import { db } from '../config/fbConfig';
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
import { connect } from 'react-redux';

export const ContainerPlayer = props => {
  const pin = props.match.params.pin;

  //Game Information
  let currentStage = '';
  let inHotSeat = null;
  const gameRef = db.collection('games').doc(pin);
  const gameDoc = useDocument(gameRef);
  if (gameDoc.value) {
    currentStage = gameDoc.value.data().currentStage;
    inHotSeat = gameDoc.value.data().inHotSeat;
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
    switch (currentStage) {
      case 'waitingForPlayers':
        return <PlayerWaiting />;
      case 'upNow':
        return (
          <PlayerUpNow
            selfName={props.self.name}
            inHotSeatName={inHotSeat.name}
          />
        );
      case 'question':
        return <PlayerQuestion name={props.self.name} inHotSeatName={inHotSeat.name} gameRef={gameRef} />;
      case 'voting':
        return (
          <PlayerVoting
            selfName={props.self.name}
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
        return <></>;
    }
  };

  if (!gameDoc.loading && !playersCol.loading && currentStage !== '' && currentStage !== 'waitingForPlayers' && currentStage !== 'scores' && currentStage !== 'gameOver') {
    if (props.self.name === inHotSeat.name) {
      document.body.classList.add('inHotSeat');
    }
  }
  if (!gameDoc.loading && !playersCol.loading && currentStage === 'scores') {
    document.body.classList.remove('inHotSeat');
  }

  return gameDoc.loading || playersCol.loading ? (
    <div>loading</div>
  ) : (
      determinePlayerComponent(currentStage)
  );
};

const mapState = state => ({
  self: state.user,
});

export default connect(mapState)(ContainerPlayer);
