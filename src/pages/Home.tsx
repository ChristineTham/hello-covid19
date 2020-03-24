import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'
import Plot from 'react-plotly.js';
import { Grid, Row, Col } from 'react-flexbox-grid';

import { RootState } from '../rootReducer'

export const Home: React.FC = () => {
  const data = useSelector((state: RootState) => state.data.result)
  const australia = data.filter(item => item.location === 'Australia')
  const australiaDates = australia.map(item => item.date)
  const australiaTotalCases = australia.map(item => item.total_cases)
  const australiaTotalDeaths = australia.map(item => item.total_deaths)
  return (
    <Fragment>
      <h1>hello Coronavirus (CoViD-19)</h1>
      <p>
        This is a simple web app to display real time information about the spread of CoViD-19 around the world.
        CoViD-19 is an infectious disease caused by a new virus.
         The source data is obtained from <a href="https://ourworldindata.org/coronavirus-source-data">Our World in Data</a>
      </p>
      <Grid fluid>
        <Row>
          <Col xs={12} md={6}>
            <Plot
              data={[
                {
                  x: australiaDates,
                  y: australiaTotalCases,
                  type: 'scatter',
                  mode: 'lines+markers',
                  marker: { color: 'blue' },
                }
              ]}
              layout={{ title: 'Australia Total Cases' }}
              config={{ displayModeBar: false, responsive: true }}
            />
          </Col>
          <Col xs={12} md={6}>
            <Plot
              data={[
                {
                  x: australiaDates,
                  y: australiaTotalDeaths,
                  type: 'scatter',
                  mode: 'lines+markers',
                  marker: { color: 'red' },
                }
              ]}
              layout={{ title: 'Australia Total Deaths' }}
              config={{ displayModeBar: false, responsive: true }}
            />
          </Col>
        </Row>
      </Grid>
    </Fragment>
  )
}
