import React from 'react';
import { Card, Table, Label } from 'semantic-ui-react';

const AllResultsCard = ({ answers }) => {
  const orderedAnswers = [...answers].sort((a, b) => {
    return b.answer < a.answer ? 1 : -1;
  });
  return (
    <Card fluid style={{ height: '80vh' }} className="all-results-card">
      <Table basic="very">
        <Table.Body>
          {orderedAnswers.map(answer => (
            <Table.Row key={answer.id}>
              <Table.Cell width="12">
                <Label
                  circular
                  size="massive"
                  className={
                    answer.hasBeenShown ? 'strikethrough answer' : 'answer'
                  }
                >
                  {answer.answer}
                </Label>
              </Table.Cell>
              <Table.Cell width="4">
                {answer.hasBeenShown && (
                  <Label circular size="massive" className="name">
                    {answer.id}
                  </Label>
                )}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Card>
  );
};

export default AllResultsCard;