import React from 'react';
import { Container, Form, Button, Message, Header } from 'semantic-ui-react';
import { setUser } from '../store/reducers/user';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { db } from '../config/fbConfig';

class PlayerLogin extends React.Component {
  constructor() {
    super();
    this.state = {
      errors: [],
    };
  }

  onSubmit = async event => {
    event.preventDefault();
    const enteredPin = event.target.pin.value.toLowerCase();
    const enteredName = event.target.name.value;
    await this.setState({ errors: [] });
    if (enteredPin === '') {
      await this.setState({
        errors: [...this.state.errors, 'Please make sure to enter a pin.'],
      });
    }
    if (enteredName === '') {
      await this.setState({
        errors: [...this.state.errors, 'Please make sure to enter a name.'],
      });
    }

    if (this.state.errors.length === 0) {
      //check if the entered pin code exists
      const gameRef = db.collection('games').doc(enteredPin);
      const playersRef = gameRef.collection('players');

      // db.runTransaction(t => {
      //   return t
      //    .get(gameRef)
      //    .collection('players')
      //    .get().then(function(querySnapshot) {
      //     let num2 = 0
      //     querySnapshot.forEach(function(doc) {
      //       num2++
      //     })
      //     console.log('num2', num2)
      //    })
      // })
      // db.runTransaction(function(transaction) {
      //   return transaction.get(gameRef).then(function(gameDoc) {
      //     console.log('gameDoc', gameDoc)
        //   gameDoc.collection('players').get().then(function(querySnapshot) {
        //     let num2 = 0
        //     querySnapshot.forEach(function(doc) {
        //       num2++
        //     })
        //     console.log('num2', num2)
        //   })
        // });
      // })
      //   .then(function() {
      //     console.log('Transaction successfully committed!');
      //   })
      //   .catch(function(error) {
      //     console.log('Transaction failed: ', error);
      //   });




      const num = await playersRef.get().then(function(querySnapshot) {
        let num = 0
        querySnapshot.forEach(function(doc) {
          num++
        })
       return num
      })
      if (num === 10) {
        await this.setState({
          errors: [
            ...this.state.errors,
            `Number of players can't exceed 10`,
          ],
        });
      }

      const docExists = await gameRef.get().then(async doc => {
        if (
          doc.exists &&
          !(
            doc.data().currentStage === 'waitingForPlayers' ||
            doc.data().currentStage === 'waitingForPlayersNew'
          )
        ) {
          await this.setState({
            errors: [
              ...this.state.errors,
              `This game (${enteredPin}) is already in progress.`,
            ],
          });
        }
        return doc.exists;
      });

      if (this.state.errors.length === 0) {
        if (docExists) {
          const playersRef = db
            .collection('games')
            .doc(enteredPin)
            .collection('players');

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
            db.runTransaction(async t => {
              const trans = await t.get(gameRef)
              trans.data().playerCount
              if (trans.data().playerCount === 10) {
                await this.setState({
                errors: [
                  ...this.state.errors,
                  `Number of players can't exceed 10`,
                ],
                });
              }
              else {
            await db
              .collection('games')
              .doc(enteredPin)
              .collection('players')
              .doc(enteredName)
              .set({
                name: enteredName,
              });
            this.props.setUser(enteredName);
            this.props.history.push(`/${enteredPin}`);
          }
        } else {
          await this.setState({
            errors: [
              ...this.state.errors,
              `There is no game matching this pin (${enteredPin}). Please enter a different pin.`,
            ],
          });
        }
      } })
      }
    }
  };

  render() {
    return (
      <Container className="centered-child">
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
        <Form onSubmit={this.onSubmit}>
          <Form.Field>
            <Header>PIN:</Header>
            <input name="pin" maxLength="4" />
          </Form.Field>
          <Form.Field>
            <Header>Name:</Header>
            <input name="name" maxLength="12" />
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
  setUser: name => dispatch(setUser(name)),
});

export default connect(
  null,
  mapDispatch
)(withRouter(PlayerLogin));
