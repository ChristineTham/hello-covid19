import React, { Fragment } from 'react'
import Plot from 'react-plotly.js'

interface IChartLineProps {
  title: string;
  datax: any[];
  datay: any[];
  color?: string;
  titlex?: string;
  titley?: string;
}

export const ChartGrowth: React.FC<IChartLineProps> = (props: IChartLineProps) => {
  const lastPoint = Number(props.datay[props.datay.length - 1])
  const lastLabel = (lastPoint * 100).toFixed(1) + '%'

  return (
    <Fragment>
      <Plot
        data={[
          {
            x: props.datax,
            y: props.datay,
            type: 'scatter',
            mode: 'lines+markers',
            hovertemplate: '%{y:.1%}',
            marker: { color: props.color ? props.color : 'black'},
          },
          {
            x: props.datax.slice(-1),
            y: props.datay.slice(-1),
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
          },
          showlegend: false,
          annotations: [
            {
            xref: 'paper',
            x: 0.95,
            y: lastPoint,
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
    </Fragment>
  )
}
