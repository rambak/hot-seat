const questionBank = require('./questionBank');
const db = require('./fbConfig');

const seedQuestions = async () => {
  const questionsRef = db.collection('questions');

  const batch = db.batch();

  questionBank.forEach((question, idx) => {
    batch.set(questionsRef.doc(String(idx)), { id: idx, question });
  });

  await batch.commit();
};

seedQuestions();
