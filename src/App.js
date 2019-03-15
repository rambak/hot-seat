import React, { Component } from 'react';
import { Header } from 'semantic-ui-react';
import { BrowserRouter as Router } from 'react-router-dom';
//import Board00WaitingForPlayers from './components/00_WaitingForPlayers/Board00WaitingForPlayers';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Header>HOT_SEAT</Header>
          {/* <Board00WaitingForPlayers /> */}
        </div>
      </Router>
    );
  }
}

export default App;
