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
        .join(this.props.inHotSeat.name);
      this.setState({ question });

      this.props.setQuestions({
        currentQuestion: question,
        prevQuestions: {
          ...this.props.questions.prevQuestions,
          [randomIdx]: question,
        },
      });
    }
  }

  render() {
    const isInHotSeatAnswered = this.props.inHotSeat.isAnswered
    const updateStage = isInHotSeatAnswered ? this.props.updateStage : undefined

    if (this.props.areAnswersIn) {
      this.props.updateStage();
    }

    if (!this.state.question) return <div>Loading...</div>;
    return (
      <Container textAlign="center" style={{ paddingTop: '17vh' }}>
        <Header className="question">{this.state.question}</Header>
        <Timer updateStage={updateStage} time={10} isInHotSeatAnswered={isInHotSeatAnswered} inHotSeat={this.props.inHotSeat}/>
      </Container>
    );
  }
}

export default BoardQuestion;
