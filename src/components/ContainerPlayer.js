import React from 'react';
import { determinePlayerComponent } from '../utils';
import { db } from '../config/fbConfig';
import { useDocument } from 'react-firebase-hooks/firestore';

export const ContainerPlayer = props => {
  const pin = props.match.params.pin;
  const gameRef = db.collection('games').doc(pin);
  const { loading, value } = useDocument(gameRef);

  return loading ? (
    <div>loading</div>
  ) : (
    determinePlayerComponent(value.data().currentStage)
  );
};

export default ContainerPlayer;
