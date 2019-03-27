// import { determineBoardComponent } from '../utils';
import { db } from '../config/fbConfig';
import React, { useState } from 'react';
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
import calculateScores from '../utils/calculateScores';

export const ContainerBoard = props => {
  const pin = props.match.params.pin;

  //Game Information
  let currentStage = '';
  let inHotSeat = null;
  let answerCount = 0;
  let voteCount = 0;

  const gameRef = db.collection('games').doc(pin);
  const gameDoc = useDocument(gameRef);
  if (gameDoc.value) {
    voteCount = gameDoc.value.data().voteCount;
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

  //AnswerCounting
  const answersRef = gameRef.collection('answers');
  const answersCol = useCollection(answersRef);
  if (answersCol.value) {
    answerCount = answersCol.value.docs.length;
  }

  //Questions
  const [questions, setQuestions] = useState({
    currentQuestion: null,
    prevQuestions: {},
  });

  const updateStage = async () => {
    const stages = ['upNow', 'question', 'voting', 'results', 'scores'];
    //prettier-ignore
    if (inHotSeat === undefined) {
      const gameDoc = await gameRef.get();
      inHotSeat = await gameDoc.data().inHotSeat;
    }

    const newStage =
      currentStage === 'scores' && !inHotSeat.nextPlayer
        ? 'gameOver'
        : stages[(stages.indexOf(currentStage) + 1) % stages.length];
    if (newStage === 'results') {
      calculateScores(gameRef, inHotSeat.name, players);
    }

    let newHotSeat;
    if (currentStage === 'gameOver') {
      newHotSeat = null;
    } else if (currentStage !== 'scores') {
      newHotSeat = inHotSeat;
    } else {
      const newHotSeatName = inHotSeat.nextPlayer;

      if (newHotSeatName !== null) {
        const nextPlayerDoc = await playersRef.doc(newHotSeatName).get();
        const nextPlayer = nextPlayerDoc.data().nextPlayer;
        newHotSeat = {
          name: newHotSeatName,
          nextPlayer: nextPlayer,
        };
      }
    }

    const updateGameObj = { currentStage: newStage };
    if (newHotSeat !== undefined) {
      updateGameObj.inHotSeat = newHotSeat;
    }

    gameRef.update(updateGameObj);
  };

  const determineBoardComponent = currentStage => {
    switch (currentStage) {
      case 'waitingForPlayers':
      case 'waitingForPlayersNew':
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
            inHotSeat={inHotSeat}
            gameRef={gameRef}
            questions={questions}
            setQuestions={setQuestions}
            updateStage={updateStage}
            areAnswersIn={answerCount === players.length}
          />
        );
      case 'voting':
        return (
          <BoardVoting
            gameRef={gameRef}
            currentQuestion={questions.currentQuestion}
            updateStage={updateStage}
            players={players}
            inHotSeatName={inHotSeat.name}
            areVotesIn={voteCount === players.length - 1}
          />
        );
      case 'results':
        return (
          <BoardResults
            gameRef={gameRef}
            inHotSeat={inHotSeat.name}
            updateStage={updateStage}
            players={players}
          />
        );
      case 'scores':
        return (
          <BoardScores
            players={players}
            inHotSeatName={inHotSeat.name}
            updateStage={updateStage}
            gameRef={gameRef}
          />
        );
      case 'gameOver':
        return (
          <BoardGameOver
            players={players}
            gameRef={gameRef}
            setQuestions={setQuestions}
          />
        );
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
