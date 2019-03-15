import React, { Component } from 'react';
import { db } from '../config/fbConfig';
import { connect } from 'react-redux';
import Board00WaitingForPlayers from './00_WaitingForPlayers/Board00WaitingForPlayers';
import Player00WaitingForPlayers from './00_WaitingForPlayers/Player00WaitingForPlayers';
import Board01UpNow from './01_UpNow/Board01UpNow';
import Player01UpNow from './01_UpNow/Player01UpNow';

//REMEMBER TO TAKE OFF OF APP.JS!!!

export class GameContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      game: {},
      players: [],
    };
    this.determineComponent = this.determineComponent.bind(this);
  }

  componentDidMount() {
    this.gameRef = db.collection('games').doc(this.props.gamePin);
    this.gameCallback = doc => {
      this.setState({ game: doc.data() });
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
      case 'Waiting For Players':
        return isBoard ? (
          <Board00WaitingForPlayers players={this.state.players} />
        ) : (
          <Player00WaitingForPlayers />
        );
      case 'Up Now':
        return isBoard ? <Board01UpNow /> : <Player01UpNow />;
      default:
        return; //????
    }
  }

  render() {
    const { currentStage } = this.state.game;
    return this.determineComponent(this.props.isBoard, currentStage);
  }
}

const mapState = state => ({
  gamePin: '010101',
  isBoard: true,
});

export default connect(mapState)(GameContainer);
