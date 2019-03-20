import React from 'react';
import { db } from '../../../config/fbConfig';
import { Header, Container } from 'semantic-ui-react'
import { Timer } from '../../../utils/timer'

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
    const question = curQuestion.data().question;
    this.setState({ question });
    this.props.prevQuestions[randomIdx] = true;
  }



  render() {
    if (!this.state.question) return <div>loading</div>
    return (
      <Container>
        <Header>{this.state.question}</Header>
        <Timer updateStage={this.props.updateStage} time={20}/>
      </Container>
    )
  }
}

export default BoardQuestion;
