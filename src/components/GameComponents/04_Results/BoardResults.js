import React, { Component } from 'react';
import { Header } from 'semantic-ui-react';
import ResultsCards from './ResultsCards';

export class BoardResults extends Component {
  constructor() {
    super();
    this.state = {
      answers: [],
    };
  }

  componentDidMount() {
    this.answersRef = this.props.gameRef.collection('answers');
    this.callback = querySnapshot => {
      let answers = [];
      querySnapshot.forEach(function(doc) {
        answers.push({
          id: doc.id,
          answer: doc.data().answer,
          voters: doc.data().playersVotes,
          votes:
            doc.data().playersVotes === undefined
              ? 0
              : doc.data().playersVotes.length,
        });
      });
      answers = answers
        .reduce((acc, datum) => {
          if (!acc.some(accDatum => accDatum.answer === datum.answer)) {
            acc.push(datum);
          }
          return acc;
        }, [])
        .sort((a, b) => b.votes - a.votes);
      this.setState({ answers });
    };
    this.unsubscribe = this.answersRef.onSnapshot(this.callback);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    return (
      <>
        <Header>Results</Header>
        <ResultsCards answers={this.state.answers} />
      </>
    );
  }
}

export default BoardResults;
