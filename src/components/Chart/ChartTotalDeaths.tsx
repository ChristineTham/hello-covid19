import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'
import Plot from 'react-plotly.js'

import { RootState } from '../../rootReducer'

export const ChartTotalDeaths: React.FC<{ country: string }> = ({ country }) => {
  const data = useSelector((state: RootState) => state.data.result)
  const c = data.filter((item) => item.location === country)
  const countryDates = c.map((item) => item.date)
  const countryTotalDeaths = c.map((item) => item.total_deaths)
  const title = country + ' Total Deaths'
  return (
    <Fragment>
      <Plot
        data={[
          {
            x: countryDates,
            y: countryTotalDeaths,
            type: 'scatter',
            mode: 'lines+markers',
            marker: { color: 'red' },
          },
        ]}
        layout={{ title: title }}
        config={{ responsive: true }}
        useResizeHandler
        style={{ width: "100%", height: "100%" }}
      />
    </Fragment>
  )
}
