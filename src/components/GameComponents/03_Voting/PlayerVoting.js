import React, { useState } from 'react';
import { Button, Container, Header } from 'semantic-ui-react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { db } from '../../../config/fbConfig';

export const PlayerVoting = props => {
  const answersRef = props.gameRef.collection('answers');
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
      {props.selfName === props.inHotSeatName ? (
        <Container>
          Please wait for the other players to guess your answer.
        </Container>
      ) : (
        <Container>
          <Header>What do you think {props.inHotSeatName}'s answer?</Header>
          {answers.map((answer, idx) => {
            return (
              <Button
                key={idx}
                onClick={() => {
                  setisAnswered(!isAnswered);
                  answer.name.forEach(name => {
                    const curAnswerRef = answersRef.doc(name);
                    const newName = props.selfName;
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
                            { playersVotes: newVoteArray },
                            { merge: true }
                          );

                          // const currentVoteCount = gameDoc.data().voteCount;
                          // const newVoteCount = currentVoteCount
                          //   ? currentVoteCount + 1
                          //   : 1;
                          // t.update(this.props.gameRef, {
                          //   voteCount: newVoteCount,
                          //});
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
        </Container>
      )}
    </>
  );
};

export default PlayerVoting;
