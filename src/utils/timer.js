import { useEffect, useState }from 'react';

export const styles = {
  count: {
    color: 'white',
    fontSize: '8em',
    position: 'absolute',
    top: '40%',
    left: '28%'
  },
  circle: {
    content: "",
    position: 'absolute',
    borderRadius: '50%',
    width: '10em',
    height: '10em',
    background: '#81CE97',
  }
}

export  const setTimer = (sec) => {
  const [timeRemainingInSeconds, decrementTime] = useState(sec)
  useEffect(() => {
    const timer = setInterval(() => {
      decrementTime(timeRemainingInSeconds-1);
    }, 1000);

    if (timeRemainingInSeconds === 0) {
      return () => {
      clearInterval(timer)
    }
    }
  }, [timeRemainingInSeconds]);

  return timeRemainingInSeconds
  }
