import React, { Fragment, useState } from 'react'
import { Grid, Row, Col } from 'react-flexbox-grid'
import { useSelector } from 'react-redux'
import Select from 'react-select'

import { RootState } from '../rootReducer'

import ChartCohortLine from '../components/Chart/ChartCohortLine'
import ChartCohortPercent from '../components/Chart/ChartCohortPercent'
import ChartCohortPctMovAvg from '../components/Chart/ChartCohortPctMovAvg'

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

const cohort = [
  'Australia',
  'Iran',
  'Italy',
  'Malaysia',
  'Singapore',
  'United Kingdom',
  'United States',
  'World',
]

const pOptions = [
  { value: 7, label: 'Last Week' },
  { value: 14, label: 'Last Fortnight' },
  { value: 30, label: 'Last Month' },
  { value: 0, label: 'All Dates' },
]

type PeriodType = typeof pOptions[0]

export const Cohort: React.FC = () => {
  const [country, setCountry] = useState(cOptions[0])
  const [period, setPeriod] = useState(pOptions[0])
  const data = useSelector((state: RootState) => state.data.result)

  const countries = Array.from(new Set(data.map((item) => item.location)))
  const cList: Array<CountryType> = countries.map((item) => ({
    value: item,
    label: item,
  }))

  const processCountry = (selectedOption: CountryType) => {
    setCountry(selectedOption)
  }

  console.log(cohort)

  return (
    <Fragment>
      <h1>Cohort Analysis</h1>
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
            <ChartCohortLine
              title="Total Cases"
              countries={cohort}
              datay="total_cases"
              titley="Cases"
              period={period.value}
            />
          </Col>
          <Col xs={12} md={6}>
            <ChartCohortLine
              title="Total Deaths"
              countries={cohort}
              datay="total_deaths"
              titley="Deaths"
              period={period.value}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={6}>
            <ChartCohortPercent
              title="Case Growth"
              countries={cohort}
              datay="case_growth"
              period={period.value}
            />
          </Col>
          <Col xs={12} md={6}>
            <ChartCohortPercent
              title="Death Growth"
              countries={cohort}
              datay="death_growth"
              period={period.value}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={6}>
            <ChartCohortPctMovAvg
              title="Weekly Average Case Growth"
              countries={cohort}
              datay="case_growth"
              period={period.value}
            />
          </Col>
          <Col xs={12} md={6}>
            <ChartCohortPctMovAvg
              title="Weekly Average Death Growth"
              countries={cohort}
              datay="death_growth"
              period={period.value}
            />
          </Col>
        </Row>
      </Grid>
    </Fragment>
  )
}
