import React from 'react';
import {
  BoardWaiting,
  BoardUpNow,
  BoardQuestion,
  BoardVoting,
  BoardResults,
  BoardScores,
  BoardGameOver,
} from '../components/GameComponents';

const determineBoardComponent = currentStage => {
  switch (currentStage) {
    case 'waitingForPlayers':
      return <BoardWaiting />;
    case 'upNow':
      return <BoardUpNow />;
    case 'question':
      return <BoardQuestion />;
    case 'voting':
      return <BoardVoting />;
    case 'results':
      return <BoardResults />;
    case 'scores':
      return <BoardScores />;
    case 'gameOver':
      return <BoardGameOver />;
    default:
      return <></>;
  }
};

export default determineBoardComponent;
