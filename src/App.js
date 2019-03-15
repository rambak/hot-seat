import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './components/HomePage';
import GameContainer from './components/GameContainer';
import PlayerLogin from './components/PlayerLogin';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/login" component={PlayerLogin} />
          <Route path="/game/:pincode" component={GameContainer} />
        </Switch>
      </Router>
    );
  }
}

export default App;
