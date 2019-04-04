import React from 'react';
import { Form, Header } from 'semantic-ui-react';

const NameInput = ({ name, handleChange }) => {
  return (
    <Form.Field>
      <Header as="h1">Name:</Header>
      <Form.Input name="enteredName" value={name} onChange={handleChange} />
    </Form.Field>
  );
};

export default NameInput;
