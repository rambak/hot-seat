import React from 'react';
import { Header, Container } from 'semantic-ui-react';
import { useCollection } from 'react-firebase-hooks/firestore';

export const BoardVoting = ({
  gameRef,
  currentQuestion,
  updateStage,
  inHotSeatName,
}) => {
  const answersRef = gameRef.collection('answers');
  const answersCol = useCollection(answersRef);
  let answers = [];
  if (answersCol.value) {
    answersCol.value.docs.forEach(data => {
      const answer = data.data().answer;
      if (!answers.includes(answer)) {
        answers.push(answer);
      }
    });
  }

  return (
    <Container>
      <Header as="h2">Guess {inHotSeatName}'s answer!</Header>
      <Header as="h1">Question: {currentQuestion}</Header>
      {answers.map((answer, idx) => {
        return <Header key={idx}>{answer}</Header>;
      })}
    </Container>
  );
};

export default BoardVoting;
