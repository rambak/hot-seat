import React from 'react';
import {
  Card,
  Transition,
  Header,
  Divider,
  Container,
  Image,
} from 'semantic-ui-react';
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
        setTimeout(() => {
          this.setState({ nameVisible: true });
          if (this.props.answer.correctAnswer) {
            this.setState({ votersVisible: false });
            this.setState({ votersVisible: true });
          }
        }, 3500);
      } else {
        await this.setState({ votersVisible: false, nameVisible: false });
      }
    }
  }

  render() {
    return (
      <Card
        fluid
        style={{ height: '80vh', width: '90vw' }}
        className="results-card"
      >
        {this.props.answer.correctAnswer && this.state.nameVisible && (
          <Confetti numberOfElements={1500} />
        )}
        <Card.Content style={{ height: '20vh' }} className="answer">
          <Header size="huge" style={{ fontSize: '4em' }}>
            {this.props.answer.answer}
          </Header>
        </Card.Content>
        <Card.Content style={{ height: '35vh' }}>
          <Header size="huge" style={{ fontSize: '3em' }}>
            Who Guessed This?
          </Header>
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
                  false,
                  this.props.answer.correctAnswer && this.state.nameVisible
                )
              ) : (
                <Header size="huge">No one!</Header>
              )}
            </Card.Description>
          </Transition>
        </Card.Content>
        <Card.Content
          className={this.state.nameVisible ? 'name-visible' : 'name'}
          style={{ height: '25vh' }}
        >
          <Card.Description>
            <Container>
              <Header style={{ fontSize: '3em' }}>Submitted by:</Header>
            </Container>
          </Card.Description>
          <Divider />

          <Card.Description className="name-visible">
            <Transition
              animation="browse"
              duration={1000}
              visible={this.state.nameVisible}
              unmountOnHide={true}
            >
              <div>
                {this.props.answer.correctAnswer && (
                  <Image
                    float="left"
                    src="/hotseat.png"
                    style={{
                      height: '8vh',
                      display: 'inline-block',
                      verticalAlign: 'middle',
                      marginRight: '10px',
                    }}
                  />
                )}
                <Header size="huge" style={{ fontSize: '5em' }}>
                  {this.props.answer.id}
                </Header>
              </div>
            </Transition>
          </Card.Description>
        </Card.Content>
      </Card>
    );
  }
}

export default ResultsCard;
