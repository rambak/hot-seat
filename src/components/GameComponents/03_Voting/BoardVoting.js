import React from 'react';
import { Header, Container } from 'semantic-ui-react'
import { useCollection } from 'react-firebase-hooks/firestore';

export const BoardVoting = (props) => {
  const answersRef = props.gameRef.collection('answers')
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
    <Header>All Answers</Header>
    {answers.map((answer) => {
      return (
        <Header>{answer}</Header>
      )
    })}
  </Container>
)}

export default BoardVoting;
