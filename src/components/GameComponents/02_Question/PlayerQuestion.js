import React, { useState } from 'react';
import { Form, Button, Grid } from 'semantic-ui-react';
import { db } from '../../../config/fbConfig';

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
      <div
        style={{
          width: '100%',
          height: '0',
          paddingBottom: '66%',
          position: 'relative',
        }}
      >
        <iframe
          src="https://giphy.com/embed/tXL4FHPSnVJ0A"
          width="100%"
          height="100%"
          style={{ position: 'absolute' }}
          frameBorder="0"
          class="giphy-embed"
          allowFullScreen
          title="question waiting gif"
        />
      </div>
    );

  return (
    <Grid centered>
      <Form
        textAlign="center"
        style={{ paddingTop: '2em' }}
        onSubmit={handleSubmit}
      >
        <Form.Group>
          <Form.Input
            placeholder="Answer..."
            onChange={handleChange}
            value={answer}
          />

          <Button type="submit" disabled={disabled}>
            Submit
          </Button>
        </Form.Group>
      </Form>
    </Grid>
  );
};

export default PlayerQuestion;
