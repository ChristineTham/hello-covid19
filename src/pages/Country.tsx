import React, { Fragment, useState } from 'react'
import { Grid, Row, Col } from 'react-flexbox-grid';
import { useSelector } from 'react-redux'
import Select from 'react-select';

import { RootState } from '../rootReducer'

import { ChartLine } from '../components/Chart/ChartLine';

type CountryType = {
  value: string;
  label: string;
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
];

const pOptions = [
  { value: 30, label: 'Last Month' },
  { value: 14, label: 'Last Fortnight' },
  { value: 7, label: 'Last Week' },
  { value: 0, label: 'All Dates' },
];

type PeriodType = typeof pOptions[0]

export const Country: React.FC = () => {
  const [country, setCountry] = useState(cOptions[0])
  const [period, setPeriod] = useState(pOptions[0])
  const data = useSelector((state: RootState) => state.data.result)
  let fData = data.filter((item) => item.location === country.value).slice(-period.value)
  const countries = Array.from(new Set(data.map(item => item.location)))
  const cList: Array<CountryType> = countries.map(item => ({ value: item, label: item }))

  const processCountry = (selectedOption: CountryType) => {
    fData = data.filter((item) => item.location === selectedOption.value)
    setCountry(selectedOption)
  }

  return (
    <Fragment>
      <h1>Analysis by Country</h1>
      <Grid fluid>
        <Row>
          <Col xs={12} md={6}>
            <div>
              Select Country
                <Select
                name="select-country"
                options={cList}
                value={country}
                onChange={selectedOption => processCountry(selectedOption as CountryType)}
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
                onChange={selectedOption => setPeriod(selectedOption as PeriodType)}
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={6}>
            <ChartLine
              title={country.value + ' Total Cases'}
              datax={fData.map((item) => item.date)}
              datay={fData.map((item) => item.total_cases)}
              color="blue"
            />
          </Col>
          <Col xs={12} md={6}>
            <ChartLine
              title={country.value + ' Total Deaths'}
              datax={fData.map((item) => item.date)}
              datay={fData.map((item) => item.total_deaths)}
              color="red"
            />
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={6}>
            <ChartLine
              title={country.value + ' Daily Case Growth %'}
              datax={fData.map((item) => item.date)}
              datay={fData.map((item) => item.new_cases * 100 / (item.total_cases - item.new_cases))}
              color="cyan"
              titley='Daily Growth %'
            />
          </Col>
          <Col xs={12} md={6}>
            <ChartLine
              title={country.value + ' Daily Death Growth %'}
              datax={fData.map((item) => item.date)}
              datay={fData.map((item) => item.new_deaths * 100 / (item.total_deaths - item.new_deaths))}
              color="orange"
              titley='Daily Growth %'
            />
          </Col>
        </Row>
      </Grid>
    </Fragment>
  )
}
