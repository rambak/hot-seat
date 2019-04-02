import React from 'react';
import { Container, Form, Button, Message, Header } from 'semantic-ui-react';
import { setUser } from '../../../store/reducers/user';
import { connect } from 'react-redux';

class PlayerLogin extends React.Component {
  constructor() {
    super();
    this.state = {
      errors: [],
      loggedIn: false,
      enteredName: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.setState({ enteredName: this.props.self });
  }

  handleChange(e, { name, value }) {
    console.log(name, value);
    this.setState({ [name]: value });
  }

  onSubmit = async event => {
    event.preventDefault();
    const { enteredName } = this.state;
    await this.setState({ errors: [] });
    if (enteredName === '') {
      await this.setState({
        errors: [...this.state.errors, 'Please make sure to enter a name.'],
      });
    }

    if (this.state.errors.length === 0) {
      const { gameRef } = this.props;

      if (this.state.errors.length === 0) {
        const playersRef = gameRef.collection('players');

        const playerNameExists = await playersRef
          .where('name', '==', enteredName)
          .get()
          .then(function(querySnapshot) {
            return querySnapshot.docs.length > 0;
          });

        if (playerNameExists) {
          await this.setState({
            errors: [
              ...this.state.errors,
              `A player with the same name (${enteredName}) already joined. Please choose a different name.`,
            ],
          });
        } else {
          await playersRef.doc(enteredName).set({
            name: enteredName,
          });
          this.props.setUser(enteredName, this.props.pin);
        }
      }
    }
  };

  render() {
    return (
      <Container textAlign="center" style={{ paddingTop: '5vh' }}>
        {this.state.errors.length > 0 && (
          <Message negative>
            <Message.Header>We encountered an error</Message.Header>
            <Message.List>
              {this.state.errors.map((error, idx) => {
                return <Message.Item key={idx}>{error}</Message.Item>;
              })}
            </Message.List>
          </Message>
        )}
        <Header className="title">Join game {this.props.pin}</Header>
        <Form onSubmit={this.onSubmit}>
          <Form.Field>
            <Header as="h1">Name:</Header>
            <Form.Input
              name="enteredName"
              value={this.state.enteredName}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Button type="submit" color="blue" size="huge">
            Join!
          </Button>
        </Form>
      </Container>
    );
  }
}

const mapDispatch = dispatch => ({
  setUser: (name, gamePin) => dispatch(setUser(name, gamePin)),
});

export default connect(
  null,
  mapDispatch
)(PlayerLogin);
