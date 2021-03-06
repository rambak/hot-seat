import React, { useState } from 'react';
import { Form, Button, Image, Container } from 'semantic-ui-react';

export const PlayerQuestion = ({ name, inHotSeatName, gameRef }) => {
  const [answer, setAnswer] = useState('');
  const [disabled, setDisabled] = useState(false);

  const handleChange = evt => {
    setAnswer(evt.target.value);
  };
  const handleSubmit = evt => {
    evt.preventDefault();
    setDisabled(true);

    const myAnswerRef = gameRef.collection('answers').doc(name);
    const myAnswer = { answer: answer.toUpperCase(), playersVote: [] };
    myAnswerRef.set(myAnswer);

    if (name === inHotSeatName) {
      gameRef.set(
        {
          inHotSeat: {
            isAnswered: true,
          },
        },
        { merge: true }
      );
    }

    setAnswer('');
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
            maxLength="23"
            required
          />
        </Form.Field>
        <Button
          color="blue"
          className="border"
          size="huge"
          type="submit"
          disabled={disabled}
        >
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default PlayerQuestion;
