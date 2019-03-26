import React, { Component, useEffect } from 'react';
import { Header, Container } from 'semantic-ui-react';
import ResultsCardFlip from './ResultsCardFlip';
import ResultsCard from './ResultsCard';

export class BoardResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answers: [],
      currentIdx: -1,
      isFlipped: false,
    };
    this.flipTimer = function() {};
  }

  componentDidMount() {
    this.answersRef = this.props.gameRef.collection('answers');
    this.callback = querySnapshot => {
      let answers = [];
      querySnapshot.forEach(doc => {
        answers.push({
          id: doc.id,
          answer: doc.data().answer,
          voters: doc.data().playersVote.join('|'),
          votes:
            doc.data().playersVote === undefined
              ? 0
              : doc.data().playersVote.length,
          correctAnswer: doc.id === this.props.inHotSeat,
          hasBeenShown: false,
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
        .sort((a, b) => {
          if (!b.correctAnswer && (a.correctAnswer || a.votes > b.votes)) {
            return 1;
          } else if (b.correctAnswer || a.votes < b.votes) {
            return -1;
          }
          return 0;
        });
      this.setState({ answers });
    };
    this.answersRef.get().then(this.callback);

    this.flipTimer = setInterval(() => {
      if (this.state.currentIdx === this.state.answers.length - 1) {
        clearInterval(this.flipTimer);
      }
      if (this.state.isFlipped) {
        const newAnswers = [...this.state.answers];
        newAnswers[this.state.currentIdx].hasBeenShown = true;

        this.setState({
          isFlipped: !this.state.isFlipped,
          answers: newAnswers,
        });
      } else {
        this.setState({
          currentIdx: this.state.currentIdx + 1,
          isFlipped: !this.state.isFlipped,
        });
      }
    }, 3000);

    // setTimeout(() => this.props.updateStage(), 8000);
  }

  componentWillUnmount() {
    clearInterval(this.flipTimer);
  }

  render() {
    console.log(this.props);
    return (
      <Container className="centered-child">
        <Header className="question" style={{ fontSize: '5em' }}>
          {this.props.currentQuestion}
        </Header>
        {this.state.answers.length && (
          <ResultsCardFlip
            isFlipped={this.state.isFlipped}
            answers={this.state.answers}
            idx={this.state.currentIdx === -1 ? 0 : this.state.currentIdx}
          />
        )}
      </Container>
    );
  }
}

export default BoardResults;
