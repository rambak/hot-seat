import React, { useState } from 'react';
import { Form, Button } from 'semantic-ui-react';
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

        const newAnswerCount = gameDoc.data().answerCount + 1;
        transaction.update(gameRef, { answerCount: newAnswerCount });

        const myAnswerRef = gameRef.collection('answers').doc(name);
        const myAnswer = { answer: answer.toUpperCase(), playersVote: [] };
        transaction.set(myAnswerRef, myAnswer);
      });
    });

    setAnswer('');
  };

  return (
    <Form onSubmit={handleSubmit}>
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
  );
};

export default PlayerQuestion;
