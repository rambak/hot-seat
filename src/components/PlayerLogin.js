import React from 'react';
import { Container, Form, Button } from 'semantic-ui-react';

const Player00WaitingForPlayers = props => {
  onSubmit = () => {
    //Check if the game PIN exists if so:
    //write the player into the DB and the local store
    //write the PIN to the locat store
  }


  render() {
    return (
    <Container textAlign="center">
      <Form>
        <Form.Field>
          <label>PIN:</label>
          <input />
        </Form.Field>
        <Form.Field>
          <label>Name:</label>
          <input />
        </Form.Field>
        <Button type="submit">Submit</Button>
      </Form>
    </Container>
  )
  }
};

export default Player00WaitingForPlayers;
