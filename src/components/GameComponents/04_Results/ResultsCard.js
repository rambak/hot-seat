import React, { useState } from 'react';
import { Card, Transition } from 'semantic-ui-react';
import useTimeout from '../../../utils/useTimeout';
// import

class ResultsCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      votersVisible: false,
      nameVisible: false,
    };
  }

  componentDidMount() {
    setTimeout(() => this.setState({ votersVisible: true }), 1000);
    setTimeout(() => this.setState({ nameVisible: true }), 2500);
  }
  render() {
    return (
      <Card fluid style={{ height: '80vh' }}>
        <Card.Content>
          <Card.Header>{this.props.answer.answer}</Card.Header>
        </Card.Content>
        <Transition
          animation="jiggle"
          duration={1000}
          visible={this.state.votersVisible}
        >
          <Card.Content>Who Guessed This?</Card.Content>
        </Transition>
        <Card.Content>
          <Transition
            animation="jiggle"
            duration={1000}
            visible={this.state.nameVisible}
          >
            <Card.Header>{this.props.answer.id}</Card.Header>
          </Transition>
        </Card.Content>
      </Card>
    );
  }
}

export default ResultsCard;
