import React, { Component } from 'react';
import { Header, Container } from 'semantic-ui-react';
import {ResultsCards} from './ResultsCards';

export class BoardResults extends Component {
  constructor() {
    super();
    this.state = {
      answersOnState: [],
      showingAnswer: false,
    };
  }

  componentDidMount() {
    this.answersRef = this.props.gameRef.collection('answers');
    this.callback = querySnapshot => {
      let answers = [];
      querySnapshot.forEach(doc => {
        console.log('playersVote', doc.data().playersVote )
        console.log('id', doc.id )
        console.log ('doc.id === this.props.inHotSeat', doc.id, this.props.inHotSeat)
        answers.push({
          id: doc.id,
          answer: doc.data().answer,
          voters: doc.data().playersVote,
          correctAnswer: doc.id === this.props.inHotSeat,
        });
      });
      console.log('answers', answers)
      let newAnswers = answers
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
      this.setState({ answersOnState: newAnswers });
      console.log('answersonstate', this.state.answersOnState)
    };
    this.answersRef.get().then(this.callback);

    setTimeout(() => this.setState({ showingAnswer: true }), 3000);
    setTimeout(() => this.props.updateStage(), 8000);
  }

  render() {


    return (
      <Container textAlign="center" className="centered-child">
        <Header className="title">Votes</Header>
        {ResultsCards(this.state.answersOnState,this.state.showingAnswer )}
        {/* <ResultsCards
          answers={this.state.answersOnState}
          showingAnswer={this.state.showingAnswer}
        /> */}
      </Container>
    );
  }
}

export default BoardResults;
