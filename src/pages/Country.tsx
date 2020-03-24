import React, { Fragment, useState } from 'react'
import { Grid, Row, Col } from 'react-flexbox-grid';
import Select from 'react-select';

import { ChartTotalCases } from '../components/Chart/ChartTotalCases';
import { ChartTotalDeaths } from '../components/Chart/ChartTotalDeaths';
import { ChartCaseGrowth } from '../components/Chart/ChartCaseGrowth';
import { ChartDeathGrowth } from '../components/Chart/ChartDeathGrowth';

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

export const Country: React.FC = () => {
  const [selectOption, setSelectOption] = useState(cOptions[0])

  const processCountry = (selectedOption: OptionType) => {
    setSelectOption(selectedOption)
  }


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
            <ChartTotalCases country={selectOption.value} />
          </Col>
          <Col xs={12} md={6}>
            <ChartTotalDeaths country={selectOption.value} />
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={6}>
            <ChartCaseGrowth country={selectOption.value} />
          </Col>
          <Col xs={12} md={6}>
            <ChartDeathGrowth country={selectOption.value} />
          </Col>
        </Row>      </Grid>
    </Fragment>
  )
}
