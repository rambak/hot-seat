import React from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { Header, Grid, Table } from 'semantic-ui-react';

export const BoardResults = props => {
  const answersRef = props.gameRef.collection('answers');
  const { error, loading, value } = useCollection(answersRef);

  if (loading) {
    return <div>Loading</div>;
  }

  if (error) {
    return <div>Error: {error.toString()}</div>;
  }

  const data = value.docs.map(answer => ({
    answer: answer.data().answer,
    voters: answer.data().playersVotes,
    votes:
      answer.data().playersVotes === undefined
        ? 0
        : answer.data().playersVotes.length,
  }));
  data.sort((a, b) => b.votes - a.votes);

  return (
    <>
      <Header>Results</Header>
      <Grid celled>
        <Grid.Row>
          <Grid.Column width={10}>Answer</Grid.Column>
          <Grid.Column>Votes</Grid.Column>
        </Grid.Row>
        {data.map(datum => (
          <Grid.Row>
            <Grid.Column width={10}>{datum.answer}</Grid.Column>
            <Grid.Column>{datum.votes}</Grid.Column>
          </Grid.Row>
        ))}
      </Grid>
    </>
  );
};

export default BoardResults;
