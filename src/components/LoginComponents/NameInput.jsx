import React, { useState } from 'react';
import { Form, Header } from 'semantic-ui-react';

const NameInput = ({ self }) => {
  const [name, setName] = useState(self || '');

  const handleChange = (e, { value }) => {
    setName(value);
  };

  return (
    <Form.Field>
      <Header as="h1">Name:</Header>
      <Form.Input name="name" value={name} onChange={handleChange} />
    </Form.Field>
  );
};

export default NameInput;
