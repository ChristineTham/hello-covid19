import React, { Fragment, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
// import Plot from 'react-plotly.js';
import { Grid, Row, Col } from 'react-flexbox-grid'
import { useHistory } from 'react-router-dom'
import Select from 'react-select'

import { fetchData } from '../features/data/dataSlice'
import { RootState } from '../rootReducer'
import { ChartLine } from '../components/Chart/ChartLine'
import { ChartGrowth } from '../components/Chart/ChartGrowth'
import { Treemap } from '../components/Chart/Treemap'
import { KPI } from '../components/KPI'

const pOptions = [
  { value: 30, label: 'Last Month' },
  { value: 14, label: 'Last Fortnight' },
  { value: 7, label: 'Last Week' },
  { value: 0, label: 'All Dates' },
]

type PeriodType = typeof pOptions[0]

export const Home: React.FC = () => {
  const dispatch = useDispatch()
  const [period, setPeriod] = useState(pOptions[0])
  const history = useHistory()
  const data = useSelector((state: RootState) => state.data.result)
  const latestDate = data.map((row) => row.date).reverse()[1]
  const latest = data.filter(
    (row) => row.date === latestDate && row.location === 'World'
  )[0]
  const world = data
    .filter((item) => item.location === 'World')
    .slice(-period.value)
  const latestCountries = data.filter(
    (row) => row.date === latestDate && row.location !== 'World'
  )
  //  console.log(latestCountries)
  //  console.log(data.map(row => row.date).reverse())

  return (
    <Fragment>
      <h1>hello Coronavirus (CoViD-19)</h1>
      <p>
        This is a simple web app to display real time information about the
        spread of CoViD-19 around the world. CoViD-19 is an infectious disease
        caused by a new virus. The source data is obtained from{' '}
        <a href="https://ourworldindata.org/coronavirus-source-data">
          Our World in Data{' '}
        </a>
        and is based on data collected by the European CDC.
      </p>
      <p>To view results for a specific country, click on the button</p>
      <button
        type="button"
        className="btn purple btn-large"
        onClick={() => history.push('/bycountry')}
      >
        View Results by Country
      </button>
      <Grid fluid>
        <Row>
          <Col xs={12} md={6}>
            <div className="card grey lighten-4">
              <div className="card-content">
                <span className="card-title">Latest Date: {latestDate}</span>
              </div>
              <div className="card-action">
                <button
                  type="button"
                  className="btn purple"
                  onClick={() => dispatch(fetchData())}
                >
                  Refresh
                </button>
              </div>
            </div>
          </Col>
          <Col xs={12} md={6}>
            <div>
              Select Period
              <Select
                name="select-period"
                options={pOptions}
                value={period}
                onChange={(selectedOption) =>
                  setPeriod(selectedOption as PeriodType)
                }
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={6}>
            <KPI
              color="purple"
              background="purple lighten-4"
              title="Total Cases"
              kpi={latest ? latest.total_cases : 0}
              change={latest ? latest.new_cases : 0}
            />
          </Col>
          <Col xs={12} md={6}>
            <KPI
              color="red"
              background="pink lighten-4"
              title="Total Deaths"
              kpi={latest ? latest.total_deaths : 0}
              change={latest ? latest.new_deaths : 0}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <Treemap
              title={'Total Cases by Country'}
              labels={latestCountries.map((item) => item.location)}
              values={latestCountries.map((item) => item.total_cases)}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <Treemap
              title={'Total Deaths by Country'}
              labels={latestCountries.map((item) => item.location)}
              values={latestCountries.map((item) => item.total_deaths)}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={6}>
            <ChartLine
              title={'Total Cases'}
              datax={world.map((item) => item.date)}
              datay={world.map((item) => item.total_cases)}
              color="purple"
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
              datay={world.map(
                (item) => item.new_cases / (item.total_cases - item.new_cases)
              )}
              color="blue"
              titley="Daily Growth %"
            />
          </Col>
          <Col xs={12} md={6}>
            <ChartGrowth
              title={'Daily Death Growth %'}
              datax={world.map((item) => item.date)}
              datay={world.map(
                (item) =>
                  item.new_deaths / (item.total_deaths - item.new_deaths)
              )}
              color="orange"
              titley="Daily Growth %"
            />
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={6}>
            <ChartGrowth
              title={'Case Fatality'}
              datax={world.map((item) => item.date)}
              datay={world.map((item) => item.total_deaths / item.total_cases)}
              color="pink"
              titley="Deaths / Cases %"
            />
          </Col>
          <Col xs={12} md={6}>
            <ChartGrowth
              title={'Daily Fatality %'}
              datax={world.map((item) => item.date)}
              datay={world.map((item) => item.new_deaths / item.new_cases)}
              color="green"
              titley="Deaths / Cases %"
            />
          </Col>
        </Row>
      </Grid>
    </Fragment>
  )
}
