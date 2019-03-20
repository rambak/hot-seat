import React from 'react';
import { db } from '../../../config/fbConfig';

export class BoardQuestion extends React.Component {
  constructor() {
    super();
    this.state = {
      question: '',
    };
  }

  async componentDidMount() {
    let randomIdx;
    do {
      randomIdx = Math.floor(Math.random() * 15 + 1).toString();
    } while (this.props.prevQuestions.randomIdx);
    const curQuestion = await db
      .collection('questions')
      .doc(randomIdx)
      .get();
    const question = curQuestion
      .data()
      .question.split('**name**')
      .join(this.props.inHotSeatName);
    this.setState({ question });
    this.props.prevQuestions[randomIdx] = true;
  }

  render() {
    window.setTimeout(() => this.props.updateStage(), 30000);
    if (this.state.question) return <div>{this.state.question}</div>;
    else return <div>loading</div>;
  }
}

export default BoardQuestion;
