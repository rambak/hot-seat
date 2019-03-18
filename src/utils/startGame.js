import { db } from '../config/fbConfig';
import { updateStage } from './';

const startGame = gameRef => {
  gameRef
    .collection('players')
    .get()
    .then(function(players) {
      const batch = db.batch();

      players.docs.forEach(function(player, idx) {
        batch.update(player.ref, {
          score: 0,
          turnOrder: idx,
        });
      });

      batch.commit();
    });

  updateStage(gameRef, 'waitingForPlayers');
};

export default startGame;
