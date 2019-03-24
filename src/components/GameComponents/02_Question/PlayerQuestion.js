import React, { useState } from 'react';
import { Form, Button, Grid, Image } from 'semantic-ui-react';
import { db } from '../../../config/fbConfig';
import { Timer } from '../../../utils/timer';

export const PlayerQuestion = ({ name, gameRef }) => {
  const [answer, setAnswer] = useState('');
  const [disabled, setDisabled] = useState(false);

  const handleChange = evt => {
    setAnswer(evt.target.value);
  };
  const handleSubmit = evt => {
    evt.preventDefault();
    setDisabled(true);

    db.runTransaction(function(transaction) {
      return transaction.get(gameRef).then(function(gameDoc) {
        if (!gameDoc.exists) {
          console.error('This game does not exist');
        }
        const currentAnswerCount = gameDoc.data().answerCount;
        const newAnswerCount = currentAnswerCount ? currentAnswerCount + 1 : 1;
        transaction.update(gameRef, { answerCount: newAnswerCount });

        const myAnswerRef = gameRef.collection('answers').doc(name);
        const myAnswer = { answer: answer.toUpperCase(), playersVote: [] };
        transaction.set(myAnswerRef, myAnswer);
      });
    });

    setAnswer('');
  };

  if (disabled)
    return (
      <Image
        src="https://media.giphy.com/media/tXL4FHPSnVJ0A/200w.webp"
        className="gif"
      />
    );

  return (
    <>
      <Grid centered style={{ paddingTop: '30vh' }}>
        <Form style={{ paddingTop: '2em' }} onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Input
              placeholder="Answer..."
              onChange={handleChange}
              value={answer}
              style={{ height: '10vh', width: '20vw' }}
            />

            <Button type="submit" disabled={disabled}>
              Submit
            </Button>
          </Form.Group>
        </Form>
      </Grid>
    </>
  );
};

export default PlayerQuestion;
