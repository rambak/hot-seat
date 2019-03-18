const updateStage = (gameRef, currentStage, inHotSeat) => {
  const stages = ['upNow', 'question', 'voting', 'results', 'scores'];
  //prettier-ignore
  const newHotSeat = currentStage === 'waitingForPlayers' ? 0
                   : currentStage === 'scores' ? inHotSeat + 1
                   : inHotSeat;

  const newStage =
    newHotSeat === this.state.players.length
      ? 'gameOver'
      : stages[(stages.indexOf(currentStage) + 1) % stages.length];

  gameRef.update({ currentStage: newStage, inHotSeat: newHotSeat });
};

export default updateStage;
