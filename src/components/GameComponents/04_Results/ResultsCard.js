import React, { useState } from 'react';
import { Card, Transition } from 'semantic-ui-react';
import useTimeout from '../../../utils/useTimeout';
import { GridRow } from '../00_Waiting/GridRow';

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
    console.log(this.props.answer);
    return (
      <Card fluid style={{ height: '80vh' }} className="results-card">
        <Card.Content>
          <Card.Header>{this.props.answer.answer}</Card.Header>
        </Card.Content>
        <Card.Content>
          Who Guessed This?
          <Transition
            animation="jiggle"
            duration={1000}
            visible={this.state.votersVisible}
          >
            <Card.Description>
              {this.props.answer.voters.length
                ? GridRow(
                    this.props.answer.voters.split('|').map(player => {
                      return {
                        name: player,
                      };
                    }),
                    false
                  )
                : 'No one!'}
            </Card.Description>
          </Transition>
        </Card.Content>
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
