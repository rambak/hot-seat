import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import {HomePage} from './components/HomePage'
import GameContainer from './components/GameContainer';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path='/' component={HomePage}/>
          <Route path='/game/:pincode' component={GameContainer} />
        </Switch>
      </Router>
    );
  }
}

export default App;
