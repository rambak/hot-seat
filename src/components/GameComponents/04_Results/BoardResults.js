import React, { Component } from 'react';
import { Header, Container } from 'semantic-ui-react';
import ResultsCards from './ResultsCards';

export class BoardResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answers: [],
      showingAnswer: false,
    };
  }

  componentDidMount() {
    this.answersRef = this.props.gameRef.collection('answers');
    this.callback = querySnapshot => {
      let answers = [];
      querySnapshot.forEach(doc => {
        answers.push({
          id: doc.id,
          answer: doc.data().answer,
          voters: doc.data().playersVote,
          votes:
            doc.data().playersVote === undefined
              ? 0
              : doc.data().playersVote.length,
          correctAnswer: doc.id === this.props.inHotSeat,
        });
      });
      answers = answers
        .reduce((acc, datum) => {
          if (!acc.some(accDatum => accDatum.answer === datum.answer)) {
            acc.push(datum);
          } else if (datum.correctAnswer) {
            const idx = acc.find(accDatum => accDatum.answer === datum.answer);
            acc.splice(idx, 1, datum);
          }
          return acc;
        }, [])
        .sort((a, b) => b.votes - a.votes);
      console.log(answers, this.props.inHotSeat);
      this.setState({ answers });
    };
    this.answersRef.get().then(this.callback);

    setTimeout(() => this.setState({ showingAnswer: true }), 3000);
    setTimeout(() => this.props.updateStage(), 8000);
  }

  render() {
    return (
      <Container textAlign="center" style={{ paddingTop: '10vh' }}>
        <Header className="title">Votes</Header>
        <ResultsCards
          answers={this.state.answers}
          showingAnswer={this.state.showingAnswer}
        />
      </Container>
    );
  }
}

export default BoardResults;
