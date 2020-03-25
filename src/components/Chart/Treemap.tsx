import React, { Fragment } from 'react'
import Plot from 'react-plotly.js'

interface IChartLineProps {
  title: string;
  labels: string[];
  values: number[];
  titlex?: string;
  titley?: string;
}

export const Treemap: React.FC<IChartLineProps> = (props: IChartLineProps) => {
  const parents = props.labels.map(item => 'Countries')

  return (
    <Fragment>
      <Plot
        data={[
          {
            labels: props.labels,
            parents: parents,
            values: props.values,
            type: 'heatmap',
            textinfo: 'label+value+percent'
          },
        ]}
        layout={{
          title: props.title,
        }}
        useResizeHandler
        style={{ width: "100%", height: "100%" }}
      />
    </Fragment>
  )
}
