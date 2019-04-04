import React from 'react';
import { Form, Header } from 'semantic-ui-react';

export const GamePinInput = ({ pin, handleChange }) => {
  return (
    <Form.Field>
      <Header as="h1">PIN:</Header>
      <Form.Input
        name="enteredPin"
        maxLength="4"
        value={pin}
        onChange={handleChange}
      />
    </Form.Field>
  );
};

export default GamePinInput;
