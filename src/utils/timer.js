import React, { useEffect, useState, useRef } from 'react';

export const styles = {
  count: {
    color: 'white',
    fontSize: '15vw',

  },
  circle: {
    borderRadius: '50%',
    width: '20vw',
    height: '20vw',
    background: '#81CE97',
    textAlign: 'center',
    border: '3px solid #81CE40',

    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',

    position:'absolute',
    bottom:'3vw',
    left:'40%',
  }
}

export const setTimer = (sec) => {
  const [timeRemainingInSeconds, decrementTime] = useState(sec)
  const r = useRef(null);
  r.current = { timeRemainingInSeconds, decrementTime };
    useEffect(() => {
    const timer = setInterval(() => {
      r.current.decrementTime(r.current.timeRemainingInSeconds-1);
      if (r.current.timeRemainingInSeconds === 0) {
        clearInterval(timer)
      }
    }, 1000);

  }, []);

  return r.current.timeRemainingInSeconds
}

export const Timer = ({  updateStage, time }) => {

  let timeRemainingInSeconds = setTimer(time)
  if (timeRemainingInSeconds === 0) updateStage()

  return (
      <div style={styles.circle}>
      <div style={styles.count}>{timeRemainingInSeconds}</div>
      </div>
  );
};

