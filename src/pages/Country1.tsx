import React, { Fragment, useState } from 'react'
import { Grid, Row, Col } from 'react-flexbox-grid';
import { useSelector } from 'react-redux'
import Select from 'react-select';

import { RootState } from '../rootReducer'

import { ChartLine } from '../components/Chart/ChartLine';

const cOptions = [
  { value: 'Australia', label: 'Australia' },
  { value: 'Iran', label: 'Iran' },
  { value: 'Italy', label: 'Italy' },
  { value: 'Malaysia', label: 'Malaysia' },
  { value: 'Singapore', label: 'Singapore' },
  { value: 'United Kingdom', label: 'United Kingdom' },
  { value: 'United States', label: 'United States' },
  { value: 'World', label: 'World' },
];

type OptionType = typeof cOptions[0]

export const Country1: React.FC = () => {
  const [selectOption, setSelectOption] = useState(cOptions[0])
  const data = useSelector((state: RootState) => state.data.result)
  let country = data.filter((item) => item.location === selectOption.value)

  const processCountry = (selectedOption: OptionType) => {
    country = data.filter((item) => item.location === selectedOption.value)
    setSelectOption(selectedOption)
    // console.log('set country' + selectedOption.value + ' size ' + country.length)
  }
  // console.log('initial country' + selectOption.value + ' size ' + country.length)

  return (
    <Fragment>
      <Grid fluid>
        <Row>
          <Col xs={12}>
            <Row center="xs">
              <Col xs={6}>
                <h1>Analysis by Country</h1>
                <p>
                  Select Country
                  <Select
                      name="select-country"
                      options={cOptions}
                      value={selectOption}
                      onChange={ selectedOption => processCountry(selectedOption as OptionType) }
                    />
                </p>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={6}>
            <ChartLine
              title={selectOption.value + ' Total Cases'}
              datax={country.map((item) => item.date)}
              datay={country.map((item) => item.total_cases)}
              color="blue"
            />
          </Col>
          <Col xs={12} md={6}>
            <ChartLine
              title={selectOption.value + ' Total Deaths'}
              datax={country.map((item) => item.date)}
              datay={country.map((item) => item.total_deaths)}
              color="red"
            />
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={6}>
            <ChartLine
              title={selectOption.value + ' Daily Case Growth %'}
              datax={country.map((item) => item.date)}
              datay={country.map((item) => item.new_cases * 100 / (item.total_cases - item.new_cases))}
              color="cyan"
              titley='Daily Growth %'
            />
          </Col>
          <Col xs={12} md={6}>
            <ChartLine
              title={selectOption.value + ' Total Cases'}
              datax={country.map((item) => item.date)}
              datay={country.map((item) => item.total_cases)}
              color="red"
            />
          </Col>
        </Row>
      </Grid>
    </Fragment>
  )
}
