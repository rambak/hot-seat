import React, { Component } from 'react';
import { Header } from 'semantic-ui-react';
import posed, { PoseGroup } from 'react-pose';

const CorrectAnswer = () => {
  const charPoses = {
    exit: { opacity: 0, y: 20 },
    enter: {
      opacity: 1,
      y: 0,
      delay: ({ charIndex }) => charIndex * 30,
    },
  };

  return (
    <div className="container">
      {/* <SplitText initialPose="exit" pose="enter" charPoses={charPoses}>
        THE CORRECT ANSWER IS
      </SplitText> */}
    </div>
  );
};

export default CorrectAnswer;
