import React from 'react';
import { Card, List } from 'semantic-ui-react';

const AllResultsCard = ({ answers }) => {
  const orderedAnswers = [...answers];
  return (
    <Card fluid>
      <List size="massive">
        {orderedAnswers.map(answer => (
          <List.Item key={answer.id}>
            <List.Content floated="left">
              <List.Header
                className={answer.hasBeenShown ? 'strikethrough' : ''}
              >
                {answer.answer}
              </List.Header>
            </List.Content>
            {answer.hasBeenShown && (
              <List.Content floated="right">{answer.id}</List.Content>
            )}
          </List.Item>
        ))}
      </List>
    </Card>
  );
};

export default AllResultsCard;
