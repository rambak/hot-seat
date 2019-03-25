import React from 'react';
import ReactCardFlip from 'react-card-flip';
import ResultCard from './ResultCard';

const ResultsCardFlip = props => {
  return (
    <ReactCardFlip isFlipped={props.isFlipped}>
      <ResultCard
        key="front"
        isFlipped={props.isFlipped}
        answer={props.answer}
      />
      <ResultCard
        key="back"
        isFlipped={props.isFlipped}
        answer={props.answer}
      />
    </ReactCardFlip>
  );
};

export default ResultsCardFlip;
