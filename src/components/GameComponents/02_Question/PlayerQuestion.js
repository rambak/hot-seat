import React, { useState } from 'react';
import { Form, Button, Image, Container } from 'semantic-ui-react';
import { db } from '../../../config/fbConfig';

export const PlayerQuestion = ({ name, inHotSeatName, gameRef }) => {
  const [answer, setAnswer] = useState('');
  const [disabled, setDisabled] = useState(false);

  const handleChange = evt => {
    setAnswer(evt.target.value);
  };
  const handleSubmit = evt => {
    evt.preventDefault();
    setDisabled(true);

   return db.runTransaction(function(transaction) {
      return transaction.get(gameRef).then(function(gameDoc) {
        if (!gameDoc.exists) {
          console.error('This game does not exist');
        }
        const currentAnswerCount = gameDoc.data().answerCount;
        const newAnswerCount = currentAnswerCount ? currentAnswerCount + 1 : 1;
        const myAnswerRef = gameRef.collection('answers').doc(name);
        const myAnswer = { answer: answer.toUpperCase(), playersVote: [] };
        if (name === inHotSeatName) {
          const inHotSeatData = gameDoc.get('inHotSeat');
          const inHotSeatNewData = { ...inHotSeatData, isAnswered: true };
          transaction.update(gameRef, {
            answerCount: newAnswerCount,
            inHotSeat: inHotSeatNewData,
          });
        } else {
          transaction.update(gameRef, { answerCount: newAnswerCount });
        }
        transaction.set(myAnswerRef, myAnswer);
      });
    }).then(function() {
      setAnswer('');
      console.log("Transaction successfully committed!");
     }).catch(function(error) {
      console.log("Transaction failed: ", error);
    });
  };

  if (disabled)
    return (
      <Container className="centered-child">
        <Image
          src="https://media.giphy.com/media/tXL4FHPSnVJ0A/giphy.gif"
          className="gif"
        />
      </Container>
    );

  return (
    <Container className="centered-child">
      <Form onSubmit={handleSubmit}>
        <Form.Field>
          <input
            placeholder="Answer..."
            value={answer}
            onChange={handleChange}
          />
        </Form.Field>
        <Button type="submit" disabled={disabled}>
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default PlayerQuestion;
