import React, { useState } from 'react';
import { Card, Table, Label, Header } from 'semantic-ui-react';
import Strikethrough from './Strikethrough';

const AllResultsCard = ({ answers, isFlipped, currentAnswerId, idx }) => {
  const [firstIdx] = useState(idx);
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
                    answer.id === currentAnswerId || firstIdx === idx ? (
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
      {firstIdx === idx && (
        <Header style={{ margin: '0px' }} className="question">
          NOBODY GUESSED THESE ANSWERS
        </Header>
      )}
    </Card>
  );
};

export default AllResultsCard;
