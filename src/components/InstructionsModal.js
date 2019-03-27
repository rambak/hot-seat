import React from 'react';
import { Modal, Header, Image } from 'semantic-ui-react';

export const InstructionsModal = ({ modalOpen, handleClose }) => {
  return (
    <Modal
      open={modalOpen}
      onClose={handleClose}
      // trigger={<Button>How to Play</Button>}
      centered={false}
      size="large"
      closeIcon
    >
      <Modal.Header>Instructions</Modal.Header>
      <Modal.Content>
        <Header>TL;DR</Header>
        <Modal.Description>
          At the beginning of each round, the host screen will display which
          player is in the hot seat. Each player, including the one in the hot
          seat, answers the question. Earn points by correctly guessing which
          response was written by the player in the hot seat.
        </Modal.Description>
        <Header>GETTING STARTED</Header>
        <Modal.Description>
          <Header as="h4">Host Screen</Header>
          On a screen big enough for all players to see, click "Host a game."
          You will be taken to a page with a game pin that will display as
          players enter the game. When all the players have signed in, click
          "start" to begin the game.
          <br />
          <Image
            wrapped
            size="medium"
            src="https://im.ezgif.com/tmp/ezgif-1-6c0d99b4712a.gif"
            alt="Host Start GIF"
          />
          <br />
          <Header as="h4">Players</Header>
          Once you have a game pin, click "Join a game" to login. Enter the game
          pin that is displayed on the host screen and your name. You will know
          you have successfully joined the game when your name appears on the
          host screen.
        </Modal.Description>

        <Header>GAMEPLAY</Header>
        <Modal.Description>
          <Header as="h4">Question</Header>
          At the beginning of each round, the host screen displays a question
          about the player in the hot seat. Everyone, including the player in
          the hot seat, submits an answer from the perspective of the player in
          the hot seat.
          <br />
          <Header as="h4">Guessing</Header>
          All of the answers are displayed on the host screen and on players'
          individual screens. Each player, except the player in the hot seat,
          guesses which answer was written by the player in the host seat.
          <br />
          <Header as="h4">Results</Header>
          When all of the guesses are in, the host screen displays the results
          from the round. Points are awarded in the following way:
          <ul>
            <li>
              2 points to each player who correctly guesses the answer given by
              the player in the hot seat.
            </li>
            <li>
              1 point to the player whose answer got the most guesses (unless
              that player is currently in the hot seat).
            </li>
            <li>
              2 points to any player who submitted the same answer as the person
              in the hot seat during the question stage.
            </li>
          </ul>
          <Header as="h4">Scores</Header>
          At the end of each round, the host screen will display the current
          standings. Check out your total score before the next round begins!
        </Modal.Description>
        <Header>END OF GAME</Header>
        <Modal.Description>
          After each player plays one round in the hot seat, the player with the
          most points wins. Click "Play again" to start a new game.
        </Modal.Description>
      </Modal.Content>
    </Modal>
  );
};

export default InstructionsModal;
