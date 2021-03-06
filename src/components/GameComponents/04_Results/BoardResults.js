import React, { Component } from 'react';
import { Header, Container } from 'semantic-ui-react';
import ResultsCardFlip from './ResultsCardFlip';

export class BoardResults extends Component {
  constructor() {
    super();
    this.state = {
      answers: [],
      currentIdx: -1,
      isFlipped: false,
      intervalCounter: 0,
    };
    this.flipTimer = function() {};
  }

  componentDidMount() {
    this.answersRef = this.props.gameRef.collection('answers');
    this.callback = querySnapshot => {
      let answers = [];
      let maxIdxs = [];
      let maxVotes = 0;
      let correctAnswerIdx = -1;
      let currentIdx = 0;

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
          mostVotedFor: false,
          hasBeenShown: false,
        });

        if (doc.data().playersVote.length > maxVotes) {
          maxIdxs = [];
          maxIdxs.push(currentIdx);
          maxVotes = doc.data().playersVote.length;
        } else if (doc.data().playersVote.length === maxVotes) {
          maxIdxs.push(currentIdx);
        }

        if (doc.id === this.props.inHotSeat) {
          correctAnswerIdx = currentIdx;
        }

        currentIdx++;
      });

      if (!maxIdxs.includes(correctAnswerIdx)) {
        maxIdxs.forEach(idx => {
          answers[idx].mostVotedFor = true;
        });
      }

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
        })
        .map(answer =>
          answer.votes === 0 ? { ...answer, hasBeenShown: true } : answer
        );

      const firstIdx = answers.findIndex(answer => answer.votes > 0) - 1;

      this.setState({ answers, currentIdx: firstIdx });
    };
    this.answersRef.get().then(this.callback);

    this.flipTimer = setInterval(() => {
      if (this.state.currentIdx === this.state.answers.length - 1) {
        setTimeout(() => this.props.updateStage(), 6000);
        clearInterval(this.flipTimer);
      } else {
        if (this.state.intervalCounter % 4 === 0) {
          this.setState({
            currentIdx: this.state.currentIdx + 1,
            isFlipped: true,
            intervalCounter: this.state.intervalCounter + 1,
          });
        } else if (this.state.intervalCounter % 4 === 3) {
          const newAnswers = [...this.state.answers];
          newAnswers[this.state.currentIdx].hasBeenShown = true;

          this.setState({
            isFlipped: false,
            answers: newAnswers,
            intervalCounter: this.state.intervalCounter + 1,
          });
        } else {
          this.setState({ intervalCounter: this.state.intervalCounter + 1 });
        }
      }
    }, 2500);
  }

  componentWillUnmount() {
    clearInterval(this.flipTimer);
  }

  render() {
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
