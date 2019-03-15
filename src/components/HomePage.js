import React, {Component} from 'react'
import {
  Button,
  Container,
  Header,
} from 'semantic-ui-react'
import { firestore } from 'firebase';
import { combineReducers } from '../../../Library/Caches/typescript/3.3/node_modules/redux';



const generate = () => {
  const alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
  const randomIdx = () => {
    return Math.floor((Math.random() * alphabet.length) + 0)
  }
  let pincode=''
  for (let i = 0; i < 4; i++) {
    pincode += alphabet[randomIdx()]
  }
  return pincode
}

export class HomePage extends Component {

  generatePinCode = () => {
    const gamePinCode = generate();

  }

  onClick {
    set firestore as a new game with id as a PinCode
    set props with pin code
    gamePincode  combineReducers
    go to /game/:PinCode
  }


  render() {
    return (
      <Container textAlign='center'>
        <Header >Welcome, to Hot Seat Game!</Header>
        <Button onClick={() => {this.generatePinCode}}>Start a new Game</Button>
        <Button>Enter a Game</Button>
      </Container>
    )
  }
}
