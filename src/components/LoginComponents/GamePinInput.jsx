import React from 'react';
import { Form, Header } from 'semantic-ui-react';

export const GamePinInput = ({ pin, handleChange }) => {
  return (
    <Form.Field>
      <Header>PIN:</Header>
      <input name="pin" maxLength="4" value={pin} onChange={handleChange} />
    </Form.Field>
  );
};

export default GamePinInput;
