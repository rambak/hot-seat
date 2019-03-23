import React, { useState } from 'react';
import { Button, Grid, Header } from 'semantic-ui-react';
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
  if (isAnswered)
    return (
      <div
        style={{
          width: '100%',
          height: '0',
          paddingBottom: '69%',
          position: 'relative',
        }}
      >
        <iframe
          src="https://giphy.com/embed/l0HlBO7eyXzSZkJri"
          width="100%"
          height="100%"
          style={{ position: 'absolute' }}
          frameBorder="0"
          class="giphy-embed"
          allowFullScreen
          title="voting waiting gif"
        />
      </div>
    );
  return (
    <>
      {props.selfName === props.inHotSeatName ? (
        <Grid centered style={{ paddingTop: '2em' }}>
          Please wait for the other players to guess your answer.
        </Grid>
      ) : (
        <Grid centered style={{ paddingTop: '2em' }}>
          <Header>What did {props.inHotSeatName} answer?</Header>
          {answers
            .sort((firstEl, secondEl) => {
              if (firstEl.answer < secondEl.answer) {
                return -1;
              } else if (firstEl.answer > secondEl.answer) {
                return 1;
              }
              return 0;
            })
            .map((answer, idx) => {
              return (
                <Grid.Row>
                  <Button
                    key={idx}
                    onClick={() => {
                      setisAnswered(!isAnswered);
                      answer.name.forEach(name => {
                        const curAnswerRef = answersRef.doc(name);
                        const newName = props.selfName;
                        return db
                          .runTransaction(async t => {
                            const doc = await t.get(curAnswerRef);
                            const gameDoc = await t.get(props.gameRef);
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

                            const currentVoteCount = gameDoc.data().voteCount;
                            const newVoteCount = currentVoteCount
                              ? currentVoteCount + 1
                              : 1;
                            t.update(props.gameRef, {
                              voteCount: newVoteCount,
                            });
                          })
                          .catch(console.log);
                      });
                    }}
                  >
                    {answer.answer}
                  </Button>
                </Grid.Row>
              );
            })}
        </Grid>
      )}
    </>
  );
};

export default PlayerVoting;
