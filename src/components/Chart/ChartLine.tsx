import React, { useState } from 'react'
import Plot from 'react-plotly.js'
import Switch from 'react-switch'

interface IChartLineProps {
  title: string;
  datax: any[];
  datay: any[];
  period: number
  color?: string;
  titlex?: string;
  titley?: string;
}

const ChartLine: React.FC<IChartLineProps> = (props: IChartLineProps) => {
  const [ log, setLog ] = useState(false)
  const lastPoint = Number(props.datay[props.datay.length - 1])
  const lastLabel = lastPoint.toLocaleString()

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
        data={[
          {
            x: props.datax.slice(-props.period),
            y: props.datay.slice(-props.period),
            type: 'scatter',
            line: {shape: 'spline'},
            mode: 'lines+markers',
            name: 'Cases',
            marker: { color: props.color ? props.color : 'black'},
          },
          {
            x: props.datax.slice(-1),
            y: props.datay.slice(-1),
            type: 'scatter',
            name: 'Latest',
            mode: 'markers',
            hoverinfo: 'skip',
            marker: {
              color: 'black',
              size: 12,
            },
          },
        ]}
        layout={{
          title: props.title,
          xaxis: {
            title: (props.titlex ? props.titlex : 'Date')
          },
          yaxis: {
            title: (props.titley ? props.titley : 'Value'),
            type: log ? 'log' : 'linear',
          },
          showlegend: true,
          legend: {
            x: 0.1,
            xanchor: 'left',
            y: 1,
            bgcolor: 'lightgrey',
          },
          annotations: [
            {
            xref: 'paper',
            x: 0.95,
            y: log ? Math.log10(lastPoint) : lastPoint,
            xanchor: 'left',
            yanchor: 'middle',
            text: lastLabel,
            font: {
              family: 'Arial',
              size: 16,
              color: 'black'
            },
            showarrow: false
            },
          ],
        }}
        useResizeHandler
        style={{ width: "100%", height: "100%" }}
      />        
    </div>
    </>
  )
}

export default ChartLine
