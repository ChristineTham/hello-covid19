import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'
// import Plot from 'react-plotly.js';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { useHistory } from 'react-router-dom'

import { RootState } from '../rootReducer'
import { ChartLine } from '../components/Chart/ChartLine';
import { ChartGrowth } from '../components/Chart/ChartGrowth';

export const Home: React.FC = () => {
  const history = useHistory()
  const data = useSelector((state: RootState) => state.data.result)
  const latestDate = data.map(row => row.date).reverse()[1]
  const latest = data.filter(row => row.date === latestDate && row.location === 'World')[0]
  const totalCases = latest ? latest.total_cases.toLocaleString() : ''
  const newCases = latest ? latest.new_cases.toLocaleString() : ''
  const newCasesPct = latest ? (latest.new_cases * 100 / (latest.total_cases - latest.new_cases)).toFixed(1) + '%' : ''
  const totalDeaths = latest ? latest.total_deaths.toLocaleString() : ''
  const newDeaths = latest ? latest.new_deaths.toLocaleString() : ''
  const newDeathsPct = latest ? (latest.new_deaths * 100 / (latest.total_deaths - latest.new_deaths)).toFixed(1) + '%' : ''
  let world = data.filter((item) => item.location === 'World')

  return (
    <Fragment>
      <h1>hello Coronavirus (CoViD-19)</h1>
      <p>
        This is a simple web app to display real time information about the spread of CoViD-19 around the world.
        CoViD-19 is an infectious disease caused by a new virus.
        The source data is obtained from <a href="https://ourworldindata.org/coronavirus-source-data">Our World in Data </a>
        and is based on data collected by the European CDC.
      </p>
      <p>
        To view results for a specific country, click on the button
      </p>
      <button type="button" className="btn" onClick={() => history.push('/bycountry')}>
        View Results by Country
      </button>
      <p>Latest data as at: {latestDate}</p>
      <Grid fluid>
        <Row>
          <Col xs={12} md={6}>
            <div style={{border: '1px solid blue'}}>
              <h4>Total Cases</h4>
              <div style={{ color: 'blue', textAlign: 'center', fontSize: 64, fontWeight: 'bold' }}>
                {totalCases}
              </div>
              <p>Growth from previous day: <span style={{ color: 'blue' }}>{newCases} ({newCasesPct})</span></p>
            </div>
          </Col>
          <Col xs={12} md={6}>
            <div style={{ border: '1px solid red' }}>
              <h4>Total Deaths</h4>
              <div style={{ color: 'red', textAlign: 'center', fontSize: 64, fontWeight: 'bold' }}>
                {totalDeaths}
              </div>
              <p>Growth from previous day: <span style={{ color: 'red' }}>{newDeaths} ({newDeathsPct})</span></p>
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={6}>
            <ChartLine
              title={'Total Cases'}
              datax={world.map((item) => item.date)}
              datay={world.map((item) => item.total_cases)}
              color="blue"
            />
          </Col>
          <Col xs={12} md={6}>
            <ChartLine
              title={'Total Deaths'}
              datax={world.map((item) => item.date)}
              datay={world.map((item) => item.total_deaths)}
              color="red"
            />
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={6}>
            <ChartGrowth
              title={'Daily Case Growth %'}
              datax={world.map((item) => item.date)}
              datay={world.map((item) => item.new_cases / (item.total_cases - item.new_cases))}
              color="cyan"
              titley='Daily Growth %'
            />
          </Col>
          <Col xs={12} md={6}>
            <ChartGrowth
              title={'Daily Death Growth %'}
              datax={world.map((item) => item.date)}
              datay={world.map((item) => item.new_deaths / (item.total_deaths - item.new_deaths))}
              color="orange"
              titley='Daily Growth %'
            />
          </Col>
        </Row>
      </Grid>
    </Fragment>
  )
}
