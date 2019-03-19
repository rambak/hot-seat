import React, { useState } from 'react';
import { Form, Button, Input } from 'semantic-ui-react';

export const PlayerQuestion = ({ name, gameRef }) => {
  const [answer, setAnswer] = useState('');
  const handleChange = evt => {
    setAnswer(evt.target.value);
  };
  const handleSubmit = evt => {
    evt.preventDefault();
    gameRef
      .collection('answers')
      .doc(name)
      .set({ answer }, { merge: true });
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

        <Form.Button type="submit">Submit</Form.Button>
      </Form.Group>
    </Form>
  );
};

export default PlayerQuestion;
