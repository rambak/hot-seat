import React from 'react';
import { Grid, Label, Icon, Image } from 'semantic-ui-react';

export const GridRow = (players, renderSeat) => {
  let firstRow = 3;
  let secondRow = 4;
  let toggle = false;
  let playersForGrid = [];
  while (players.length) {
    const row = toggle ? secondRow : firstRow;
    const playersForGridRow = players.splice(0, row);
    playersForGrid.push(playersForGridRow);
    toggle = !toggle;
  }
  const colors = [
    'teal',
    'yellow',
    'olive',
    'green',
    'blue',
    'violet',
    'purple',
    'red',
    'orange',
    'pink',
    'brown',
  ];
  let colorIndx = -1;
  return (
    <Grid>
      {playersForGrid.map((playersForGridRow, idx1) => {
        return (
          <Grid.Row columns={playersForGridRow.length} key={idx1}>
            {playersForGridRow.map((player, idx2) => {
              if (colorIndx === colors.length - 1) colorIndx = -1;
              colorIndx++;
              return (
                <Grid.Column key={idx2}>
                  <Label
                    as="a"
                    color={colors[colorIndx]}
                    style={{ color: 'white', fontSize: '3vh' }}
                  >
                    {renderSeat && (
                      <Image avatar spaced="right" src="/hotseat.png" />
                    )}
                    <div>{player.name}</div>
                    {/* <Icon name='close' color = 'white'/> */}
                  </Label>
                </Grid.Column>
              );
            })}
          </Grid.Row>
        );
      })}
    </Grid>
  );
};
