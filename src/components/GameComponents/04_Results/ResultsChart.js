import React from 'react';
import { Header } from 'semantic-ui-react';
import { Chart } from 'react-google-charts';

export const ResultsChart = props => {
  return (
    <>
      <Header>Results</Header>
      {/* <Grid celled>
      <Grid.Row>
        <Grid.Column width={10}>Answer</Grid.Column>
        <Grid.Column>Votes</Grid.Column>
      </Grid.Row>
      {data.map(datum => (
        <Grid.Row>
          <Grid.Column width={10}>{datum.answer}</Grid.Column>
          <Grid.Column>{datum.votes}</Grid.Column>
        </Grid.Row>
      ))}
    </Grid> */}
      <Chart
        width={'95vw'}
        height={'90vh'}
        chartType="BarChart"
        loader={<div />}
        data={props.data}
        options={{
          title: 'VOTES',
          chartArea: { width: '50%' },
          legend: 'none',
          animation: { startup: true, easing: 'linear', duration: 1500 },
          enableInteractivity: false,
        }}
        style={{
          fontFamily: `Lato,'Helvetica Neue',Arial,Helvetica,sans-serif`,
        }}
      />
    </>
  );
};

export default ResultsChart;
