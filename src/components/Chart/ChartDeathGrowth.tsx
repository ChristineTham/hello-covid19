import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'
import Plot from 'react-plotly.js'

import { RootState } from '../../rootReducer'

export const ChartDeathGrowth: React.FC<{ country: string }> = ({ country }) => {
  const data = useSelector((state: RootState) => state.data.result)
  const c = data.filter((item) => item.location === country)
  const countryDates = c.map((item) => item.date)
  const countryDeathGrowth = c.map((item) => item.new_deaths * 100 / (item.total_deaths - item.new_deaths))
  const title = country + ' Death Growth'
  return (
    <Fragment>
      <Plot
        data={[
          {
            x: countryDates,
            y: countryDeathGrowth,
            type: 'scatter',
            mode: 'lines+markers',
            marker: { color: 'pink' },
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
