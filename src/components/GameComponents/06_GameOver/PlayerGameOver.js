import React from 'react';
import { Header } from 'semantic-ui-react';
import { auth } from '../../../config/fbConfig';

export const PlayerGameOver = props => {
//   const user = auth.currentUser;
//   if (user) {
//     user.delete().catch(function(error) {
//       console.log(error.message);
//     });
//   }
  return (
    <Header className="title" textAlign="center" style={{ paddingTop: '35vh' }}>
      Game is over!
    </Header>
  );
};

export default PlayerGameOver;
