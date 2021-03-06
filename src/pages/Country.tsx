import React, { Fragment, useState } from 'react'
import { Grid, Row, Col } from 'react-flexbox-grid'
import { useSelector } from 'react-redux'
import Select from 'react-select'
import { useHistory } from 'react-router-dom'

import { RootState } from '../rootReducer'

import { KPI } from '../components/KPI'
import ChartLine from '../components/Chart/ChartLine'
import ChartPercent from '../components/Chart/ChartPercent'

type CountryType = {
  value: string
  label: string
}

const cOptions: Array<CountryType> = [
  { value: 'Australia', label: 'Australia' },
  { value: 'Iran', label: 'Iran' },
  { value: 'Italy', label: 'Italy' },
  { value: 'Malaysia', label: 'Malaysia' },
  { value: 'Singapore', label: 'Singapore' },
  { value: 'United Kingdom', label: 'United Kingdom' },
  { value: 'United States', label: 'United States' },
  { value: 'World', label: 'World' },
]

const pOptions = [
  { value: 30, label: 'Last Month' },
  { value: 14, label: 'Last Fortnight' },
  { value: 7, label: 'Last Week' },
  { value: 0, label: 'All Dates' },
]

type PeriodType = typeof pOptions[0]

export const Country: React.FC = () => {
  const history = useHistory()
  const [country, setCountry] = useState(cOptions[0])
  const [period, setPeriod] = useState(pOptions[0])
  const data = useSelector((state: RootState) => state.data.result)
  let fData = data.filter((item) => item.location === country.value)

  const countries = Array.from(new Set(data.map((item) => item.location)))
  const cList: Array<CountryType> = countries.map((item) => ({
    value: item,
    label: item,
  }))

  const latestDate = fData.map((row) => row.date).reverse()[0]
  const latest = fData.filter((row) => row.date === latestDate)[0]
  // console.log(latestDate)
  // console.log(fData.map(row => row.date).reverse())

  const processCountry = (selectedOption: CountryType) => {
    fData = data.filter((item) => item.location === selectedOption.value)
    setCountry(selectedOption)
  }

  return (
    <Fragment>
      <h1>Analysis by Country</h1>
      <button type="button" className="btn purple" onClick={() => history.push('/')}>
        Back to home
      </button>
      <Grid fluid>
        <Row>
          <Col xs={12} md={6}>
            <div>
              Select Country
              <Select
                name="select-country"
                options={cList}
                value={country}
                onChange={(selectedOption) =>
                  processCountry(selectedOption as CountryType)
                }
              />
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
          <Col xs={12} md={6}>
            <ChartLine
              title={country.value + ' Total Cases'}
              datax={fData.map((item) => item.date)}
              datay={fData.map((item) => item.total_cases)}
              titley="Cases"
              period={period.value}
              color="blue"
            />
          </Col>
          <Col xs={12} md={6}>
            <ChartLine
              title={country.value + ' Total Deaths'}
              datax={fData.map((item) => item.date)}
              datay={fData.map((item) => item.total_deaths)}
              titley="Deaths"
              period={period.value}
              color="red"
            />
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={6}>
            <ChartPercent
              title={country.value + ' Case Fatality'}
              datax={fData.map((item) => item.date)}
              datay={fData.map((item) => item.total_fatality)}
              period={period.value}
              color="pink"
              titley="Deaths / Cases %"
            />
          </Col>
          <Col xs={12} md={6}>
            <ChartPercent
              title={country.value + ' Daily Fatality %'}
              datax={fData.map((item) => item.date)}
              datay={fData.map((item) => item.daily_fatality)}
              period={period.value}
              color="green"
              titley="Deaths / Cases %"
            />
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={6}>
            <ChartPercent
              title={country.value + ' Daily Case Growth %'}
              datax={fData.map((item) => item.date)}
              datay={fData.map((item) => item.case_growth)}
              period={period.value}
              color="cyan"
              titley="Daily Growth %"
            />
          </Col>
          <Col xs={12} md={6}>
            <ChartPercent
              title={country.value + ' Daily Death Growth %'}
              datax={fData.map((item) => item.date)}
              datay={fData.map((item) => item.death_growth)}
              period={period.value}
              color="orange"
              titley="Daily Growth %"
            />
          </Col>
        </Row>
      </Grid>
    </Fragment>
  )
}
