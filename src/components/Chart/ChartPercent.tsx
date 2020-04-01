import React, { Fragment } from 'react'
import Plot from 'react-plotly.js'

interface IChartLineProps {
  title: string
  datax: any[]
  datay: any[]
  period: number
  color?: string
  titlex?: string
  titley?: string
}

function movavg(a: number[], i: number, period: number): number {
  const start = Math.max(0,i - (period - 1) / 2)
  const end = Math.min(a.length, i + 1 + (period - 1) / 2)
  const n = end - start
  // return a.slice(Math.max(0,i - period),i).reduce((a, b) => a + b, 0) / Math.min(i + 1,period)
  return a.slice(start, end).reduce((a, b) => a + b, 0) / Math.min(n,period)
}

const ChartPercent: React.FC<IChartLineProps> = (props: IChartLineProps) => {
  const lastPoint = Number(props.datay[props.datay.length - 1])
  const lastLabel = (lastPoint * 100).toFixed(1) + '%'

  return (
    <Fragment>
      <Plot
        data={[
          {
            x: props.datax.slice(-props.period),
            y: props.datay.map((y, i, a) => movavg(a, i, 7)).slice(-props.period),
            name: 'week average',
            type: 'scatter',
            mode: 'lines',
            line: {shape: 'spline'},
            hoverinfo: 'skip',
            marker: { color: 'grey'},
          },
          {
            x: props.datax.slice(-props.period),
            y: props.datay.slice(-props.period),
            name: 'daily',
            type: 'scatter',
            mode: 'lines+markers',
            line: {shape: 'spline'},
            hoverinfo: 'y+x',
            hovertemplate: '%{y:.1%}',
            marker: { color: props.color ? props.color : 'black'},
          },
          {
            x: props.datax.slice(-1),
            y: props.datay.slice(-1),
            name: 'latest',
            type: 'scatter',
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
            tickformat: '.0%',
            rangemode: 'tozero',
          },
          showlegend: true,
          annotations: [
            {
            xref: 'paper',
            x: 0.9,
            y: lastPoint*0.9,
            xanchor: 'center',
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
    </Fragment>
  )
}

export default ChartPercent