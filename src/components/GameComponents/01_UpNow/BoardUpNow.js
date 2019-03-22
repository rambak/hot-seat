import React from 'react';
import { Container, Header } from 'semantic-ui-react';
import { Timer } from '../../../utils/timer';

export const BoardUpNow = ({ inHotSeatName, updateStage }) => {
  return (
    <Container textAlign="center" style={{ paddingTop: '20vh' }}>
      <Header className="title">{inHotSeatName}</Header>
      <Header className="title" style={{ fontSize: "6vh" }}>is in the hot seat!</Header>
      <Timer updateStage={updateStage} time={3} />
    </Container>
  );
};

export default BoardUpNow;
