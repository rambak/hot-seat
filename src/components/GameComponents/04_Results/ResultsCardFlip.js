import React from 'react';
import ReactCardFlip from 'react-card-flip';
import ResultsCard from './ResultsCard';
import AllResultsCard from './AllResultsCard';

const ResultsCardFlip = ({ answers, idx, isFlipped }) => {
  return (
    <ReactCardFlip isFlipped={isFlipped}>
      <AllResultsCard
        key="front"
        answers={answers}
        currentAnswerId={answers[idx].id}
        isFlipped={isFlipped}
        idx={idx}
      />
      <ResultsCard key="back" answer={answers[idx]} isFlipped={isFlipped} />
    </ReactCardFlip>
  );
};

export default ResultsCardFlip;
