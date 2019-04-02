import React from 'react';
import { Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export const ReturnToLoginButton = () => (
  <Button as={Link} to="/login" size="huge" color="orange">
    Return to Login Page
  </Button>
);

export default ReturnToLoginButton;
