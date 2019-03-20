import React from 'react';
import { Header } from 'semantic-ui-react'
import { useCollection } from 'react-firebase-hooks/firestore';

export const BoardVoting = (props) => {
  const answersRef = props.gameRef.collection('answers')
  const answersCol = useCollection(answersRef);
  let answers = []
  if (answersCol.value) {
    answersCol.value.docs.forEach(data => {
      const name = data.id;
      const answer = data.data().answer;
      answers.push({
        name, answer
      });
    });
  }

  let finalAnswers;
  if (props.players.length === answers.length) {
    finalAnswers = [...answers];
    return <div>Answers:
    { finalAnswers.map((answer, idx) => {
      return (
        <Header>{answer.answer}</Header>
      )
    })
    }
  </div>;
  }
  else return <div>Wait for answers..</div>
};

export default BoardVoting;
