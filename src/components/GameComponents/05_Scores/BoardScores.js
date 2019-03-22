import React, { useEffect, useState } from 'react';
import { Table, Icon } from 'semantic-ui-react';
import { Timer } from '../../../utils/timer';
import { db } from '../../../config/fbConfig';

export const BoardScores = ({
  players,
  inHotSeatName,
  updateStage,
  gameRef,
}) => {
  const [scoresCalculated, setScoresCalculated] = useState(false);

  const calculateScores = async () => {
    const scoring = {
      correctAnswer: '',
      mostVotes: 0,
      mostVotedFor: [],
      votedCorrectly: [],
      matchedAnswer: [],
    };

    const playerRef = gameRef.collection('players');
    const hotSeatAnswerDoc = await gameRef
      .collection('answers')
      .doc(inHotSeatName)
      .get();

    scoring.votedCorrectly = hotSeatAnswerDoc.data().playersVote;
    scoring.correctAnswer = hotSeatAnswerDoc.data().answer;

    const answerDocs = await gameRef.collection('answers').get();

    answerDocs.forEach(answerDoc => {
      if (answerDoc.id !== inHotSeatName) {
        const playerName = answerDoc.data().name;
        const voteCount = answerDoc.data().playersVote.length;

        if (scoring.correctAnswer === answerDoc.data().answer) {
          scoring.matchedAnswer.push(playerName);
        }

        if (voteCount === scoring.mostVotes) {
          scoring.mostVotedFor.push(playerName);
        } else if (voteCount > scoring.mostVotes) {
          scoring.mostVotes = voteCount;
          scoring.mostVotedFor = [].push(playerName);
        }
      }
    });

    console.log('SCORING:', scoring);

    players.forEach(player => {
      console.log(player);
      db.runTransaction(function(transaction) {
        return transaction.get(playerRef.doc(player.name)).then(playerDoc => {
          let newScore = playerDoc.data().score;
          const playerName = playerDoc.data().name;

          console.log(playerDoc.data().name, 'CURRENT SCORE', newScore);

          if (scoring.votedCorrectly.includes(playerName)) {
            newScore += 2;
            console.log(
              playerDoc.data().name,
              'Voted Correctly? - yes, NEW SCORE:',
              newScore
            );
          } else {
            console.log(playerDoc.data().name, 'Voted Correctly? - no');
          }

          if (scoring.matchedAnswer.includes(playerName)) {
            newScore += 1;
            console.log(
              playerDoc.data().name,
              'Matched the Answer? - yes, NEW SCORE:',
              newScore
            );
          } else {
            console.log(playerDoc.data().name, 'Matched the Answer? - no');
          }

          if (scoring.mostVotedFor.includes(playerName)) {
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

          transaction.update(playerRef.doc(playerName), {
            score: newScore,
          });
        });
      });
    });
    setScoresCalculated(true);
  };

  if (!scoresCalculated) {
    calculateScores();
  }

  let highScore = 0;
  players.forEach(player => {
    if (player.score > highScore) {
      highScore = player.score;
    }
  });

  useEffect(() => {
    gameRef.update({ answerCount: 0, voteCount: 0 });
  }, []);

  return (
    <>
      <Table basic="very" celled collapsing>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell />
            <Table.HeaderCell>Player</Table.HeaderCell>
            <Table.HeaderCell>Score</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {players.map(player => (
            <Table.Row key={player.name}>
              <Table.Cell>
                {player.name === inHotSeatName && <Icon name="fire" />}
                {player.score === highScore && <Icon name="winner" />}
              </Table.Cell>
              <Table.Cell>{player.name}</Table.Cell>
              <Table.Cell>{player.score}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      {/* <Timer updateStage={updateStage} time={5} /> */}
    </>
  );
};

export default BoardScores;
