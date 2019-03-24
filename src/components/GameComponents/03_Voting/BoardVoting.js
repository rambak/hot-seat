import React, { useEffect } from 'react';
import { Header, Container, Segment } from 'semantic-ui-react';
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
      <Header style={{ fontSize: '5em' }}>Question:</Header>
      <Header style={{ fontSize: '4em' }}>{currentQuestion}</Header>
      <Header style={{ fontSize: '5em' }}>
        Guess {inHotSeatName}'s answer:
      </Header>

      {answers.sort().map(answer => {
        return <Segment className="answers">{answer}</Segment>;
      })}
      <Timer updateStage={updateStage} time={60} />
    </Container>
  );
};

export default BoardVoting;
