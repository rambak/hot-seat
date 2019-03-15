import React, { Component } from 'react';
import { db } from '../config/fbConfig';
import { connect } from 'react-redux';
import Board00WaitingForPlayers from './00_WaitingForPlayers/Board00WaitingForPlayers';
import Player00WaitingForPlayers from './00_WaitingForPlayers/Player00WaitingForPlayers';


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
    if (isBoard) {
      switch (currentStage) {
        default:
          return; //????
      }
    }
  }

  render() {
    const { currentStage } = this.state.game;
    return (

      <div>
        {/* Board controller */}
        {this.props.isBoard && currentStage === 'Waiting For Players' && (
          <Board00WaitingForPlayers players={this.state.players} />
        )}
        {this.props.isBoard}

        {/* Player controller */}
        {!this.props.isBoard && currentStage === 'Waiting For Players' && (
          <Player00WaitingForPlayers />
        )}
      </div>

    );
  }
}

const mapState = state => ({
  gamePin: '010101',
  isBoard: true,
});

export default connect(mapState)(GameContainer);
