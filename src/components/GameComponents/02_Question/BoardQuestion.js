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
          [randomIdx]: question,
        },
      });
    }
  }

  render() {
    const inHotSeatName = this.props.inHotSeatName;
    const inHotSeatPlayerRef = this.props.gameRef.collection('answers').doc(inHotSeatName)

    let isInHotSeatAnswered;
    inHotSeatPlayerRef.get().then(function(doc) {
      if (doc.exists) {
        isInHotSeatAnswered=true;
      } else {
        isInHotSeatAnswered=false;
      }
    }).catch(function(error) {
      console.log("Error getting document:", error);
    })

    const updateStage = isInHotSeatAnswered ? this.props.updateStage : undefined

    if (this.props.areAnswersIn) {
      this.props.updateStage();
    }

    if (!this.state.question) return <div>Loading...</div>;
    return (
      <Container textAlign="center" style={{ paddingTop: '17vh' }}>
        <Header className="question">{this.state.question}</Header>
        <Timer updateStage={updateStage} time={10} isInHotSeatAnswered={isInHotSeatAnswered} inHotSeatName={inHotSeatName}/>
      </Container>
    );
  }
}

export default BoardQuestion;
