import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './components/HomePage';
import ContainerBoard from './components/ContainerBoard';
import ContainerPlayer from './components/ContainerPlayer';
import PlayerLogin from './components/PlayerLogin';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/login" component={PlayerLogin} />
          <Route exact path="/:pin/game-board" component={ContainerBoard} />
          <Route exact path="/:pin" component={ContainerPlayer} />
        </Switch>
      </Router>
    );
  }
}

export default App;
