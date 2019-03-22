import React, { useEffect } from 'react';
import { Header, Container } from 'semantic-ui-react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { Timer } from '../../../utils/timer';

export const BoardVoting = ({
  gameRef,
  currentQuestion,
  updateStage,
  inHotSeatName,
  areVotesIn,
  players,
}) => {
  useEffect(() => {
    if (areVotesIn) {
      updateStage();
    }
  }, [areVotesIn]);
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

    <Container textAlign="center" style={{ paddingTop: '30vh' }}>
      <Header className="question">Question: {currentQuestion}</Header>
      <Header style={{ fontSize: '7vh' }}>
        Guess {inHotSeatName}'s answer:
      </Header>

      {answers.map(answer => {
        return <Header>{answer}</Header>;
      })}
      <Timer updateStage={updateStage} time={20} />
    </Container>
  );
};

export default BoardVoting;
