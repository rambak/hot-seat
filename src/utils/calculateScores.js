import { db } from '../config/fbConfig';

export default async function(gameRef, inHotSeat, players) {
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
    .doc(inHotSeat)
    .get();

  scoring.votedCorrectly = hotSeatAnswerDoc.data().playersVote;
  scoring.correctAnswer = hotSeatAnswerDoc.data().answer;

  const answerDocs = await gameRef.collection('answers').get();

  answerDocs.forEach(answerDoc => {
    const playerName = answerDoc.id;
    const voteCount = answerDoc.data().playersVote.length;

    if (answerDoc.id !== inHotSeat) {
      if (scoring.correctAnswer === answerDoc.data().answer) {
        scoring.matchedAnswer.push(playerName);
      }
    }

    if (voteCount === scoring.mostVotes) {
      scoring.mostVotedFor.push(playerName);
    } else if (voteCount > scoring.mostVotes) {
      scoring.mostVotes = voteCount;
      scoring.mostVotedFor = [];
      scoring.mostVotedFor.push(playerName);
    }
  });

  players.forEach(player => {
    if (player.name !== inHotSeat) {
      db.runTransaction(function(transaction) {
        return transaction.get(playerRef.doc(player.name)).then(playerDoc => {
          let newScore = playerDoc.data().score;
          const playerName = playerDoc.data().name;

          if (scoring.votedCorrectly.includes(playerName)) {
            newScore += 2;
          }

          if (scoring.matchedAnswer.includes(playerName)) {
            newScore += 1;
          }

          if (scoring.mostVotedFor.includes(playerName)) {
            newScore += 1;
          }

          transaction.update(playerRef.doc(playerName), {
            score: newScore,
          });
        });
      });
    }
  });
}
