import React from 'react';
import { Card, Table, Label } from 'semantic-ui-react';
import Strikethrough from './Strikethrough';

const AllResultsCard = ({ answers, isFlipped, currentAnswerId }) => {
  const orderedAnswers = [...answers].sort((a, b) => {
    return b.answer < a.answer ? 1 : -1;
  });
  return (
    <Card
      fluid
      style={{ height: '80vh', width: '90vw' }}
      className="all-results-card"
    >
      <Table basic="very">
        <Table.Body>
          {orderedAnswers.map(answer => (
            <Table.Row key={answer.id}>
              <Table.Cell width="12">
                <Label circular size="massive" className="answer">
                  {answer.hasBeenShown && !isFlipped ? (
                    answer.id === currentAnswerId ? (
                      <Strikethrough str={answer.answer} />
                    ) : (
                      <span className="strikethrough">{answer.answer}</span>
                    )
                  ) : (
                    answer.answer
                  )}
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
