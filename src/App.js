import React, { Component } from 'react';
import { Header } from 'semantic-ui-react';
import { BrowserRouter as Router } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Header>HOT_SEAT</Header>
        </div>
      </Router>
    );
  }
}

export default App;
