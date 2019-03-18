import React from 'react';
import {
  PlayerWaiting,
  PlayerUpNow,
  PlayerQuestion,
  PlayerVoting,
  PlayerResults,
  PlayerScores,
  PlayerGameOver,
} from '../components/GameComponents';

const determinePlayerComponent = currentStage => {
  switch (currentStage) {
    case 'waitingForPlayers':
      return <PlayerWaiting />;
    case 'upNow':
      return <PlayerUpNow />;
    case 'question':
      return <PlayerQuestion />;
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

export default determinePlayerComponent;
