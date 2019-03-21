import React from 'react';
import { Card } from 'semantic-ui-react';
import ResultCard from './ResultCard';

export default props => (
  <Card.Group>
    {props.answers.map(answer => (
      <ResultCard key={answer.id} answer={answer} />
    ))}
  </Card.Group>
);

// const Container = posed.div({
//   enter: { staggerChildren: 50 },
// });

// const P = posed.p({
//   enter: { x: 0, opacity: 1 },
//   exit: { x: 50, opacity: 0 },
// });
