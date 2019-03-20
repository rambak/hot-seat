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
<<<<<<< HEAD

  const prevQuestions = {};
=======
  const prevQuestions = {}
>>>>>>> 93089e40709260645e0041d4a721de97e58bb9cb

  //is everybody gave answers before timeout
  const isEverybodyAnswered = false;

  const updateStage = () => {
    const stages = ['upNow', 'question', 'voting', 'results', 'scores'];
    //prettier-ignore
    const newHotSeat = currentStage === 'waitingForPlayers' ? 0
                     : currentStage === 'scores' ? inHotSeat + 1
                     : inHotSeat;

    const newStage =
      newHotSeat === players.length
        ? 'gameOver'
        : stages[(stages.indexOf(currentStage) + 1) % stages.length];

    gameRef.update({ currentStage: newStage, inHotSeat: newHotSeat });
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
            players={players}
            inHotSeat={inHotSeat}
            updateStage={updateStage}
          />
        );
      case 'question':
<<<<<<< HEAD
        return <BoardQuestion prevQuestions={prevQuestions} />;
=======
        return <BoardQuestion
               prevQuestions={prevQuestions}
               updateStage={updateStage}
               isEverybodyAnswered={isEverybodyAnswered}
               />;
>>>>>>> 93089e40709260645e0041d4a721de97e58bb9cb
      case 'voting':
        return <BoardVoting
                gameRef={gameRef}
                updateStage={updateStage}
                players={players}
                isEverybodyAnswered={isEverybodyAnswered}
               />;
      case 'results':
        return <BoardResults gameRef={gameRef} />;
      case 'scores':
        return <BoardScores players={players} inHotSeat={inHotSeat} />;
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
