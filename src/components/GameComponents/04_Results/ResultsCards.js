import React from 'react';
import { Card } from 'semantic-ui-react';
import ResultsCardFlip from './ResultsCardFlip';

export const ResultsCards = (answers, showingAnswer) => {
  return (
  <Card.Group centered>
    {answers.map(answer => (
      <ResultsCardFlip
        key={answer.id}
        answer={answer}
        isFlipped={showingAnswer}
      />
    ))}
  </Card.Group>
)
    };

// const Container = posed.div({
//   enter: { staggerChildren: 50 },
// });

// const P = posed.p({
//   enter: { x: 0, opacity: 1 },
//   exit: { x: 50, opacity: 0 },
// });
