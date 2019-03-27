import React from 'react';
import { Card, Icon, Divider, Segment, Image } from 'semantic-ui-react';

export const ResultCard = props => {
  // if (!(props.answer.correctAnswer && props.showingAnswer)) {
    console.log('444props', props)
  return (
    <Card
      key="front"
      className={
        props.isFlipped && props.answer.correctAnswer
          ? 'results-card-correct'
          : 'results-card'
      }
    >
      {/* style={{ height: '12em', width: '10em' }}> */}
      {/* <Card.Content style={{ height: '8rem' }}> */}
      <Card.Content>
        {props.isFlipped ? (
          <Segment basic size="massive" className="card-title">
            {props.answer.correctAnswer && (
              <Image floated="left" size="mini" src="/images/chair-100.png" />
            )}

            {props.answer.id}
          </Segment>
        ) : (
          <Segment basic size="massive">
            {props.answer.id}
          </Segment>
        )}
        <Divider />
        <Card.Header textAlign="center">{props.answer.answer}</Card.Header>
        <Divider />
        {/* <Card.Content textAlign="center"> */}
        {props.answer.voters &&
          props.answer.voters.map((vote, idx) => (
            <Icon key={idx} name="star" color="yellow" />
          ))}
        <Divider />
        <Segment basic size="huge">
          <h2 className="card-title">Voters</h2>
          {props.answer.correctAnswer && props.answer.voters.length === 0 ? (
            <p>No one figured it out!</p>
          ) : (
            <ul>
              {props.answer.voters &&
                props.answer.voters.map((vote, idx) => {
                  return props.isFlipped ? (
                    <li key={idx}>{vote}</li>
                  ) : (
                    <li key={idx}>{vote}</li>
                  );
                })}
            </ul>
          )}
        </Segment>
      </Card.Content>
    </Card>
  );
  //   );
  // } else {
  //   return (
  //     <Card
  //       style={{
  //         height: '15em',
  //         width: '12em',
  //         boxShadow:
  //           '0 0 0 2px #fbbd08, 0 2px 4px 0 rgba(34,36,38,.12), 0 2px 10px 0 rgba(34,36,38,.15',
  //       }}
  //       raised
  //     >
  //       <Card.Content style={{ height: '8rem' }}>
  //         <Card.Header textAlign="center">{props.answer.answer}</Card.Header>
  //       </Card.Content>
  //       <Card.Content textAlign="center">
  //         {props.answer.voters.length ? (
  //           props.answer.voters.map(vote => vote).join(' ')
  //         ) : (
  //           <>No one figured it out!</>
  //         )}
  //       </Card.Content>
  //     </Card>
  //   );
  // }
};

// const PosedCard = posed(ResultCard)({
//   enter: { x: 0, opacity: 1 },
//   exit: { x: 50, opacity: 0 },
// });

export default ResultCard;
