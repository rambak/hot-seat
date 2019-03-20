import React from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { Header, Grid, Table } from 'semantic-ui-react';
import { Chart } from 'react-google-charts';
import CorrectAnswer from './CorrectAnswer';

export const BoardResults = props => {
  const answersRef = props.gameRef.collection('answers');
  const { error, loading, value } = useCollection(answersRef);

  if (loading) {
    return <div>Loading</div>;
  }

  if (error) {
    return <div>Error: {error.toString()}</div>;
  }

  const answersArr = value.docs
    .map(answer => ({
      answer: answer.data().answer,
      voters: answer.data().playersVotes,
      votes:
        answer.data().playersVotes === undefined
          ? 0
          : answer.data().playersVotes.length,
    }))
    .reduce((acc, datum) => {
      if (!acc.some(accDatum => accDatum.answer === datum.answer)) {
        acc.push(datum);
      }
      return acc;
    }, [])
    .sort((a, b) => b.votes - a.votes);

  const data = answersArr.map(answerInfo => {
    return [answerInfo.answer, answerInfo.votes];
  });

  data.unshift(['Answer', 'Votes']);

  return <CorrectAnswer />;
};

export default BoardResults;
