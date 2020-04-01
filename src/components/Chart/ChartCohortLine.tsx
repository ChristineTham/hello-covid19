import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Plot from 'react-plotly.js'
import Switch from 'react-switch'

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

const ChartCohortLine: React.FC<IChartLineProps> = (props: IChartLineProps) => {
  const data = useSelector((state: RootState) => state.data.result) as DataType[]
  const [ log, setLog ] = useState(true)

  return (
    <>
    <div className="center">
      <label>
        <span>Normal  </span>
        <Switch onChange={(checked) => {setLog(checked)}} checked={log} />
        <span>  Logarithmic</span>
      </label>
    </div>
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
            title: (props.titley ? props.titley : 'Cases'),
            type: log ? 'log' : 'linear',
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

export default ChartCohortLine
