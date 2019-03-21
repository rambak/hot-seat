import React from 'react';
import { Card, Icon } from 'semantic-ui-react';

export const ResultCard = props => {
  if (!(props.answer.correctAnswer && props.showingAnswer)) {
    return (
      <Card style={{ height: '12em', width: '10em' }}>
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
  } else {
    return (
      <Card
        style={{
          height: '15em',
          width: '12em',
          boxShadow:
            '0 0 0 2px #fbbd08, 0 2px 4px 0 rgba(34,36,38,.12), 0 2px 10px 0 rgba(34,36,38,.15',
        }}
        raised
      >
        <Card.Content style={{ height: '8rem' }}>
          <Card.Header textAlign="center">{props.answer.answer}</Card.Header>
        </Card.Content>
        <Card.Content textAlign="center">
          {props.answer.voters.length ? (
            props.answer.voters.map(vote => vote).join(' ')
          ) : (
            <>No one figured it out!</>
          )}
        </Card.Content>
      </Card>
    );
  }
};

// const PosedCard = posed(ResultCard)({
//   enter: { x: 0, opacity: 1 },
//   exit: { x: 50, opacity: 0 },
// });

export default ResultCard;
