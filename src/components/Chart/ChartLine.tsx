import React from 'react'
import Plot from 'react-plotly.js'

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
  const lastPoint = Number(props.datay[props.datay.length - 1])
  const lastLabel = lastPoint.toLocaleString()

  return (
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
          },
          showlegend: true,
          annotations: [
            {
            xref: 'paper',
            x: 0.9,
            y: lastPoint*1.1,
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
    </div>
  )
}

export default ChartLine
