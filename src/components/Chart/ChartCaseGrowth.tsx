import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'
import Plot from 'react-plotly.js'

import { RootState } from '../../rootReducer'

export const ChartCaseGrowth: React.FC<{ country: string }> = ({ country }) => {
  const data = useSelector((state: RootState) => state.data.result)
  const c = data.filter((item) => item.location === country)
  const countryDates = c.map((item) => item.date)
  const countryCaseGrowth = c.map((item) => item.new_cases * 100 / (item.total_cases - item.new_cases))
  const title = country + ' Case Growth'
  return (
    <Fragment>
      <Plot
        data={[
          {
            x: countryDates,
            y: countryCaseGrowth,
            type: 'scatter',
            mode: 'lines+markers',
            marker: { color: 'cyan' },
          },
        ]}
        layout={{
          title: title,
          xaxis: {
            title: 'Date'
          },
          yaxis: {
            title: '% growth per day'
          }
        }}
        useResizeHandler
        style={{ width: "100%", height: "100%" }}
      />
    </Fragment>
  )
}
