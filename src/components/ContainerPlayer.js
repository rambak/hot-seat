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
            self={props.self}
            players={players}
            inHotSeat={inHotSeat}
          />
        );
      case 'question':
        return <PlayerQuestion name={props.self.name} gameRef={gameRef} />;
      case 'voting':
        return <PlayerVoting />;
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
