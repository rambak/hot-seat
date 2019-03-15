import React, { Component } from 'react';
import { Header } from 'semantic-ui-react';
import { BrowserRouter as Router } from 'react-router-dom';
import GameContainer from './components/GameContainer';


class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <GameContainer />
        </div>
      </Router>
    );
  }
}

export default App;
