import React from 'react';
import { db } from '../../../config/fbConfig';
import { Header, Container } from 'semantic-ui-react';
import { Timer } from '../../../utils/timer';

export class BoardQuestion extends React.Component {
  constructor() {
    super();
    this.state = {
      question: '',
    };
  }

  async componentDidMount() {
    if (this.state.question === '') {
      let randomIdx;
      do {
        randomIdx = Math.floor(Math.random() * 15 + 1).toString();
      } while (this.props.questions.prevQuestions[randomIdx]);
      const curQuestion = await db
        .collection('questions')
        .doc(randomIdx)
        .get();
      const question = curQuestion
        .data()
        .question.split('**name**')
        .join(this.props.inHotSeatName);
      this.setState({ question });

      this.props.setQuestions({
        currentQuestion: question,
        prevQuestions: {
          ...this.props.questions.prevQuestions,
          randomIdx: question,
        },
      });
    }
  }

  render() {
    if (this.props.areAnswersIn) {
      this.props.updateStage();
    }

    if (!this.state.question) return <div>Loading...</div>;
    return (
      <Container>
        <Header>{this.state.question}</Header>
        <Timer updateStage={this.props.updateStage} time={20} />
      </Container>
    );
  }
}

export default BoardQuestion;
