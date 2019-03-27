import React, { useState } from 'react';
import {
  Card,
  Transition,
  Header,
  Divider,
  Image,
  Container,
} from 'semantic-ui-react';
import useTimeout from '../../../utils/useTimeout';
import { GridRow } from '../00_Waiting/GridRow';
import Confetti from 'reactfitti';

class ResultsCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      votersVisible: false,
      nameVisible: false,
    };
  }

  async componentDidUpdate(prevProps) {
    if (prevProps.isFlipped !== this.props.isFlipped) {
      if (this.props.isFlipped) {
        setTimeout(() => this.setState({ votersVisible: true }), 1500);
        setTimeout(() => this.setState({ nameVisible: true }), 3500);
      } else {
        await this.setState({ votersVisible: false, nameVisible: false });
      }
    }
  }

  render() {
    return (
      <Card fluid style={{ height: '80vh' }} className="results-card">
        {this.props.answer.correctAnswer && this.state.nameVisible && (
          <Confetti />
        )}
        <Card.Content style={{ height: '20vh' }} className="answer">
          <Header size="huge" style={{ fontSize: '4em' }}>
            {this.props.answer.answer}
          </Header>
        </Card.Content>
        <Card.Content style={{ height: '40vh' }}>
          <Header size="huge">Who Guessed This? </Header>
          <Divider />
          <Transition
            animation="jiggle"
            duration={1000}
            visible={this.state.votersVisible}
            unmountOnHide={true}
          >
            <Card.Description size="huge">
              {this.props.answer.voters.length ? (
                GridRow(
                  this.props.answer.voters.split('|').map(player => {
                    return {
                      name: player,
                    };
                  }),
                  false
                )
              ) : (
                <Header size="huge">No one!</Header>
              )}
            </Card.Description>
          </Transition>
        </Card.Content>
        <Card.Content
          className={this.state.nameVisible ? 'name-visible' : 'name'}
          style={{ height: '20vh' }}
        >
          {/* {this.state.nameVisible && this.props.answer.correctAnswer ? ( <Image
                float="left"
                src="/hotseat.png"
                style={{ height: '15vh' }}
              />) : (
          ''
          )} */}
          <Transition
            animation="browse"
            duration={1000}
            visible={this.state.nameVisible}
            unmountOnHide
          >
            <Header size="huge" style={{ fontSize: '5em' }}>
              {this.props.answer.id}
            </Header>
          </Transition>
        </Card.Content>
      </Card>
    );
  }
}

export default ResultsCard;
