import React from 'react';
import { Card, Icon } from 'semantic-ui-react';

export const ResultCard = props => (
  <Card style={{ height: '12em', width: '20vw' }}>
    <Card.Content style={{ height: '8rem' }}>
      <Card.Header textAlign="center">{props.answer.answer}</Card.Header>
    </Card.Content>
    <Card.Content textAlign="center">
      {props.answer.voters &&
        props.answer.voters.map((vote, idx) => (
          <Icon key={idx} name="star" color="yellow" />
        ))}
    </Card.Content>
  </Card>
);

// const PosedCard = posed(ResultCard)({
//   enter: { x: 0, opacity: 1 },
//   exit: { x: 50, opacity: 0 },
// });

export default ResultCard;
