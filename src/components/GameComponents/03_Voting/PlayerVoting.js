import React, { useState } from 'react';
import { Button, Container, Header } from 'semantic-ui-react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { db } from '../../../config/fbConfig';

export const PlayerVoting = ({ selfName, gameRef, inHotSeatName }) => {
  const answersRef = gameRef.collection('answers');
  const answersCol = useCollection(answersRef);
  let answers = [];
  let isRepeated = {};
  if (answersCol.value) {
    answersCol.value.docs.forEach(data => {
      const name = data.id;
      const answer = data.data().answer;
      if (!isRepeated[answer]) {
        answers.push({
          name: [name],
          answer,
        });
      } else {
        answers = answers.map(curanswer => {
          const newName = [...curanswer.name, name];
          const answer = curanswer.answer;
          if (curanswer.answer === answer) return { name: newName, answer };
          return answer;
        });
      }
      isRepeated[answer] = true;
    });
  }

  const [isAnswered, setisAnswered] = useState(false);

  if (isAnswered) return <div>wait for everybody..</div>;
  return (
    <>
      {selfName === inHotSeatName ? (
        <Container>
          Please wait for other players to guess your answer.
        </Container>
      ) : (
        <Container>
          <Header>What do you think {inHotSeatName}'s answer?</Header>
          {answers.map((answer, idx) => {
            return (
              <Button
                key={idx}
                onClick={() => {
                  setisAnswered(!isAnswered);

                  answer.name.forEach(name => {
                    const curAnswerRef = answersRef.doc(name);
                    const newName = selfName;
                    return db
                      .runTransaction(t => {
                        return t.get(curAnswerRef).then(doc => {
                          // doc doesn't exist; can't update
                          if (!doc.exists) return;
                          // update the users array after getting it from Firestore.
                          const oldArrVote = doc.get('playersVote');
                          const newVoteArray = [...oldArrVote, newName];
                          t.set(
                            curAnswerRef,
                            { playersVote: newVoteArray },
                            { merge: true }
                          );
                        });
                      })
                      .catch(console.log);
                  });
                }}
              >
                {answer.answer}
              </Button>
            );
          })}
          }
        </Container>
      )}
    </>
  );
};

export default PlayerVoting;
