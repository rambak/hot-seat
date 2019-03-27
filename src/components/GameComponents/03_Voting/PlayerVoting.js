import React, { useState } from 'react';
import { Button, Grid, Header, Image, Container } from 'semantic-ui-react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { db } from '../../../config/fbConfig';

export const PlayerVoting = ({ gameRef, selfName, inHotSeatName }) => {
  const [isAnswered, setisAnswered] = useState(false);

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

  const handleSubmit = (answer) => {
    setisAnswered(true);
    answer.name.forEach(name => {
      const curAnswerRef = answersRef.doc(name);
      const newName = selfName;
      db
        .runTransaction(async t => {
          const doc = await t.get(curAnswerRef);
          const gameDoc = await t.get(gameRef);
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
          t.update(gameRef, {
            voteCount: newVoteCount,
          });
        }).then(function() {
          console.log("Transaction successfully committed!");
         }).catch(function(error) {
          console.log("Transaction failed: ", error);
        });
    });
  }

  if (isAnswered) {
    return (
      <Container className="centered-child">
        <Image
          src="https://media.giphy.com/media/l0HlBO7eyXzSZkJri/giphy.gif"
          className="gif"
        />
      </Container>
    );
  }
    // const answers1 = [1,2,3,4,5,6,7,8,9,10]
  return (
    <Container className="centered-child">
      {selfName === inHotSeatName ? (
        <Header className='inHotSeat'>
          Please wait for the other players to guess your answer.
        </Header>
      ) : (
        <Grid centered style={{ paddingTop: '2em' }}>
          <Header>What did {inHotSeatName} answer?</Header>
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
                <Grid.Row key={idx}>
                  <Button
                    onClick={() => {
                     handleSubmit(answer)
                    }}
                  >
                    {answer.answer}
                  </Button>
                </Grid.Row>
              );
            })}
        </Grid>
      )}
    </Container>
  );
};

export default PlayerVoting;
