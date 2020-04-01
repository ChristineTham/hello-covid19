import React from 'react'
import { useSelector } from 'react-redux'
import Plot from 'react-plotly.js'

import { DataType } from '../../features/data/data.types'
import { RootState } from '../../rootReducer'

interface IChartLineProps {
  title: string
  countries: string[]
  datay: keyof DataType
  period: number
  titlex?: string
  titley?: string
}

const ChartCohortPercent: React.FC<IChartLineProps> = (props: IChartLineProps) => {
  const data = useSelector((state: RootState) => state.data.result) as DataType[]

  return (
    <>
    <div>
      <Plot
        data={
          props.countries.map(c => {
            const cData = data.filter((item) => item.location === c)
            const datax = cData.map((item) => item.date).slice(-props.period)
            const datay = cData.map((item) => item[props.datay]).slice(-props.period)

            console.log(cData)
            return {
              x: datax,
              y: datay,
              type: 'scatter',
              line: {shape: 'spline'},
              mode: 'lines+markers',
              hovertemplate: '%{y:.1%}',
              name: c,
            }
          })
        }
        layout={{
          title: props.title,
          xaxis: {
            title: (props.titlex ? props.titlex : 'Date')
          },
          yaxis: {
            title: (props.titley ? props.titley : 'Daily Growth %'),
            tickformat: '.0%',
            rangemode: 'tozero'
          },
          showlegend: true,
          legend: {
            x: 1,
            xanchor: 'left',
            y: 0.5,
            bgcolor: 'lightgrey',
          },
        }}
        useResizeHandler
        style={{ width: "100%", height: "100%" }}
      />        
    </div>
    </>
  )
}

export default ChartCohortPercent
