import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'
import Plot from 'react-plotly.js'

import { RootState } from '../../rootReducer'

export const ChartTotalCases: React.FC<{ country: string }> = ({ country }) => {
  const data = useSelector((state: RootState) => state.data.result)
  const c = data.filter((item) => item.location === country)
  const countryDates = c.map((item) => item.date)
  const countryTotalCases = c.map((item) => item.total_cases)
  const title = country + ' Total Cases'
  return (
    <Fragment>
      <Plot
        data={[
          {
            x: countryDates,
            y: countryTotalCases,
            type: 'scatter',
            mode: 'lines+markers',
            marker: { color: 'blue' },
          },
        ]}
        layout={{ title: title, }}
        config={{ responsive: true }}
        useResizeHandler
        style={{ width: "100%", height: "100%" }}
      />
    </Fragment>
  )
}
