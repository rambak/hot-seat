import React, { useState, useEffect } from 'react';
import { Button } from 'semantic-ui-react'
import { useCollection } from 'react-firebase-hooks/firestore';
import { db } from '../../../config/fbConfig'

export const PlayerVoting = (props) => {
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

  const [isAnswered, setisAnswered ] = useState(false);

  if (isAnswered) return <div>wait for everybody..</div>
  return <div>
    { answers.map((answer, idx) => {
      return (
        <Button key={idx} onClick = {() => {
          setisAnswered(!isAnswered);
          const curAnswerRef = answersRef.doc(answer.name)
          const newName = props.name;
          return db.runTransaction((t) => {
            return t.get(curAnswerRef).then((doc) => {
              // doc doesn't exist; can't update
              if (!doc.exists) return;
              // update the users array after getting it from Firestore.
              const oldArrVote = doc.get('playersVote')
              const newVoteArray = [...oldArrVote, newName]
              t.set(curAnswerRef, { playersVote: newVoteArray }, { merge: true });
            });
          }).catch(console.log);
        }}>{answer.answer}</Button>
      )
    })
    }
  </div>;
};

export default PlayerVoting;
