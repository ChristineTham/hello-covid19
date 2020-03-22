import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'
import Plot from 'react-plotly.js';

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
      <p>Data count: {data.length}</p>
      <p>Australia count: {australia.length}</p>
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
        config={{displayModeBar: true, responsive: true}}
      />
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
        config={{ displayModeBar: true, responsive: true }}
      />
    </Fragment>
  )
}
