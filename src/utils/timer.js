import React, { useEffect, useState, useRef } from 'react';
import { Header, Container } from 'semantic-ui-react';

export const styles = {
  count: {
    color: 'white',
    fontSize: '11vw',
  },
  circle: {
    borderRadius: '50%',
    width: '17vw',
    height: '17vw',
    background: 'rgb(243, 136, 49)',
    textAlign: 'center',
    border: '1vh solid rgb(201, 102, 80)',

    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',

    position: 'absolute',
    bottom: '3vw',
    right: '3vw',
  },
};

export const setTimer = sec => {
  const [timeRemainingInSeconds, decrementTime] = useState(sec);
  const r = useRef(null);
  r.current = { timeRemainingInSeconds, decrementTime };
  useEffect(() => {
    const timer = setInterval(() => {
      r.current.decrementTime(r.current.timeRemainingInSeconds - 1);
      if (r.current.timeRemainingInSeconds === 0) {
        clearInterval(timer);
      }
    }, 1000);
    return function cleanup() {
      clearInterval(timer);
    };
  }, []);

  return r.current.timeRemainingInSeconds;
};

export const Timer = ({ updateStage, time, inHotSeat }) => {
  let timeRemainingInSeconds = setTimer(time);

  let isInHotSeatAnswered;
  if (inHotSeat) {
    isInHotSeatAnswered = inHotSeat.isAnswered ? true : false
  }

  if (updateStage) if (timeRemainingInSeconds === 0) updateStage();

  return (
    <Container>
      { (timeRemainingInSeconds === 0 && isInHotSeatAnswered===false) ?
      <Header className="question">Waiting for {inHotSeat.name}'s answer</Header>
      :
      ''
    }
    <div style={styles.circle}>
      <div style={styles.count}>{timeRemainingInSeconds}</div>
    </div>
    </Container>
  );
};
