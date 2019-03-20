import React, { useState } from 'react';
import { Form, Button, Input } from 'semantic-ui-react';

export const PlayerQuestion = ({ name, gameRef }) => {
  const [answer, setAnswer] = useState('');
  const [disabled, setDisabled] = useState(false);

  const handleChange = evt => {
    setAnswer(evt.target.value);
  };
  const handleSubmit = evt => {
    evt.preventDefault();
    setDisabled(true);
    gameRef
      .collection('answers')
      .doc(name)
      .set({ answer, playersVote: [] }, { merge: true });
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
