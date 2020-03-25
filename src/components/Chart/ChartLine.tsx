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

export const ChartLine: React.FC<IChartLineProps> = (props: IChartLineProps) => {
  return (
    <Fragment>
      <Plot
        data={[
          {
            x: props.datax,
            y: props.datay,
            type: 'scatter',
            mode: 'lines+markers',
            marker: { color: props.color ? props.color : 'black'},
          },
        ]}
        layout={{
          title: props.title,
          xaxis: {
            title: (props.titlex ? props.titlex : 'Date')
          },
          yaxis: {
            title: (props.titley ? props.titley : 'Value')
          }
        }}
        useResizeHandler
        style={{ width: "100%", height: "100%" }}
      />
    </Fragment>
  )
}
