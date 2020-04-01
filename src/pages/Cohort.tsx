import React, { Fragment, useState } from 'react'
import { Grid, Row, Col } from 'react-flexbox-grid'
import { useSelector } from 'react-redux'
import Select, { ActionMeta } from 'react-select'

import { RootState } from '../rootReducer'

import ChartCohortLine from '../components/Chart/ChartCohortLine'
import ChartCohortPercent from '../components/Chart/ChartCohortPercent'
import ChartCohortPctMovAvg from '../components/Chart/ChartCohortPctMovAvg'

type CountryType = {
  value: string
  label: string
}

const defaultCountries: Array<CountryType> = [
  { value: 'Australia', label: 'Australia' },
  { value: 'Iran', label: 'Iran' },
  { value: 'Italy', label: 'Italy' },
  { value: 'Malaysia', label: 'Malaysia' },
  { value: 'New Zealand', label: 'New Zealand' },
  { value: 'Singapore', label: 'Singapore' },
  { value: 'United Kingdom', label: 'United Kingdom' },
  { value: 'United States', label: 'United States' },
  { value: 'World', label: 'World' },
]

const pOptions = [
  { value: 7, label: 'Last Week' },
  { value: 14, label: 'Last Fortnight' },
  { value: 30, label: 'Last Month' },
  { value: 0, label: 'All Dates' },
]

type PeriodType = typeof pOptions[0]

export const Cohort: React.FC = () => {
  const [country, setCountry] = useState(defaultCountries)
  const [period, setPeriod] = useState(pOptions[0])
  const data = useSelector((state: RootState) => state.data.result)
  const cArray = Array.from(new Set(data.map((item) => item.location)))
  const cList: Array<CountryType> = cArray.map((item) => ({
    value: item,
    label: item,
  }))
  const countries = country.map((c) => c.value)

  function copy(aObject: any) {
    if (!aObject) {
      return aObject;
    }
  
    let v;
    let bObject: typeof aObject = Array.isArray(aObject) ? [] : {};
    for (const k in aObject) {
      v = aObject[k];
      bObject[k] = (typeof v === "object") ? copy(v) : v;
    }
  
    return bObject;
  }

  const processCountry = (selectedOption: CountryType, action: ActionMeta) => {
    let newCountries = copy(country)
    switch (action.action)
    {
    case "remove-value":
      const i = newCountries.indexOf(selectedOption)
      newCountries.splice(i,1)
      break
    case "pop-value":
      newCountries.pop()
      break
    case "select-option":
      newCountries = selectedOption
      break
    case "set-value":
      newCountries.push(copy(selectedOption))
      break
    case "clear":
      newCountries = [];
      break
    }
    setCountry(newCountries)
  }

  return (
    <Fragment>
      <h1>Cohort Analysis</h1>
      <Grid fluid>
        <Row>
          <Col xs={12} md={6}>
            <div>
              Select Countries in Cohort
              <Select
                name="select-countries"
                className="basic-multi-select"
                classNamePrefix="select"
                isMulti
                options={cList}
                value={country}
                onChange={(selectedOption, action) =>
                  processCountry(selectedOption as CountryType, action)
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
              countries={countries}
              datay="total_cases"
              titley="Cases"
              period={period.value}
            />
          </Col>
          <Col xs={12} md={6}>
            <ChartCohortLine
              title="Total Deaths"
              countries={countries}
              datay="total_deaths"
              titley="Deaths"
              period={period.value}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={6}>
            <ChartCohortPercent
              title="Total Fatality"
              countries={countries}
              datay="total_fatality"
              period={period.value}
            />
          </Col>
          <Col xs={12} md={6}>
            <ChartCohortPercent
              title="Daily Fatality"
              countries={countries}
              datay="daily_fatality"
              period={period.value}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={6}>
            <ChartCohortPercent
              title="Case Growth"
              countries={countries}
              datay="case_growth"
              period={period.value}
            />
          </Col>
          <Col xs={12} md={6}>
            <ChartCohortPercent
              title="Death Growth"
              countries={countries}
              datay="death_growth"
              period={period.value}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={6}>
            <ChartCohortPctMovAvg
              title="Weekly Average Case Growth"
              countries={countries}
              datay="case_growth"
              period={period.value}
            />
          </Col>
          <Col xs={12} md={6}>
            <ChartCohortPctMovAvg
              title="Weekly Average Death Growth"
              countries={countries}
              datay="death_growth"
              period={period.value}
            />
          </Col>
        </Row>
      </Grid>
    </Fragment>
  )
}
