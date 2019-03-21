import React from 'react';
import { Header, Container } from 'semantic-ui-react'
import { useCollection } from 'react-firebase-hooks/firestore';
import { Timer } from '../../../utils/timer'

export const BoardVoting = ({ gameRef, updateStage }) => {
  const answersRef = gameRef.collection('answers')
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
  <Container textAlign="center">
    <Header>All Answers</Header>
    {answers.map((answer) => {
      return (
        <Header>{answer}</Header>
      )
    })}
    <Timer updateStage={updateStage} time={20}/>
  </Container>
)}

export default BoardVoting;
