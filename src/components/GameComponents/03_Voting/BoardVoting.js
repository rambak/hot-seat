import React from 'react';
import { Header, Container } from 'semantic-ui-react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { Timer } from '../../../utils/timer';
// import { db } from '../../../config/fbConfig';

export const BoardVoting = ({
  gameRef,
  currentQuestion,
  updateStage,
  inHotSeatName,
  areVotesIn,
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

  // if (areVotesIn) {
  //   const correctAnswerVoters = gameRef
  //     .collection('answers')
  //     .doc(inHotSeatName)
  //     .get()
  //     .then(function(doc) {
  //       return doc.playersVote;
  //     });

  //     const batch = db.runTransaction;
  // correctAnswerVoters.forEach()
  // batch.update();
  // batch.commit();

  // }

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
