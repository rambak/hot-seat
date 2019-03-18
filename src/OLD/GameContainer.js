import React, { Component } from 'react';
import { db } from '../config/fbConfig';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import Board00WaitingForPlayers from './00_WaitingForPlayers/Board00WaitingForPlayers';
import Player00WaitingForPlayers from './00_WaitingForPlayers/Player00WaitingForPlayers';
// import Board01UpNow from './01_UpNow/Board01UpNow';
// import Player01UpNow from './01_UpNow/Player01UpNow';

export class GameContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      game: {},
      players: [],
    };

    this.pin = this.props.match.params.pincode;
    this.gameRef = db.collection('games').doc(this.pin);

    this.determineComponent = this.determineComponent.bind(this);
    this.updateStage = this.updateStage.bind(this);
  }

  componentDidMount() {
    this.gameCallback = doc => {
      doc.data() && this.setState({ game: doc.data() });
    };
    this.gameRef.onSnapshot(this.gameCallback);

    this.playersRef = this.gameRef.collection('players');
    this.playersCallback = querySnapshot => {
      const players = [];
      querySnapshot.forEach(function(doc) {
        players.push({ name: doc.data().name, score: doc.data().score });
      });
      this.setState({ players });
    };
    this.playersRef.onSnapshot(this.playersCallback);
  }

  determineComponent(isBoard, currentStage) {
    switch (currentStage) {
      case 'waitingForPlayers':
        return isBoard ? (
          <Board00WaitingForPlayers
            players={this.state.players}
            pin={this.pin}
            gameRef={this.gameRef}
            updateStage={this.updateStage}
          />
        ) : (
          <Player00WaitingForPlayers />
        );
      case 'upNow':
        return <h1>Up Now Component</h1>;
      //   return isBoard ? <Board01UpNow /> : <Player01UpNow />;
      default:
        return; //????
    }
  }

  updateStage() {
    const stages = ['upNow', 'question', 'voting', 'results', 'scores']; //make sure to continue updating as we add the rest
    const { currentStage, inHotSeat } = this.state.game;
    //prettier-ignore
    const newHotSeat = currentStage === 'waitingForPlayers' ? 0
                     : currentStage === 'scores' ? inHotSeat + 1
                     : inHotSeat;

    const newStage =
      newHotSeat === this.state.players.length
        ? 'gameOver'
        : stages[(stages.indexOf(currentStage) + 1) % stages.length];

    this.gameRef.update({ currentStage: newStage, inHotSeat: newHotSeat });
  }

  render() {
    const { currentStage } = this.state.game;
    return currentStage ? (
      this.determineComponent(this.props.isBoard, currentStage)
    ) : (
      <>
        <h1>Game does not exist</h1>
        <Button as={Link} to="/">
          Return to Home Page
        </Button>
      </>
    );
  }
}

const mapState = state => ({
  isBoard: state.user.isBoard,
});

export default connect(mapState)(GameContainer);
