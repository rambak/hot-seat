import React, { useState, useEffect } from 'react';
import { db, auth } from '../config/fbConfig';
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

export const ContainerPlayer = props => {
  const [self, setSelf] = useState('');
  let user = auth.currentUser;
  useEffect(() => {
    if (user) {
      setSelf(user.displayName);
    }
  }, [user]);

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
        return <PlayerUpNow selfName={self} inHotSeatName={inHotSeat.name} />;
      case 'question':
        return <PlayerQuestion name={self} gameRef={gameRef} />;
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
        return <></>;
    }
  };

  return gameDoc.loading || playersCol.loading ? (
    <div>loading</div>
  ) : (
    determinePlayerComponent(currentStage)
  );
};

export default ContainerPlayer;
