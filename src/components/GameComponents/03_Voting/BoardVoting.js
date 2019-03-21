import React from 'react';
import { Header, Container } from 'semantic-ui-react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { Timer } from '../../../utils/timer';
import { db } from '../../../config/fbConfig';

export const BoardVoting = ({
  gameRef,
  currentQuestion,
  updateStage,
  inHotSeatName,
  areVotesIn,
  players,
}) => {
  const answersRef = gameRef.collection('answers');
  const answersCol = useCollection(answersRef);
  let answers = [];

  let answer;

  if (answersCol.value) {
    answersCol.value.docs.forEach(data => {
      answer = data.data().answer;
      if (!answers.includes(answer)) {
        answers.push(answer);
      }
    });
  }

  if (areVotesIn) {
    const scoring = {
      correctAnswer: '',
      mostVotes: 0,
      mostVotedFor: [],
      votedCorrectly: [],
      matchedAnswer: [],
    };

    const playerRef = gameRef.collection('players');
    gameRef
      .collection('answers')
      .doc(inHotSeatName)
      .get()
      .then(function(answer) {
        scoring.votedCorrectly = answer.data().playersVote;
        scoring.correctAnswer = answer.data().answer;
      });

    gameRef
      .collection('answers')
      .get()
      .then(function(answers) {
        answers.forEach(data => {
          if (areVotesIn && data.id !== inHotSeatName) {
            if (scoring.correctAnswer === data.data().answer) {
              scoring.matchedAnswer.push(data.data().name);
            }
            const voteCount = data.data().playersVote.length;
            if (voteCount === scoring.mostVotes) {
              scoring.mostVotedFor.push(data.data().name);
            } else if (voteCount > scoring.mostVotes) {
              scoring.mostVotes = voteCount;
              scoring.mostVotedFor = [].push(data.data().name);
            }
          }
        });
      });

    console.log('SCORING:', scoring);

    players.forEach(player => {
      console.log(player);
      db.runTransaction(function(transaction) {
        return transaction.get(playerRef.doc(player.name)).then(playerDoc => {
          let newScore = playerDoc.data().score;

          console.log(playerDoc.data().name, 'CURRENT SCORE', newScore);

          if (scoring.votedCorrectly.includes(playerDoc.data().name)) {
            newScore += 2;
            console.log(
              playerDoc.data().name,
              'Voted Correctly? - yes, NEW SCORE:',
              newScore
            );
          } else {
            console.log(playerDoc.data().name, 'Voted Correctly? - no');
          }

          if (scoring.matchedAnswer.includes(playerDoc.data().name)) {
            newScore += 1;
            console.log(
              playerDoc.data().name,
              'Matched the Answer? - yes, NEW SCORE:',
              newScore
            );
          } else {
            console.log(playerDoc.data().name, 'Matched the Answer? - no');
          }

          if (scoring.mostVotedFor.includes(playerDoc.data().name)) {
            newScore += 1;
            console.log(
              playerDoc.data().name,
              'Most Voted For? - yes, NEW SCORE:',
              newScore
            );
          } else {
            console.log(playerDoc.data().name, 'Most Voted For? - no');
          }

          console.log(playerDoc.data().name, 'FINAL SCORE', newScore);

          transaction.update(playerRef.doc(playerDoc.data().name), {
            score: newScore,
          });
        });
      });
    });
  }

  return (
    <Container textAlign="center">
      <Header>All Answers</Header>
      {answers.map((answer, idx) => {
        return <Header key={idx}>{answer}</Header>;
      })}
      {/* <Timer updateStage={calculateScores} time={20} /> */}
    </Container>
  );
};

export default BoardVoting;
