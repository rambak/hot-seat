import { determineBoardComponent } from '../utils';
import { db } from '../config/fbConfig';
import React from 'react';
import { useDocument } from 'react-firebase-hooks/firestore';

export const ContainerBoard = props => {
  const pin = props.match.params.pin;
  const gameRef = db.collection('games').doc(pin);
  const { loading, value } = useDocument(gameRef);

  return loading ? (
    <div>loading</div>
  ) : (
    determineBoardComponent(value.data().currentStage)
  );
};

export default ContainerBoard;
