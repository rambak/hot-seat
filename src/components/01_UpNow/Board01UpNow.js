import React from 'react';
import { Container, Header } from 'semantic-ui-react';

class Board01UpNow extends React.Component {
  componentDidMount() {
    window.setTimeout(() => console.log('Trigger next stage!'), 30000);
    // window.setTimeout(this.props.updateStage, 30000);
  }

  render() {
    //TODO: retrieve the name of the current person in the HotSeat
    const name = 'Anna';

    return (
      <Container textAlign="center">
        <Header>{name} is in the hot seat!</Header>
      </Container>
    );
  }
}

export default Board01UpNow;
