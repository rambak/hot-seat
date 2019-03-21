import React from 'react';
import { Header, Container } from 'semantic-ui-react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { Timer } from '../../../utils/timer';
import { db } from '../../../config/fbConfig';

export const BoardVoting = ({
  gameRef,
  currentQuestion,
  updateStage,
  inHotSeatName,
  areVotesIn,
  players,
}) => {
  if (areVotesIn) {
    updateStage();
  }
  const answersRef = gameRef.collection('answers');
  const answersCol = useCollection(answersRef);
  let answers = [];

  let answer;

  if (answersCol.value) {
    answersCol.value.docs.forEach(data => {
      answer = data.data().answer;
      if (!answers.includes(answer)) {
        answers.push(answer);
      }
    });
  }

  return (
    <Container textAlign="center">
      <Header style={{ fontSize: '5em' }}>All Answers</Header>
      {answers.map(answer => {
        return <Header>{answer}</Header>;
      })}
      <Timer updateStage={updateStage} time={20} />
    </Container>
  );
};

export default BoardVoting;
