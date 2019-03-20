// import { determineBoardComponent } from '../utils';
import { db } from '../config/fbConfig';
import React from 'react';
import { useDocument, useCollection } from 'react-firebase-hooks/firestore';
import {
  BoardWaiting,
  BoardUpNow,
  BoardQuestion,
  BoardVoting,
  BoardResults,
  BoardScores,
  BoardGameOver,
} from '../components/GameComponents';

export const ContainerBoard = props => {
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

  //Questions

  const prevQuestions = {};

  const updateStage = async () => {
    const stages = ['upNow', 'question', 'voting', 'results', 'scores'];
    //prettier-ignore

    if(inHotSeat === undefined) {
      const gameDoc = await gameRef.get()
      inHotSeat = await gameDoc.data().inHotSeat
    }

    const newStage =
      currentStage === 'scores' && !inHotSeat.nextPlayer
        ? 'gameOver'
        : stages[(stages.indexOf(currentStage) + 1) % stages.length];

    let newHotSeat;
    if (currentStage === 'gameOver') {
      newHotSeat = null;
    } else if (currentStage !== 'scores') {
      newHotSeat = inHotSeat;
    } else {
      const newHotSeatName = inHotSeat.nextPlayer;

      const nextPlayerDoc = await playersRef.doc(newHotSeatName).get();
      const nextPlayer = nextPlayerDoc.data().nextPlayer;
      newHotSeat = {
        name: newHotSeatName,
        nextPlayer: nextPlayer,
      };
    }

    const updateGameObj = { currentStage: newStage };
    if (newHotSeat !== undefined) {
      updateGameObj.inHotSeat = newHotSeat;
    }

    await gameRef.update(updateGameObj);
  };

  const determineBoardComponent = currentStage => {
    switch (currentStage) {
      case 'waitingForPlayers':
        return (
          <BoardWaiting
            players={players}
            updateStage={updateStage}
            pin={pin}
            gameRef={gameRef}
          />
        );
      case 'upNow':
        return (
          <BoardUpNow
            inHotSeatName={inHotSeat.name}
            updateStage={updateStage}
          />
        );
      case 'question':
        return (
          <BoardQuestion
            prevQuestions={prevQuestions}
            updateStage={updateStage}
          />
        );
      case 'voting':
        return (
          <BoardVoting
            gameRef={gameRef}
            updateStage={updateStage}
            players={players}
          />
        );
      case 'results':
        return <BoardResults />;
      case 'scores':
        return <BoardScores players={players} inHotSeatName={inHotSeat.name} />;
      case 'gameOver':
        return <BoardGameOver />;
      default:
        return <></>;
    }
  };

  return gameDoc.loading || playersCol.loading ? (
    <div>loading</div>
  ) : (
    determineBoardComponent(currentStage)
  );
};

export default ContainerBoard;
